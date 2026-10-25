-- SIAMCHAM schema PROPOSAL ONLY. NOT EXECUTED. Review in staging first.
-- Supabase/PostgreSQL; requires pgcrypto + auth.users. Never expose service-role key.
begin;
create extension if not exists pgcrypto;
create type public.member_role as enum ('buyer','supplier','admin');
create type public.approval_state as enum ('pending','approved','rejected');
create type public.rfq_state as enum ('submitted','reviewing','quoted','cancelled');
create type public.product_availability as enum ('inquiry','ready','seasonal','unavailable');

create table public.profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role public.member_role not null default 'buyer',
 display_name text not null default '',
 company_name text,
 country_code text,
 created_at timestamptz not null default now()
);
create table public.suppliers (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references public.profiles(user_id),
 display_name text not null,
 description text,
 status public.approval_state not null default 'pending',
 created_at timestamptz not null default now()
);
create table public.products (
 id uuid primary key default gen_random_uuid(),
 supplier_id uuid not null references public.suppliers(id),
 sku text not null,
 title jsonb not null default '{}'::jsonb,
 description jsonb not null default '{}'::jsonb,
 category text not null,
 packaging text,
 min_order_qty numeric(14,3) not null check(min_order_qty>0),
 order_unit text not null,
 availability public.product_availability not null default 'inquiry',
 approved boolean not null default false,
 created_at timestamptz not null default now(),
 unique (supplier_id,sku)
);
create table public.product_media (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.products(id) on delete cascade,
 media_type text not null check (media_type in ('image','video')),
 storage_path text not null,
 alt_text jsonb not null default '{}'::jsonb,
 sort_order int not null default 0,
 unique(product_id,storage_path)
);
-- GP is NEVER exposed to buyers or supplier roles, including via SELECT on products.
create table public.product_gp (
 product_id uuid primary key references public.products(id) on delete cascade,
 gp_type text not null check(gp_type in ('percent','fixed')),
 gp_value numeric(14,4) not null check(gp_value>=0),
 currency char(3) not null default 'THB',
 agreed_at timestamptz not null default now(),
 updated_by uuid not null references public.profiles(user_id),
 check(gp_type<>'percent' or gp_value<=100)
);
create table public.gp_audit (
 id bigint generated always as identity primary key,
 product_id uuid not null references public.products(id),
 changed_by uuid not null references public.profiles(user_id),
 old_gp jsonb,
 new_gp jsonb not null,
 changed_at timestamptz not null default now()
);
create table public.rfqs (
 id uuid primary key default gen_random_uuid(),
 buyer_id uuid not null references public.profiles(user_id),
 destination_country text not null,
 state public.rfq_state not null default 'submitted',
 buyer_note text,
 created_at timestamptz not null default now()
);
create table public.rfq_items (
 id uuid primary key default gen_random_uuid(),
 rfq_id uuid not null references public.rfqs(id) on delete cascade,
 product_id uuid not null references public.products(id),
 supplier_id uuid not null references public.suppliers(id),
 quantity numeric(14,3) not null check(quantity>0),
 unit text not null,
 created_at timestamptz not null default now()
);
create table public.quotations (
 id uuid primary key default gen_random_uuid(),
 rfq_id uuid not null references public.rfqs(id),
 version integer not null check(version>0),
 state text not null check(state in ('draft','approved','superseded','cancelled')),
 currency char(3) not null,
 delivery_terms text,
 expires_at timestamptz,
 approved_by uuid references public.profiles(user_id),
 unique(rfq_id,version)
);
create table public.quotation_items (
 id uuid primary key default gen_random_uuid(),
 quotation_id uuid not null references public.quotations(id) on delete cascade,
 rfq_item_id uuid not null references public.rfq_items(id),
 unit_price numeric(14,4) not null check(unit_price>=0),
 quantity numeric(14,3) not null check(quantity>0),
 gp_snapshot jsonb not null default '{}'::jsonb,
 unique(quotation_id,rfq_item_id)
);
-- RLS default deny. Role must NOT be client-editable.
do $$ declare tbl text; begin
 foreach tbl in array array['profiles','suppliers','products','product_media','product_gp','gp_audit','rfqs','rfq_items','quotations','quotation_items'] loop
 execute format('alter table public.%I enable row level security',tbl);
 end loop;
end $$;
-- Read-only public catalogue limited to approved suppliers and products.
create policy public_products_read on public.products for select to anon,authenticated
 using (approved and exists(select 1 from public.suppliers s where s.id=supplier_id and s.status='approved'));
create policy public_media_read on public.product_media for select to anon,authenticated
 using (exists(select 1 from public.products p join public.suppliers s on s.id=p.supplier_id where p.id=product_id and p.approved and s.status='approved'));
create policy public_supplier_read on public.suppliers for select to anon,authenticated using(status='approved');
create policy own_profile_read on public.profiles for select to authenticated using(user_id=auth.uid());
create policy own_rfq_read on public.rfqs for select to authenticated using(buyer_id=auth.uid());
create policy own_rfq_item_read on public.rfq_items for select to authenticated using(exists(select 1 from public.rfqs r where r.id=rfq_id and r.buyer_id=auth.uid()));
-- Writes intentionally DENIED: implement vetted server-side authenticated RPCs with
-- authorisation & ownership checks; GP and quotation snapshots admin-only.
-- SECURITY BLOCKERS BEFORE MIGRATION: role-grant path; RPC transactionality; admin read policies;
-- quotation view excluding GP; supplier draft policies; GP audit trigger;
-- media Storage policies; safe auth onboarding and validation.
commit;
