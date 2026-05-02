/**
 * Handles multi-language support, form state, and UI interactions.
 */

/* --- TRANSLATION DICTIONARY --- */
const Translations = {
    en: {
        title: "Sales Handover Template",
        subtitle: "CubesERP Intelligence Brief",
        progress: "Mandatory Data Completion",
        footerWarn: "No demo scheduled without mandatory fields.",
        btnExport: "Generate Summary Report ↗",
        modalTitle: "Handover Summary",
        modalSub: "Copy this report for internal pre-sales communication.",
        btnCopy: "Copy to Clipboard 📋",
        btnClose: "Close",
        langBtn: "العربية",
        badges: { req: "Required", crit: "Critical", opt: "Optional" },
        sections: {
            basic: { title: "Client Basic Information", tip: "" },
            biz: { title: "Business Overview", tip: "" },
            pain: { title: "Current Pain Points", tip: "CRITICAL: Capture the exact problems the client is facing." },
            demo: { title: "Key Demo Focus", tip: "Define exactly what the client expects to see." },
            flow: { title: "Business Flow Snapshot", tip: "A brief flow description saves 50% of demo prep time." },
            dm: { title: "Decision Makers", tip: "" },
            timing: { title: "Timeline & Urgency", tip: "" }
        },
        fields: {
            c_name: "Contact Person Name",
            co_name: "Company Legal Name",
            location: "Country / City",
            industry: "Industry Sector",
            size: "Approx. Company Size",
            desc: "Business Description (Brief)",
            type: "Business Model",
            market: "Market Type",
            sys: "Current System",
            erp_old: "System Name (if any)",
            pains: "Primary Pain Points",
            focus: "Demo Focus Areas",
            scenarios: "Specific Scenarios / Requests",
            sales_flow: "Sales Cycle",
            purchase_flow: "Procurement Cycle",
            attendees: "Meeting Attendees",
            dm_name: "Final Decision Maker",
            it_involvement: "IT / Finance Involved?",
            start: "Planned Start Date",
            urgency: "Urgency Level",
            budget: "Budget Status"
        }
    },
    ar: {
        title: "تمبلت تسليم المبيعات",
        subtitle: "موجز معلومات ما قبل الديمو - CubesERP",
        progress: "نسبة اكتمال البيانات الإجبارية",
        footerWarn: "لن يتم جدولة ديمو بدون استكمال الحقول الإجبارية.",
        btnExport: "تصدير تقرير الملخص ↗",
        modalTitle: "ملخص التسليم",
        modalSub: "انسخ هذا التقرير للتواصل الداخلي مع فريق ما قبل البيع.",
        btnCopy: "نسخ النص 📋",
        btnClose: "إغلاق",
        langBtn: "English",
        badges: { req: "إجباري", crit: "هام جداً", opt: "اختياري" },
        sections: {
            basic: { title: "معلومات العميل الأساسية", tip: "" },
            biz: { title: "نبذة عن النشاط", tip: "" },
            pain: { title: "المشاكل الحالية (Pain Points)", tip: "هام جداً: سجل المشاكل اللي بيواجهها العميل بلسانه." },
            demo: { title: "التركيز الأساسي في الديمو", tip: "حدد بالظبط العميل عايز يشوف إيه عشان الديمو ينجح." },
            flow: { title: "نظرة سريعة على دورة العمل", tip: "وصف بسيط للدورة المستندية بيوفر نص وقت التجهيز." },
            dm: { title: "صناع القرار", tip: "" },
            timing: { title: "الجدول الزمني والميزانية", tip: "" }
        },
        fields: {
            c_name: "اسم الشخص المسؤول",
            co_name: "اسم الشركة (القانوني)",
            location: "الدولة / المدينة",
            industry: "مجال العمل",
            size: "حجم الشركة (تقريبي)",
            desc: "وصف النشاط (مختصر)",
            type: "نموذج العمل",
            market: "نوع السوق",
            sys: "السيستم الحالي",
            erp_old: "اسم السيستم (إن وجد)",
            pains: "أهم المشاكل الحالية",
            focus: "أهم الموديولات المطلوبة في الديمو",
            scenarios: "سيناريوهات أو طلبات خاصة",
            sales_flow: "دورة المبيعات",
            purchase_flow: "دورة المشتريات",
            attendees: "من حضر الاجتماع؟",
            dm_name: "صاحب القرار النهائي",
            it_involvement: "هل الـ IT أو المالية مشتركين؟",
            start: "تاريخ البدء المخطط",
            urgency: "مستوى الاستعجال",
            budget: "حالة الميزانية"
        }
    }
};

/* --- FORM SCHEMA --- */
const FormSchema = [
    { id: "basic", num: "01", badge: "req", fields: [{id:"c_name",required:true,type:"text"},{id:"co_name",required:true,type:"text"},{id:"location",required:true,type:"text"},{id:"industry",required:true,type:"text"},{id:"size",type:"text"}] },
    { id: "biz", num: "02", badge: "req", fields: [{id:"desc",required:true,type:"textarea"},{id:"type",required:true,type:"radio",options:["Product","Service","Both"]},{id:"market",required:true,type:"radio",options:["B2B","B2C","Both"]}] },
    { id: "pain", num: "03", badge: "crit", fields: [{id:"sys",required:true,type:"radio",options:["Excel","Cloud ERP","Legacy Local ERP","Manual"]},{id:"erp_old",type:"text"},{id:"pains",required:true,type:"textarea"}] },
    { id: "demo", num: "04", badge: "crit", fields: [{id:"focus",required:true,type:"check",options:["Accounting","Inventory","HR/Payroll","POS","CRM","Manufacturing","Projects","Purchasing","E-Invoicing"]},{id:"scenarios",type:"textarea"}] },
    { id: "flow", num: "05", badge: "opt", fields: [{id:"sales_flow",type:"textarea"},{id:"purchase_flow",type:"textarea"}] },
    { id: "dm", num: "06", badge: "req", fields: [{id:"attendees",required:true,type:"text"},{id:"dm_name",required:true,type:"text"},{id:"it_involvement",required:true,type:"radio",options:["Yes","No"]}] },
    { id: "timing", num: "07", badge: "req", fields: [{id:"start",required:true,type:"text"},{id:"urgency",required:true,type:"radio",options:["High","Medium","Low"]},{id:"budget",required:true,type:"radio",options:["Approved","Pending","Unknown"]}] }
];

/* --- TRANSLATION ENGINE --- */
const TranslationEngine = {
    currentLang: 'en',
    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
        document.documentElement.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', this.currentLang);
        this.updateUI();
    },
    updateUI() {
        const t = Translations[this.currentLang];
        document.getElementById('ui-title').innerText = t.title;
        document.getElementById('ui-subtitle').innerText = t.subtitle;
        document.getElementById('ui-progress-label').innerText = t.progress;
        document.getElementById('ui-footer-warn').innerText = t.footerWarn;
        document.getElementById('ui-btn-export').innerText = t.btnExport;
        document.getElementById('ui-modal-title').innerText = t.modalTitle;
        document.getElementById('ui-modal-sub').innerText = t.modalSub;
        document.getElementById('ui-btn-copy').innerText = t.btnCopy;
        document.getElementById('ui-modal-close').innerText = t.btnClose;
        document.getElementById('lang-label').innerText = t.langBtn;
        
        CoreEngine.renderAll();
    }
};

/* --- CORE ENGINE --- */
const CoreEngine = {
    state: {},
    requiredIds: [],
    init() {
        FormSchema.forEach(s => s.fields.forEach(f => { if(f.required) this.requiredIds.push(f.id); }));
        this.renderAll();
        this.updateProgress();
    },
    renderAll() {
        const container = document.getElementById('form-container');
        container.innerHTML = '';
        FormSchema.forEach((sec, idx) => container.appendChild(UIController.createSection(sec, idx === 0)));
    },
    updateState(id, val) { this.state[id] = val; this.updateProgress(); },
    updateProgress() {
        let filled = 0;
        this.requiredIds.forEach(id => {
            const v = this.state[id];
            if (Array.isArray(v) ? v.length > 0 : (v && v.toString().trim() !== '')) filled++;
        });
        const pct = Math.round((filled / this.requiredIds.length) * 100);
        document.getElementById('pct-bar').style.width = pct + '%';
        document.getElementById('pct-text').innerText = pct + '%';
    },
    generateSummary() {
        const t = Translations[TranslationEngine.currentLang];
        let report = `DATA VALUE | HANDOVER REPORT\n=========================\n\n`;
        FormSchema.forEach(sec => {
            report += `[${sec.num}] ${t.sections[sec.id].title.toUpperCase()}\n`;
            sec.fields.forEach(f => {
                const val = this.state[f.id];
                report += `• ${t.fields[f.id]}: ${Array.isArray(val) ? val.join(', ') : (val || '---')}\n`;
            });
            report += `\n`;
        });
        UIController.openModal(report);
    },
    copyToClipboard() {
        navigator.clipboard.writeText(document.getElementById('summary-output').innerText).then(() => alert('Copied to Clipboard!'));
    }
};

/* --- UI CONTROLLER --- */
const UIController = {
    createSection(data, isOpen) {
        const t = Translations[TranslationEngine.currentLang];
        const card = document.createElement('div');
        card.className = 'dv-section';
        card.innerHTML = `
            <div class="dv-section-header" onclick="UIController.toggle('${data.id}')">
                <div class="dv-section-title"><div class="dv-step-num">${data.num}</div><span>${t.sections[data.id].title}</span></div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <span class="dv-badge badge-${data.badge}">${t.badges[data.badge]}</span>
                    <span class="dv-chevron ${isOpen?'open':''}" id="chevron-${data.id}">▾</span>
                </div>
            </div>
            <div class="dv-section-body ${isOpen?'open':''}" id="body-${data.id}">
                ${t.sections[data.id].tip ? `<div class="dv-info-box"><span>💡</span><span>${t.sections[data.id].tip}</span></div>` : ''}
                <div id="fields-${data.id}"></div>
            </div>`;
        this.renderFields(data.id, data.fields, card.querySelector(`#fields-${data.id}`));
        return card;
    },
    renderFields(sid, fields, container) {
        const t = Translations[TranslationEngine.currentLang];
        fields.forEach(f => {
            const group = document.createElement('div');
            group.className = 'dv-field-group';
            let html = `<label class="dv-label">${t.fields[f.id]} ${f.required?'<span style="color:red">*</span>':''}</label>`;
            const val = CoreEngine.state[f.id] || '';
            if(f.type==='text') html += `<input type="text" class="dv-input" value="${val}" oninput="CoreEngine.updateState('${f.id}', this.value)">`;
            else if(f.type==='textarea') html += `<textarea class="dv-input" rows="2" oninput="CoreEngine.updateState('${f.id}', this.value)">${val}</textarea>`;
            else if(f.type==='radio') {
                html += `<div class="dv-pill-group">${f.options.map(o => `<div class="dv-pill ${val===o?'active':''}" onclick="UIController.setPill('${f.id}','${o}',this)">${o}</div>`).join('')}</div>`;
            } else if(f.type==='check') {
                html += `<div class="dv-check-grid">${f.options.map(o => {
                    const checked = Array.isArray(val) && val.includes(o);
                    return `<label class="dv-check-card ${checked?'checked':''}" onclick="UIController.setCheck('${f.id}','${o}',this)"><input type="checkbox" ${checked?'checked':''} onclick="event.stopPropagation()"><span>${o}</span></label>`;
                }).join('')}</div>`;
            }
            group.innerHTML = html;
            container.appendChild(group);
        });
    },
    toggle(id) {
        const b = document.getElementById(`body-${id}`), c = document.getElementById(`chevron-${id}`);
        const open = b.classList.contains('open');
        b.classList.toggle('open', !open); c.classList.toggle('open', !open);
    },
    setPill(id, v, el) {
        el.parentElement.querySelectorAll('.dv-pill').forEach(p => p.classList.remove('active'));
        el.classList.add('active'); CoreEngine.updateState(id, v);
    },
    setCheck(id, v, el) {
        if(!CoreEngine.state[id]) CoreEngine.state[id] = [];
        const idx = CoreEngine.state[id].indexOf(v);
        if(idx > -1) { CoreEngine.state[id].splice(idx, 1); el.classList.remove('checked'); el.querySelector('input').checked = false; }
        else { CoreEngine.state[id].push(v); el.classList.add('checked'); el.querySelector('input').checked = true; }
        CoreEngine.updateProgress();
    },
    openModal(text) { document.getElementById('summary-output').innerText = text; document.getElementById('reportModal').style.display = 'flex'; },
    closeModal() { document.getElementById('reportModal').style.display = 'none'; }
};

/* --- INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => CoreEngine.init());

// Modal outside click handler
window.onclick = (e) => {
    if (e.target == document.getElementById('reportModal')) UIController.closeModal();
};
