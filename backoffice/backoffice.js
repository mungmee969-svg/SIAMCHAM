"use strict";
const seed={
rfqs:[{id:"RFQ-DEMO-001",buyer:"Global Foods Trading",country:"Singapore",items:4,status:"Review required",date:"2026-10-26"},{id:"RFQ-DEMO-002",buyer:"Craft & Culture",country:"Japan",items:2,status:"Supplier check",date:"2026-10-25"},{id:"RFQ-DEMO-003",buyer:"Asian Pantry",country:"Malaysia",items:6,status:"Quotation draft",date:"2026-10-24"}],
orders:[{id:"ORD-DEMO-001",buyer:"Global Foods Trading",supplier:"Thai Community Producer",amount:"USD 2,500",status:"Awaiting bank receipt",date:"2026-10-26"},{id:"ORD-DEMO-002",buyer:"Craft & Culture",supplier:"Artisan Goods Sample",amount:"USD 1,180",status:"Quotation review",date:"2026-10-25"}],
payments:[{id:"PAY-DEMO-001",order:"ORD-DEMO-001",expected:"USD 2,500",received:"—",reference:"Not provided",status:"Not verified"}],
payouts:[{id:"SET-DEMO-001",order:"ORD-DEMO-001",supplier:"Thai Community Producer",amount:"THB 66,000",status:"Blocked: funds not verified"}],
products:[{name:"Thai Jasmine Rice",category:"Rice & Grains",supplier:"Example supplier",status:"Draft"},{name:"Handwoven Cotton Scarf",category:"OTOP",supplier:"Community maker example",status:"Story needed"},{name:"Herbal Compress Ball",category:"OTOP",supplier:"Community maker example",status:"Review pending"}],
suppliers:[{name:"Thai Community Producer",location:"Province not verified",verification:"Documents pending",products:2},{name:"Artisan Goods Sample",location:"Province not verified",verification:"Not verified",products:1}]
};
const menu={
admin:[["overview","Overview"],["rfqs","RFQ & Quotations"],["orders","Orders"],["tracking","Shipment Tracking"],["payments","Incoming Payments"],["ledger","Income & Expenses"],["held","Held Funds"],["payouts","Supplier Payouts"],["products","Products & OTOP"],["suppliers","Suppliers"],["reports","Financial Reports"],["settings","Settings"]],
operations:[["overview","Overview"],["rfqs","RFQ & Quotations"],["orders","Orders"],["tracking","Shipment Tracking"],["products","Products & OTOP"],["suppliers","Suppliers"]],
finance:[["overview","Overview"],["orders","Orders"],["payments","Incoming Payments"],["payouts","Supplier Payouts"],["reports","Financial Reports"]],
supplier:[["overview","Overview"],["products","My Products"],["orders","My Orders"],["tracking","Shipment Tracking"],["payouts","My Settlements"]],
buyer:[["overview","Overview"],["rfqs","My RFQs"],["orders","My Orders"],["tracking","Shipment Tracking"],["payments","My Payments"]]
};
let role="admin",view="overview";

const uiTH={
"Income & Expenses":"รายรับ–รายจ่าย","Held Funds":"เงินพักรอตรวจสอบ","Shipment Tracking":"ติดตามการจัดส่ง","Overview":"ภาพรวม","RFQ & Quotations":"คำขอราคาและใบเสนอราคา","Orders":"คำสั่งซื้อ","Incoming Payments":"เงินรับจากต่างประเทศ","Supplier Payouts":"จ่ายเงินผู้ประกอบการ","Products & OTOP":"สินค้าและ OTOP","Suppliers":"ผู้ประกอบการ","Financial Reports":"รายงานการเงิน","Settings":"ตั้งค่า","My Products":"สินค้าของฉัน","My Orders":"คำสั่งซื้อของฉัน","My Settlements":"ยอดจ่ายของฉัน","My RFQs":"คำขอราคาของฉัน","My Payments":"การชำระเงินของฉัน",
"Platform-wide operations (demo)":"ศูนย์บริหาร SIAMCHAM (ตัวอย่าง)","Finance workspace (demo)":"ระบบการเงิน (ตัวอย่าง)","Supplier portal preview":"พื้นที่ผู้ประกอบการ (ตัวอย่าง)","Buyer portal preview":"พื้นที่ผู้ซื้อ (ตัวอย่าง)","Operations workspace (demo)":"ระบบปฏิบัติการ (ตัวอย่าง)","View role":"ดูสิทธิ์","Language":"ภาษา","Admin":"ผู้ดูแลระบบ","Operations":"ฝ่ายปฏิบัติการ","Finance":"ฝ่ายการเงิน","Supplier":"ผู้ประกอบการ","Buyer":"ผู้ซื้อ",
"Open RFQs":"คำขอราคาที่เปิดอยู่","Orders in pipeline":"คำสั่งซื้อระหว่างดำเนินการ","Confirmed bank receipts":"ยอดเงินเข้าที่ตรวจสอบแล้ว","Pending supplier payouts":"ยอดค้างจ่ายผู้ประกอบการ","Demonstration only":"ข้อมูลตัวอย่างเท่านั้น","Not live":"ยังไม่ใช่ระบบจริง","No bank connected":"ยังไม่เชื่อมธนาคาร","Blocked example":"รายการตัวอย่างที่ถูกระงับ","Latest trade activity":"กิจกรรมการซื้อขายล่าสุด","Next operational steps":"ขั้นตอนดำเนินงานถัดไป","Reference":"เลขอ้างอิง","Buyer / destination":"ผู้ซื้อ / ปลายทาง","Status":"สถานะ","Buyer":"ผู้ซื้อ","Destination":"ประเทศปลายทาง","Products":"สินค้า","Date":"วันที่","Supplier":"ผู้ประกอบการ","Quoted amount":"ยอดเสนอราคา","Order":"คำสั่งซื้อ",
"RFQ pipeline":"รายการคำขอราคา","My quotation requests":"คำขอราคา","New quote · backend required":"สร้างใบเสนอราคา · ต้องเชื่อมระบบ","International incoming payments":"เงินรับจากต่างประเทศ","Payment status":"สถานะชำระเงิน","Expected":"ยอดที่ต้องรับ","Cleared amount":"ยอดเข้าบัญชีจริง","Transfer reference":"เลขอ้างอิงการโอน","Payment verification checklist":"ขั้นตอนตรวจสอบเงินเข้า","Confirm cleared funds · backend required":"ยืนยันเงินเข้า · ต้องเชื่อมระบบ","Supplier payables & settlement":"เจ้าหนี้และยอดจ่ายผู้ประกอบการ","My settlement status":"สถานะรับเงินของฉัน","Settlement":"รายการจ่าย","Amount":"จำนวนเงิน","Approve payout · backend required":"อนุมัติจ่าย · ต้องเชื่อมระบบ","Settlement controls":"การควบคุมการจ่าย","My listings":"สินค้าของฉัน","Product":"สินค้า","Category":"หมวดหมู่","Upload products · backend required":"เพิ่มสินค้า · ต้องเชื่อมระบบ","OTOP storytelling data":"ข้อมูลเรื่องราวสินค้า OTOP","Supplier content":"ข้อมูลผู้ผลิต","Verification":"การตรวจสอบ","Maker story · province · materials":"เรื่องราวผู้ผลิต · จังหวัด · วัสดุ","OTOP status · documents":"สถานะ OTOP · เอกสาร","Supplier onboarding":"จัดการผู้ประกอบการ","Location":"ที่ตั้ง","Approve supplier · backend required":"อนุมัติผู้ประกอบการ · ต้องเชื่อมระบบ","Financial report modules":"หัวข้อรายงานการเงิน","Verified receipts":"เงินเข้าที่ตรวจสอบแล้ว","Supplier payables":"ยอดค้างจ่ายผู้ประกอบการ","Platform margin":"ส่วนต่าง SIAMCHAM","Unreconciled payments":"ยอดที่ยังไม่กระทบยอด","No connected bank":"ยังไม่เชื่อมธนาคาร","No ledger connected":"ยังไม่เชื่อมบัญชี","Not calculated":"ยังไม่คำนวณ","No imported statements":"ยังไม่มีรายการเดินบัญชี","Integration readiness":"การเชื่อมต่อระบบที่ต้องเตรียม",
"My listed products":"สินค้าของฉัน","My orders":"คำสั่งซื้อของฉัน","My settlement":"ยอดเงินรอรับ","OTOP content":"ข้อมูล OTOP","Illustrative listings":"สินค้าตัวอย่าง","Example record":"ข้อมูลตัวอย่าง","Not verified":"ยังไม่ตรวจสอบ","Stories to complete":"เรื่องราวที่ต้องเติม","My RFQs":"คำขอราคาของฉัน","Payments received":"ยอดที่ได้รับ","Open quotations":"ใบเสนอราคาที่เปิดอยู่","Example request":"คำขอตัวอย่าง","Demo examples":"ข้อมูลตัวอย่าง","Not bank-verified":"ธนาคารยังไม่ยืนยัน","Sample":"ตัวอย่าง",
"Review required":"รอตรวจสอบ","Supplier check":"ตรวจสอบผู้ประกอบการ","Quotation draft":"ร่างใบเสนอราคา","Awaiting bank receipt":"รอเงินเข้าบัญชี","Quotation review":"ตรวจใบเสนอราคา","Not provided":"ยังไม่ได้ระบุ","Blocked: funds not verified":"ระงับจ่าย: ยังไม่ยืนยันเงินเข้า","Draft":"ฉบับร่าง","Story needed":"ต้องเพิ่มเรื่องราว","Review pending":"รอตรวจสอบ","Documents pending":"รอเอกสาร","Province not verified":"ยังไม่ยืนยันจังหวัด",
"Cash reconciliation":"ตรวจสอบยอดเงินเข้าธนาคาร","Supplier settlements":"ยอดชำระผู้ประกอบการ","Margin reporting":"รายงานส่วนต่าง","Accounting export":"ส่งออกข้อมูลบัญชี",
"Validate supplier and product information":"ตรวจข้อมูลผู้ผลิตและสินค้า","Prepare export quotation and contract":"จัดทำใบเสนอราคาและสัญญา","Verify cleared bank receipts":"ตรวจสอบยอดเข้าบัญชีจริง","Approve supplier settlement":"อนุมัติจ่ายเงินผู้ประกอบการ",
"Match invoice and remitter":"เทียบใบแจ้งหนี้กับผู้โอน","Confirm actual bank credit and currency":"ยืนยันยอดเข้าจริงและสกุลเงิน","Record bank charges and FX rate":"บันทึกค่าธรรมเนียมและอัตราแลกเปลี่ยน","Approve only after bank confirmation":"อนุมัติหลังธนาคารยืนยันเท่านั้น",
"Verified, settled customer funds":"ยอดลูกค้าที่ได้รับและยืนยันแล้ว","Supplier agreement and margin snapshot":"ข้อตกลงผู้ผลิตและส่วนต่างที่บันทึกไว้","Finance approval and maker/checker separation":"อนุมัติโดยฝ่ายการเงินและแยกผู้ทำรายการ","Bank payout and reconciliation":"โอนจ่ายและตรวจสอบยอดธนาคาร"
};
let uiLang=localStorage.getItem("siamcham_backoffice_language")==="en"?"en":"th";
function translateUI(){
document.documentElement.lang=uiLang;q("language").value=uiLang;
q("roleLabel").textContent=uiLang==="th"?"ดูสิทธิ์":"View role";
q("languageLabel").textContent=uiLang==="th"?"ภาษา":"Language";
q("role").querySelectorAll("option").forEach(el=>{const en={admin:"Admin",operations:"Operations",finance:"Finance",supplier:"Supplier",buyer:"Buyer"}[el.value];el.textContent=uiLang==="th"?(uiTH[en]||en):en});
if(uiLang!=="th")return;
const walker=document.createTreeWalker(document.querySelector("main"),NodeFilter.SHOW_TEXT);
let node;while((node=walker.nextNode())){const original=node.nodeValue,trim=original.trim();if(uiTH[trim])node.nodeValue=original.replace(trim,uiTH[trim]);}
const nav=q("nav");nav.querySelectorAll("button").forEach(btn=>{const val=btn.textContent.trim();if(uiTH[val])btn.textContent=uiTH[val]});
}

const q=id=>document.getElementById(id);
const tag=status=>{const low=status.toLowerCase();const kind=/block|not verified|pending|await|review/i.test(low)?"warn":/draft|check/i.test(low)?"info":"";return '<span class="tag '+kind+'">'+escapeHTML(status)+'</span>'};
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function table(cols,rows){return '<div class="table-wrap"><table><thead><tr>'+cols.map(x=>'<th>'+x+'</th>').join("")+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(cell=>'<td>'+cell+'</td>').join("")+'</tr>').join("")+'</tbody></table></div>'}
function panel(title,body,aside=""){return '<section class="panel"><div class="panel-head"><h2>'+title+'</h2>'+aside+'</div>'+body+'</section>'}
function notice(s){return '<div class="notice">'+s+'</div>'}
function cards(items){return '<div class="stats">'+items.map(([label,value,sub])=>'<div class="metric"><span>'+label+'</span><strong>'+value+'</strong><small>'+sub+'</small></div>').join("")+'</div>'}
function rfqs(){return panel(role==="buyer"?"My quotation requests":"RFQ pipeline",table(["Reference","Buyer","Destination","Products","Status","Date"],seed.rfqs.filter((x,i)=>role==="buyer"?i===0:true).map(x=>[x.id,role==="buyer"?"Your organization":x.buyer,x.country,String(x.items),tag(x.status),x.date])), '<button class="button" disabled>New quote · backend required</button>')}
function orders(){return panel("Orders",table(["Order","Buyer","Supplier","Quoted amount","Status","Date"],seed.orders.map(x=>[x.id,role==="buyer"?"Your organization":x.buyer,role==="buyer"?"Thai supplier":x.supplier,x.amount,tag(x.status),x.date])))}
function payments(){return notice("Bank transfer instructions, bank accounts and payment verification must be supplied by a secured server. Do not treat uploaded slips or SWIFT messages as proof of cleared funds.")+panel(role==="buyer"?"Payment status":"International incoming payments",table(["Reference","Order","Expected","Cleared amount","Transfer reference","Status"],seed.payments.map(x=>[x.id,x.order,x.expected,x.received,x.reference,tag(x.status)])),role==="buyer"?"":'<button class="button" disabled>Confirm cleared funds · backend required</button>')+panel("Payment verification checklist",'<div class="steps">'+["Match invoice and remitter","Confirm actual bank credit and currency","Record bank charges and FX rate","Approve only after bank confirmation"].map((x,i)=>'<div class="step"><b>'+(i+1)+'</b>'+x+'</div>').join("")+'</div>')}
function payouts(){return notice("Supplier payouts are locked in this prototype. No live funds, payout approval or bank transfers are implemented.")+panel(role==="supplier"?"My settlement status":"Supplier payables & settlement",table(["Settlement","Order",role==="supplier"?"Status source":"Supplier","Amount","Status"],seed.payouts.map(x=>[x.id,x.order,role==="supplier"?"SIAMCHAM":x.supplier,x.amount,tag(x.status)])),role==="supplier"?"":'<button class="button" disabled>Approve payout · backend required</button>')+panel("Settlement controls",'<div class="steps"><div class="step"><b>1</b>Verified, settled customer funds</div><div class="step"><b>2</b>Supplier agreement and margin snapshot</div><div class="step"><b>3</b>Finance approval and maker/checker separation</div><div class="step"><b>4</b>Bank payout and reconciliation</div></div>')}
function products(){return panel(role==="supplier"?"My listings":"Products & OTOP",table(["Product","Category","Supplier","Status"],seed.products.filter((x,i)=>role==="supplier"?i>0:true).map(x=>[escapeHTML(x.name),x.category,role==="supplier"?"Your organization":escapeHTML(x.supplier),tag(x.status)])),'<button class="button" disabled>Upload products · backend required</button>')+panel("OTOP storytelling data",'<div class="split"><div class="info-box"><span>Supplier content</span><strong>Maker story · province · materials</strong><p>Require maker-provided descriptions, production photos, video and consent.</p></div><div class="info-box"><span>Verification</span><strong>OTOP status · documents</strong><p>Use only supplier-provided evidence confirmed by your team.</p></div></div>')}
function suppliers(){return panel("Supplier onboarding",table(["Supplier","Location","Verification","Products"],seed.suppliers.map(x=>[escapeHTML(x.name),x.location,tag(x.verification),String(x.products)])),'<button class="button" disabled>Approve supplier · backend required</button>')}
function reports(){return notice("Financial examples are not a ledger. Real reporting requires foreign-currency amounts, actual credit, fee allocation, FX conversion, supplier liabilities and immutable audit records.")+cards([["Verified receipts","—","No connected bank"],["Supplier payables","—","No ledger connected"],["Platform margin","—","Not calculated"],["Unreconciled payments","—","No imported statements"]])+panel("Financial report modules",'<div class="split"><div class="info-box"><strong>Cash reconciliation</strong><p>Bank statement, reference, currency and receipt date</p></div><div class="info-box"><strong>Supplier settlements</strong><p>Payable ledger, payment approvals and transfers</p></div><div class="info-box"><strong>Margin reporting</strong><p>GP snapshot per SKU and FX/bank charges</p></div><div class="info-box"><strong>Accounting export</strong><p>Invoices, credit notes and audit trail</p></div></div>')}
function settings(){return notice("Security controls are not active here. Roles shown in the switcher are view previews, not authenticated authorization.")+panel("Integration readiness",'<div class="steps"><div class="step"><b>1</b>Supabase Auth, secure role membership and RLS</div><div class="step"><b>2</b>Server-side price, margin and payout policies</div><div class="step"><b>3</b>Corporate bank account setup and payment verification</div><div class="step"><b>4</b>Legally reviewed invoice / agency agreements</div><div class="step"><b>5</b>Two-person payout approval and logs</div></div>')}
function overview(){
const roleMetric=role==="supplier"?[["My listed products","2","Illustrative listings"],["My orders","1","Example record"],["My settlement","Pending","Not verified"],["OTOP content","2","Stories to complete"]]:role==="buyer"?[["My RFQs","1","Example request"],["My orders","2","Demo examples"],["Payments received","0","Not bank-verified"],["Open quotations","1","Sample"]]:[["Open RFQs","3","Demonstration only"],["Orders in pipeline","2","Not live"],["Confirmed bank receipts","0","No bank connected"],["Pending supplier payouts","1","Blocked example"]];
return cards(roleMetric)+'<div class="layout">'+panel("Latest trade activity",table(["Reference","Buyer / destination","Status"],seed.rfqs.map(x=>[x.id,x.buyer+" · "+x.country,tag(x.status)])))+panel("Next operational steps",'<div class="steps"><div class="step"><b>1</b>Validate supplier and product information</div><div class="step"><b>2</b>Prepare export quotation and contract</div><div class="step"><b>3</b>Verify cleared bank receipts</div><div class="step"><b>4</b>Approve supplier settlement</div></div>')+'</div>'+notice("This is a static preview. All figures and trading entities shown are fictitious demonstrations, not operational balances or transactions.")}

// Shared DEMO operational dataset; separate expected receipts, verified receipts, held funds and payables.
const sampleLedger=[
{id:"TX-001",order:"ORD-DEMO-001",type:"income",category:"Incoming wire",amount:91500,currency:"THB",status:"Held · verification",date:"2026-10-26"},
{id:"TX-002",order:"ORD-DEMO-001",type:"expense",category:"Bank transfer fee",amount:650,currency:"THB",status:"Estimate",date:"2026-10-26"},
{id:"TX-003",order:"ORD-DEMO-002",type:"expense",category:"Export handling",amount:1200,currency:"THB",status:"Estimate",date:"2026-10-25"}
];
const samplePayables=[
{id:"AP-001",order:"ORD-DEMO-001",supplier:"Thai Community Producer",amount:66000,currency:"THB",due:"Not due until release",status:"Blocked · payment unverified"},
{id:"AP-002",order:"ORD-DEMO-002",supplier:"Artisan Goods Sample",amount:28000,currency:"THB",due:"Awaiting order approval",status:"Not approved"}
];
const sampleShipping=[
{order:"ORD-DEMO-001",buyer:"Global Foods Trading",carrier:"Not assigned",tracking:"Not issued",status:"Awaiting payment",updated:"2026-10-26",events:[["2026-10-26","Order created (demo)"],["—","Bank receipt awaiting verification"],["—","Supplier preparation not started"],["—","Carrier collection pending"],["—","In transit / customs pending"],["—","Delivered pending"]]},
{order:"ORD-DEMO-002",buyer:"Craft & Culture",carrier:"Not assigned",tracking:"Not issued",status:"Quotation stage",updated:"2026-10-25",events:[["2026-10-25","Quotation under review (demo)"],["—","Order confirmation pending"]]}
];
const money=n=>new Intl.NumberFormat("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2}).format(n)+" THB";
function local(h,en){return uiLang==="th"?h:en}
function financeSummary(){
return cards([
[local("รายรับที่ยืนยันแล้ว","Verified receipts"),money(0),local("ไม่มีธนาคารเชื่อมต่อ","No bank integration")],
[local("ยอดพักรอตรวจสอบ (ตัวอย่าง)","Held / unverified (sample)"),money(sampleLedger.filter(x=>x.type==="income"&&x.status.includes("Held")).reduce((a,x)=>a+x.amount,0)),local("ยังไม่ใช่เงินพร้อมจ่าย","Not releasable")],
[local("ยอดค้างจ่ายผู้ประกอบการ (ตัวอย่าง)","Supplier payables (sample)"),money(samplePayables.reduce((a,x)=>a+x.amount,0)),local("ห้ามโอนจนกว่าอนุมัติ","Approval required")],
[local("รายจ่ายประมาณการ (ตัวอย่าง)","Estimated expenses (sample)"),money(sampleLedger.filter(x=>x.type==="expense").reduce((a,x)=>a+x.amount,0)),local("ยังไม่ใช่ยอดจ่ายจริง","Not paid")]
]);}
function ledger(){
return notice(local("ข้อมูลทั้งหมดเป็นตัวอย่าง รายการเงินพักและรายจ่ายประมาณการไม่ใช่ยอดรับจ่ายจริง","All figures are examples; held receipts and estimated expenses are not cleared or paid transactions."))+
financeSummary()+panel(local("สมุดรายรับ–รายจ่าย","Income & expense ledger"),table(
[local("รหัสรายการ","Transaction"),local("ออเดอร์","Order"),local("ประเภท","Type"),local("หมวด","Category"),local("จำนวนเงิน","Amount"),local("สถานะ","Status"),local("วันที่","Date")],
sampleLedger.map(x=>[x.id,x.order,local(x.type==="income"?"รับ":"จ่าย",x.type==="income"?"Income":"Expense"),escapeHTML(x.category),money(x.amount),tag(x.status),x.date])))+
panel(local("ตรวจสอบยอดก่อนสรุปกำไร","Reconcile before reporting margin"),'<p>'+local("รายได้จากคำสั่งซื้อ ต้นทุนสินค้า ส่วนต่าง GP ค่าธรรมเนียมธนาคาร และอัตราแลกเปลี่ยนต้องเก็บเป็นรายการแยก พร้อมแหล่งข้อมูลตรวจสอบได้","Orders, supplier costs, GP margin, bank fees and exchange rates require separately auditable records.")+'</p>');
}
function held(){
return notice(local("ยอดพักหมายถึงเงินที่อ้างว่ารับ/รอตรวจสอบ ไม่สามารถนับเป็นเงินยืนยันแล้วหรือสั่งจ่ายได้","Held funds represent pending verification and cannot be recognized as cleared or released."))+
financeSummary()+panel(local("รายการเงินพักและข้อจำกัด","Held amounts & release gates"),table(
[local("รายการ","Reference"),local("ออเดอร์","Order"),local("ยอดอ้างอิง","Indicative amount"),local("สถานะ","Status"),local("เงื่อนไขปล่อยเงิน","Release condition")],
sampleLedger.filter(x=>x.type==="income"&&x.status.includes("Held")).map(x=>[x.id,x.order,money(x.amount),tag(x.status),local("ตรวจเงินเข้าจริงและอนุมัติ 2 ขั้น","Bank cleared + 2-person approval")])))+
panel(local("การปล่อยยอดพัก","Release checks"),'<div class="steps">'+
[local("ยืนยันเงินเข้าจากบัญชีธนาคารบริษัท","Confirm real corporate bank credit"),local("ตรวจยอดหักค่าธรรมเนียมและ FX","Reconcile bank fees and FX"),local("จับคู่ Invoice กับออเดอร์","Match invoice and order"),local("อนุมัติการปล่อยเงินโดยฝ่ายที่มีสิทธิ์","Authorized approval for release")].map((x,i)=>'<div class="step"><b>'+(i+1)+'</b>'+x+'</div>').join('')+'</div>');
}
function tracking(){
return notice(local("เลขติดตามและสถานะเป็นตัวอย่าง ยังไม่เชื่อมบริษัทขนส่ง และไม่มีพัสดุจริงระหว่างทาง","Sample shipping states only: no carrier integration or live shipments."))+
panel(local("รายการติดตามออเดอร์","Order shipment tracking"),
table([local("ออเดอร์","Order"),local("ลูกค้า","Buyer"),local("บริษัทขนส่ง","Carrier"),local("เลขติดตาม","Tracking number"),local("สถานะ","Status"),local("อัปเดต","Updated")],
sampleShipping.map(x=>[x.order,role==="buyer"?"Your organization":role==="supplier"?"SIAMCHAM":x.buyer,x.carrier,x.tracking,tag(x.status),x.updated])))+
panel(local("ไทม์ไลน์การจัดส่ง","Shipment status timeline"),sampleShipping.map(x=>'<div class="shipment-timeline"><strong>'+x.order+'</strong><div class="steps">'+x.events.map(([date,msg],i)=>'<div class="step"><b>'+(i+1)+'</b><span>'+escapeHTML(msg)+'</span><small>'+date+'</small></div>').join('')+'</div></div>').join(''));
}
function orderReport(){
const qty=seed.orders.length,ship=sampleShipping;
return panel(local("รายงานสถานะคำสั่งซื้อ","Order status report"),
cards([[local("คำสั่งซื้อทั้งหมด","Total orders"),String(qty),local("ข้อมูลตัวอย่าง","Demo")],[local("รอรับชำระ","Awaiting payment"),"1",local("ข้อมูลตัวอย่าง","Demo")],[local("กำลังขนส่ง","In transit"),"0",local("ยังไม่เริ่มส่ง","Not dispatched")],[local("ส่งถึงแล้ว","Delivered"),"0",local("ยังไม่มีหลักฐานส่งมอบ","No delivery evidence")]]))+
panel(local("คำสั่งซื้อและขนส่ง","Orders & shipping"),table(
[local("ออเดอร์","Order"),local("ลูกค้า","Buyer"),local("ยอดเสนอราคา","Quoted amount"),local("สถานะออเดอร์","Order status"),local("สถานะขนส่ง","Shipping status")],
seed.orders.map(x=>[x.id,x.buyer,x.amount,tag(x.status),tag((ship.find(z=>z.order===x.id)||{status:"Not dispatched"}).status)])));
}
function detailedReports(){
return notice(local("รายงานนี้ใช้ข้อมูลสาธิต ไม่ใช่งบการเงินจริง ข้อมูลสกุลเงินต่างประเทศห้ามรวมกับเงินบาทก่อนแปลง FX อย่างถูกต้อง","Demo reporting, not financial statements. Foreign-currency orders cannot be added to THB totals without reconciled FX."))+
financeSummary()+panel(local("สรุปรายงานการเงิน","Financial report categories"),
'<div class="split">'+[
[local("รายรับตามช่องทาง/สกุลเงิน","Receipts by currency"),local("ยอดรอชำระ ยอดพัก และยอดยืนยัน","Expected, held and cleared")],
[local("รายจ่ายตามหมวด","Expense categories"),local("ค่าขนส่ง ค่าธรรมเนียม ค่าใช้จ่ายดำเนินงาน","Shipping, bank and operating costs")],
[local("เจ้าหนี้แยกผู้ประกอบการ","Payables by supplier"),local("ยอดค้าง ยอดอนุมัติ และยอดจ่ายแล้ว","Outstanding, approved and paid")],
[local("กำไรและส่วนต่าง","Margin reporting"),local("คำนวณจาก GP จริงต่อ SKU และต้นทุนที่ตรวจแล้ว","Verified SKU GP and costs")]
].map(([a,b])=>'<div class="info-box"><strong>'+a+'</strong><p>'+b+'</p></div>').join('')+'</div>')+
panel(local("ยอดค้างจ่ายผู้ประกอบการ","Supplier payable report"),table(
[local("ออเดอร์","Order"),local("ผู้ประกอบการ","Supplier"),local("ยอดค้าง","Payable"),local("สถานะ","Status")],
samplePayables.map(x=>[x.order,x.supplier,money(x.amount),tag(x.status)])))+orderReport();
}
// Existing reports page is extended with financial and order breakdowns.
function financeAndOrdersReports(){return detailedReports()}

const pages={overview,rfqs,orders,payments,payouts,products,suppliers,reports:financeAndOrdersReports,ledger,held,tracking,settings};
function render(){const allowed=menu[role];if(!allowed.some(x=>x[0]===view))view="overview";q("nav").innerHTML=allowed.map(([id,label])=>'<button type="button" class="'+(view===id?"active":"")+'" data-view="'+id+'">'+label+'</button>').join("");q("nav").querySelectorAll("button").forEach(el=>el.addEventListener("click",()=>{view=el.dataset.view;render()}));const name=allowed.find(x=>x[0]===view)[1];q("title").textContent=name;q("crumb").textContent=name;q("subtitle").textContent=role==="admin"?"Platform-wide operations (demo)":role==="finance"?"Finance workspace (demo)":role==="supplier"?"Supplier portal preview":role==="buyer"?"Buyer portal preview":"Operations workspace (demo)";q("content").innerHTML=pages[view]();translateUI();location.hash=role+"/"+view}
q("language").addEventListener("change",e=>{uiLang=e.target.value;localStorage.setItem("siamcham_backoffice_language",uiLang);render()});
q("role").addEventListener("change",e=>{role=e.target.value;view="overview";render()});
const saved=location.hash.slice(1).split("/");if(menu[saved[0]]){role=saved[0];view=saved[1]||"overview";q("role").value=role}render();