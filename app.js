const STORAGE_KEY = 'work-supervision-v1';
const DIRECTIONS = ['ПСТБИ', 'Школы', 'Олимпиады'];
const CRM_STAGES = ['неразобранные','нет связи','думает','жду обратной связи','ждет собеседования','к владыке','не прошел фильтр','Прошел собеседование','в беседе абитуриентов','не в ПСТБИ','28+'];
const MONTH_RESULTS = ['','Готово','Частично','Не сделано','Перенесено','Снято'];
const WORK_STATUSES = ['Запланировано','В работе','Ожидание','К согласованию','Заблокировано','Завершено'];
const PRIORITIES = ['','Высокий','Средний','Низкий'];
const TASK_TYPES = ['Задача','Группа задач','Предложение'];

const seed = {
  version: 1,
  projects: [
    {code:'1.1', direction:'ПСТБИ', name:'Работа с базой CRM', type:'Постоянная работа'},
    {code:'1.2.1', direction:'ПСТБИ', name:'Трёхдневный практикум', type:'Проект'},
    {code:'1.2.2', direction:'ПСТБИ', name:'Эфиры', type:'Проект'},
    {code:'1.2.3', direction:'ПСТБИ', name:'День открытых дверей (ДОД)', type:'Проект'},
    {code:'1.3.1', direction:'ПСТБИ', name:'Работа над сайтом', type:'Проект'},
    {code:'1.3.2', direction:'ПСТБИ', name:'Мерч', type:'Проект'},
    {code:'2.1', direction:'Школы', name:'Конференция для руководителей школ', type:'Проект'},
    {code:'2.2', direction:'Школы', name:'Привезти две школы в Лихов', type:'Проект'},
    {code:'2.3', direction:'Школы', name:'Два круглых стола с учителями-предметниками', type:'Проект'},
    {code:'2.4', direction:'Школы', name:'Сайт / портал для школ-партнёров', type:'Проект'},
    {code:'3.1', direction:'Олимпиады', name:'Присутствие на мероприятиях олимпиады', type:'Постоянная работа'}
  ],
  tasks: [
    {id:'1.1-01', direction:'ПСТБИ', projectCode:'1.1', title:'Поддерживать базу CRM и зафиксировать состояние и сделки по стадиям за месяц.', parentId:'', type:'Задача', recurring:true},
    {id:'1.2.1-01', direction:'ПСТБИ', projectCode:'1.2.1', title:'Провести запланированное собрание по трёхдневному практикуму.', parentId:'', type:'Задача'},
    {id:'1.2.2-01', direction:'ПСТБИ', projectCode:'1.2.2', title:'Провести первый эфир.', parentId:'', type:'Задача'},
    {id:'1.2.3-01', direction:'ПСТБИ', projectCode:'1.2.3', title:'Провести день открытых дверей.', parentId:'', type:'Задача'},
    {id:'1.3.1-01', direction:'ПСТБИ', projectCode:'1.3.1', title:'Снять три ролика для сайта с Никитой.', parentId:'', type:'Задача'},
    {id:'1.3.2-01', direction:'ПСТБИ', projectCode:'1.3.2', title:'Начать работу над мерчем.', parentId:'', type:'Предложение'},
    {id:'2.1-01', direction:'Школы', projectCode:'2.1', title:'Провести встречу с И. В. Павлюткиным по конференции для руководителей школ.', parentId:'', type:'Задача'},
    {id:'2.2-01', direction:'Школы', projectCode:'2.2', title:'Привезти две школы в Лихов переулок.', parentId:'', type:'Группа задач'},
    {id:'2.2-01.1', direction:'Школы', projectCode:'2.2', title:'Организовать приезд первой школы в Лихов переулок.', parentId:'2.2-01', type:'Задача'},
    {id:'2.2-01.2', direction:'Школы', projectCode:'2.2', title:'Организовать приезд второй школы в Лихов переулок.', parentId:'2.2-01', type:'Задача'},
    {id:'2.3-01', direction:'Школы', projectCode:'2.3', title:'Провести два круглых стола с учителями-предметниками.', parentId:'', type:'Группа задач'},
    {id:'2.3-01.1', direction:'Школы', projectCode:'2.3', title:'Провести первый круглый стол с учителями-предметниками.', parentId:'2.3-01', type:'Задача'},
    {id:'2.3-01.2', direction:'Школы', projectCode:'2.3', title:'Провести второй круглый стол с учителями-предметниками.', parentId:'2.3-01', type:'Задача'},
    {id:'2.4-01', direction:'Школы', projectCode:'2.4', title:'Определить первый этап создания сайта / портала для школ-партнёров.', parentId:'', type:'Предложение'},
    {id:'3.1-01', direction:'Олимпиады', projectCode:'3.1', title:'Принять участие в мероприятии олимпиады.', parentId:'', type:'Задача', recurring:true}
  ],
  taskMonths: [
    {taskId:'1.1-01', month:'2026-09', planned:'Поддерживать базу CRM и зафиксировать состояние и сделки по стадиям за месяц.', deadline:'', priority:'', status:'В работе', monthResult:'', actual:'Работа с CRM ведётся в течение всего года.', blocker:'Показатели и состояние базы пока не внесены.', nextStep:'Заполнить строку сентября на экране CRM; далее добавлять срез каждый месяц.', carryTo:''},
    {taskId:'1.2.2-01', month:'2026-09', planned:'Провести первый эфир.', deadline:'2026-09-30', priority:'', status:'Запланировано', monthResult:'', actual:'Даты эфиров запланированы, анонсы опубликованы.', blocker:'Время эфира не указано.', nextStep:'Провести первый эфир и зафиксировать результат.', carryTo:''}
  ],
  crm: [{month:'2026-09', snapshotDate:'', stages:Object.fromEntries(CRM_STAGES.map(s=>[s,''])), state:'', changes:'', problems:'', nextStep:''}],
  meetings: [{month:'2026-09', date:'', keyResults:'', difficulties:'', decisions:'', nextFocus:'', nextMeeting:''}]
};

let state = loadState();
let ui = { page:'dashboard', collapsed: readPreference('supervision-menu-collapsed')==='true', mobileMenu:false, crmId:null, month: currentMonth(), planMonth: nextMonth(currentMonth()), taskDirection:'', taskProject:'', taskStatus:'', taskSearch:'', compareMonth: prevMonth(currentMonth()), analyticsRange:'6', modal:null, editTaskId:null, reportFrom:'2026-09', reportTo:currentMonth() };

function clone(v){ return JSON.parse(JSON.stringify(v)); }
function loadState(){
  try { const x = JSON.parse(localStorage.getItem(STORAGE_KEY)); return normalizeState(x?.version ? x : clone(seed)); }
  catch { return normalizeState(clone(seed)); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function currentMonth(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function prevMonth(m){ let [y,mo]=m.split('-').map(Number); mo--; if(mo===0){mo=12;y--;} return `${y}-${String(mo).padStart(2,'0')}`; }
function nextMonth(m){ let [y,mo]=m.split('-').map(Number); mo++; if(mo===13){mo=1;y++;} return `${y}-${String(mo).padStart(2,'0')}`; }
function monthLabel(m){ if(!m) return 'Без месяца'; const [y,mo]=m.split('-'); return new Intl.DateTimeFormat('ru-RU',{month:'long',year:'numeric'}).format(new Date(Number(y),Number(mo)-1,1)); }
function escapeHtml(s=''){ return String(s).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c])); }
function projectName(code){ const p=state.projects.find(x=>x.code===code); return p ? `${p.code} ${p.name}` : code; }
function getTask(id){ return state.tasks.find(t=>t.id===id); }
function getMonthRecord(taskId, month){ return state.taskMonths.find(r=>r.taskId===taskId && r.month===month); }
function actionableTask(t){ return t.type === 'Задача'; }
function resultBadge(v){
  const map={'Готово':'green','Частично':'amber','Не сделано':'red','Перенесено':'blue','Снято':'gray'};
  return v ? `<span class="badge ${map[v]||'gray'}">${escapeHtml(v)}</span>` : '<span class="badge gray">Без итога</span>';
}
function statusBadge(v){ const map={'В работе':'blue','Запланировано':'gray','Ожидание':'amber','К согласованию':'purple','Заблокировано':'red','Завершено':'green'}; return `<span class="badge ${map[v]||'gray'}">${escapeHtml(v||'—')}</span>`; }
function priorityBadge(v){ const map={'Высокий':'red','Средний':'amber','Низкий':'gray'}; return v?`<span class="badge ${map[v]||'gray'}">${escapeHtml(v)}</span>`:'—'; }
function options(items, selected, blank='—'){ return (blank!==null?`<option value="">${blank}</option>`:'')+items.map(x=>`<option value="${escapeHtml(x)}" ${x===selected?'selected':''}>${escapeHtml(x)}</option>`).join(''); }
function nextTaskId(projectCode){
  const base=state.tasks.filter(t=>t.projectCode===projectCode && !t.parentId).map(t=>t.id);
  let max=0; base.forEach(id=>{ const m=id.match(/-(\d+)$/); if(m) max=Math.max(max,Number(m[1])); });
  return `${projectCode}-${String(max+1).padStart(2,'0')}`;
}
function taskRecordsForMonth(month){ return state.taskMonths.filter(r=>r.month===month).map(r=>({r,t:getTask(r.taskId)})).filter(x=>x.t && actionableTask(x.t)); }
function countSummary(month){
  const list=taskRecordsForMonth(month);
  const out={total:list.length, done:0, partial:0, failed:0, carried:0, dropped:0, open:0};
  list.forEach(({r})=>{ const key={'Готово':'done','Частично':'partial','Не сделано':'failed','Перенесено':'carried','Снято':'dropped'}[r.monthResult]; if(key) out[key]++; else out.open++; });
  return out;
}
function directionSummary(month, direction){
  const list=taskRecordsForMonth(month).filter(x=>x.t.direction===direction); const done=list.filter(x=>x.r.monthResult==='Готово').length; return {total:list.length, done};
}
function crmTotal(snapshot){ if(!snapshot) return null; let vals=CRM_STAGES.map(s=>snapshot.stages?.[s]); if(vals.some(v=>v===''||v===null||v===undefined)) return null; return vals.reduce((a,b)=>a+Number(b||0),0); }
function ensureMeeting(month){ let x=state.meetings.find(c=>c.month===month); if(!x){ x={month,date:'',keyResults:'',difficulties:'',decisions:'',nextFocus:'',nextMeeting:''}; state.meetings.push(x); saveState(); } return x; }

const pageInfo = {
  settings:['Настройки и помощь','Проекты, шаблоны задач и короткая инструкция по работе.'],
  dashboard:['Обзор месяца','План, фактический результат и то, что нужно перенести дальше.'],
  planning:['Планирование месяца','Соберите новый месяц из переносов, повторяющейся работы и новых задач.'],
  tasks:['Задачи','Добавляйте задачи, назначайте месяц и сохраняйте историю по каждому месяцу.'],
  projects:['Проекты','Справочник проектов внутри трёх направлений работы.'],
  compare:['Сравнение месяцев','Сверка результатов и динамики от месяца к месяцу.'],
  analytics:['Аналитика','Тренды планирования, переносы, нагрузка по направлениям и динамика CRM.'],
  crm:['CRM ПСТБИ','Состояние базы по датам: 11 стадий, история срезов и изменения.'],
  meetings:['Супервизии','Итоги встреч, решения руководителя и фокус следующего месяца.'],
  reports:['Итоги месяца','Готовый отчёт для супервизии: результаты, переносы, CRM, решения и план следующего месяца.']
};

function render(){
  const [title, subtitle]=pageInfo[ui.page];
  document.querySelector('#app').innerHTML = `
    <div class="shell ${ui.collapsed?'is-collapsed':''} ${ui.mobileMenu?'menu-open':''}">
      <button class="menu-scrim" data-mobile-close aria-label="Закрыть меню"></button><aside class="sidebar" id="sidebar">
        <div class="brand"><div class="brand-mark">с<span>•</span></div><div class="brand-copy"><h1>Супервизия</h1><p>Личное рабочее пространство</p></div></div><button class="sidebar-toggle" data-toggle-menu aria-controls="sidebar" aria-expanded="${!ui.collapsed}" aria-label="${ui.collapsed?'Развернуть меню':'Свернуть меню'}">${icon('panel')}<span>Свернуть меню</span></button>
        <nav class="nav">
          ${navBtn('dashboard','Обзор')}${navBtn('planning','Планирование')}${navBtn('tasks','Задачи')}${navBtn('projects','Проекты')}${navBtn('compare','Сравнение')}${navBtn('analytics','Аналитика')}${navBtn('crm','CRM ПСТБИ')}${navBtn('meetings','Супервизии')}${navBtn('reports','Итоги месяца')}${navBtn('settings','Настройки')}
        </nav>
        <div class="sidebar-footer"><span class="local-dot"></span><span>Локальное хранение<br><small>Супервизия · 1.0</small></span></div>
      </aside>
      <main class="main">
        <div class="workspace-bar"><button class="btn mobile-menu-button" data-mobile-open aria-label="Открыть меню">${icon('panel')}</button><span>МОЁ ПРОСТРАНСТВО <i>/</i> ${title}</span><button class="link-btn" data-nav="settings">Помощь и настройки ↗</button></div><div class="topbar">
          <div><h1 class="page-title">${title}</h1><p class="page-subtitle">${subtitle}</p></div>
          <div class="toolbar">${pageToolbar()}</div>
        </div>
        ${renderPage()}
      </main>
      ${renderModal()}
    </div>`;
  bind();
}
function navBtn(page,label){ return `<button data-nav="${page}" title="${label}" aria-label="${label}" ${ui.page===page?'aria-current="page"':''} class="${ui.page===page?'active':''}">${icon(page)}<span class="nav-label">${label}</span></button>`; }
function pageToolbar(){
  if(['dashboard','tasks','crm','meetings','reports','analytics'].includes(ui.page)) return `<div class="month-picker"><button class="btn small" data-month-prev>←</button><input type="month" id="globalMonth" value="${ui.month}"><button class="btn small" data-month-next>→</button></div>${['dashboard','tasks'].includes(ui.page)?'<button class="btn primary" data-add-task>+ Задача</button><button class="btn" data-close-month>Закрыть месяц</button>':ui.page==='reports'?'<button class="btn primary" data-print>Печать / PDF</button>':''}`;
  if(ui.page==='planning') return `<div class="month-picker"><button class="btn small" data-plan-month-prev>←</button><input type="month" id="planMonth" value="${ui.planMonth}"><button class="btn small" data-plan-month-next>→</button></div><button class="btn primary" data-plan-new-task>+ Новая задача</button>`;
  if(ui.page==='projects') return '<button class="btn primary" data-add-project>+ Проект</button>';
  return '';
}
function renderPage(){ return ({settings:renderSettings,dashboard:renderDashboard,planning:renderPlanning,tasks:renderTasks,projects:renderProjects,compare:renderCompare,analytics:renderAnalytics,crm:renderCrm,meetings:renderMeetings,reports:renderReports})[ui.page](); }

function parseLocalDate(s){ if(!s) return null; const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d); }
function startOfToday(){ const n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); }
function daysFromToday(dateString){ const d=parseLocalDate(dateString); if(!d)return null; return Math.round((d-startOfToday())/86400000); }
function isClosedRecord(r){ return r.monthResult==='Готово'||r.monthResult==='Снято'||r.status==='Завершено'; }
function attentionScore(r){
  if(r.status==='Заблокировано') return 0;
  const days=daysFromToday(r.deadline);
  if(days!==null&&days<0&&!isClosedRecord(r)) return 1;
  if(r.priority==='Высокий') return 2;
  if(r.status==='К согласованию') return 3;
  if(r.status==='Ожидание') return 4;
  if(r.status==='В работе') return 5;
  return 9;
}
function renderDashboard(){
  const s=countSummary(ui.month);
  const records=taskRecordsForMonth(ui.month);
  const crm=crmForMonth(ui.month); const totalCrm=crmTotal(crm);
  const prev=crmForMonth(prevMonth(ui.month)); const prevTotal=crmTotal(prev); const delta=(totalCrm!==null&&prevTotal!==null)?totalCrm-prevTotal:null;
  const overdue=records.filter(({r})=>{const d=daysFromToday(r.deadline); return d!==null&&d<0&&!isClosedRecord(r);}).sort((a,b)=>a.r.deadline.localeCompare(b.r.deadline));
  const next7=records.filter(({r})=>{const d=daysFromToday(r.deadline); return d!==null&&d>=0&&d<=7&&!isClosedRecord(r);}).sort((a,b)=>a.r.deadline.localeCompare(b.r.deadline));
  const attention=records.filter(({r})=>!isClosedRecord(r)&&['В работе','Ожидание','К согласованию','Заблокировано'].includes(r.status)).sort((a,b)=>attentionScore(a.r)-attentionScore(b.r));
  const incoming=taskRecordsForMonth(prevMonth(ui.month)).filter(({r})=>r.monthResult==='Перенесено'&&(r.carryTo===ui.month||getMonthRecord(r.taskId,ui.month)));
  const open=records.filter(({r})=>!r.monthResult);
  const carried=records.filter(({r})=>r.monthResult==='Перенесено');
  const meeting=state.meetings.find(m=>m.month===ui.month);
  const filledStages=crm?CRM_STAGES.filter(stage=>crm.stages?.[stage]!==''&&crm.stages?.[stage]!==null&&crm.stages?.[stage]!==undefined).length:0;
  const activeProjects=new Set(records.filter(({r})=>!isClosedRecord(r)).map(({t})=>t.projectCode)).size;
  return `
    <div class="dashboard-hero card">
      <div><div class="eyebrow">${monthLabel(ui.month)}</div><h2>Всё важное. В одном месте.</h2><p>Ваш план, ближайшие решения и движение к результату.</p></div>
      <div class="hero-actions"><button class="btn primary" data-add-task>+ Добавить задачу</button><button class="btn" data-open-next-plan>Планировать следующий месяц</button></div>
    </div>
    <div class="grid kpi section compact-section">
      ${kpi('В плане',s.total,`${activeProjects} активных проектов`)}
      ${kpi('Готово',s.done,s.total?`${Math.round(s.done/s.total*100)}% плана`:'Нет задач')}
      ${kpi('Просрочено',overdue.length,overdue.length?'Требует внимания':'Просрочек нет',overdue.length?'danger':'')}
      ${kpi('CRM · последний срез',totalCrm===null?'—':totalCrm,totalCrm===null?`${filledStages} из ${CRM_STAGES.length} стадий заполнено`:(delta===null?'Нет полного среза прошлого месяца':`${delta>=0?'+':''}${delta} к прошлому месяцу`))}
    </div>
    ${renderDashboardCrm()}
    <div class="grid two section dashboard-priority-grid">
      <div class="card attention-card">
        <div class="section-head"><div><div class="eyebrow">Сейчас</div><h2>Требует внимания</h2></div><span class="badge ${attention.length?'purple':'green'}">${attention.length}</span></div>
        ${attention.length?dashboardTaskList(attention.slice(0,8),'attention'):'<div class="empty compact">Нет задач в работе, ожидании, согласовании или блокировке.</div>'}
      </div>
      <div class="card ${overdue.length?'danger-card':''}">
        <div class="section-head"><div><div class="eyebrow">Сроки</div><h2>Просрочено</h2></div><span class="badge ${overdue.length?'red':'green'}">${overdue.length}</span></div>
        ${overdue.length?dashboardTaskList(overdue.slice(0,8),'deadline'):'<div class="empty compact">По задачам с указанными сроками просрочек нет.</div>'}
        ${next7.length?`<div class="subsection-title">Ближайшие 7 дней</div>${dashboardTaskList(next7.slice(0,5),'deadline')}`:''}
      </div>
    </div>
    <div class="section">
      <div class="section-head"><h2>Прогресс по направлениям</h2><span class="muted">нажмите на направление, чтобы открыть задачи</span></div>
      <div class="direction-strip">${DIRECTIONS.map(d=>{const x=directionSummary(ui.month,d);const p=x.total?Math.round(x.done/x.total*100):0;return `<button class="direction-card direction-button" data-dashboard-direction="${d}"><div class="direction-top"><h3>${d}</h3><strong>${p}%</strong></div><div class="bar"><div style="width:${p}%"></div></div><div class="numbers"><span>${x.done} готово</span><span>${x.total} всего</span></div></button>`}).join('')}</div>
    </div>
    <div class="grid two section">
      <div class="card"><div class="section-head"><div><div class="eyebrow">Переход месяца</div><h2>Пришло из прошлого месяца</h2></div><span class="badge ${incoming.length?'amber':'gray'}">${incoming.length}</span></div>${incoming.length?dashboardTaskList(incoming.slice(0,7),'carry'):'<div class="empty compact">Нет задач, перенесённых из прошлого месяца.</div>'}</div>
      <div class="card"><div class="section-head"><div><div class="eyebrow">Закрытие месяца</div><h2>Нужно подвести итог</h2></div><span class="badge ${open.length?'amber':'green'}">${open.length}</span></div>${open.length?dashboardTaskList(open.slice(0,7),'status'):'<div class="empty compact">У всех задач указан итог месяца.</div>'}</div>
    </div>
    <div class="section">
      <div class="card">
        <div class="section-head"><div><div class="eyebrow">Дальше</div><h2>Фокус следующего месяца</h2></div><button class="link-btn" data-nav="meetings">Супервизия</button></div>
        ${meeting?.nextFocus?`<div class="next-focus">${escapeHtml(meeting.nextFocus)}</div>`:'<div class="empty compact">Фокус ещё не зафиксирован. Его можно указать в разделе «Супервизии».</div>'}
        ${carried.length?`<div class="subsection-title">Уже отмечено к переносу: ${carried.length}</div>${dashboardTaskList(carried.slice(0,4),'carry')}`:''}
      </div>
    </div>`;
}
function kpi(label,value,hint,tone=''){ return `<div class="card kpi-card ${tone?`kpi-${tone}`:''}"><div class="label">${label}</div><div class="value">${value}</div><div class="hint">${hint}</div></div>`; }
function miniTaskList(items){ return `<div class="stat-list">${items.map(({t,r})=>`<div class="stat-row"><span><b>${escapeHtml(t.id)}</b> ${escapeHtml(t.title)}</span><span>${r.monthResult?resultBadge(r.monthResult):statusBadge(r.status)}</span></div>`).join('')}</div>`; }
function dashboardTaskList(items,mode='status'){
  return `<div class="dashboard-task-list">${items.map(({t,r})=>{
    let meta='';
    if(mode==='deadline'&&r.deadline){const days=daysFromToday(r.deadline);meta=`<span class="task-date ${days<0?'late':''}">${formatDate(r.deadline)}${days<0?` · ${Math.abs(days)} дн. проср.`:days===0?' · сегодня':days===1?' · завтра':` · через ${days} дн.`}</span>`;}
    else if(mode==='carry') meta=`<span class="muted">${escapeHtml(projectName(t.projectCode))}</span>`;
    else meta=r.monthResult?resultBadge(r.monthResult):statusBadge(r.status);
    return `<button class="dashboard-task" data-dashboard-task="${escapeHtml(t.id)}"><span class="task-main"><span class="task-id">${escapeHtml(t.id)}</span><span class="task-title">${escapeHtml(t.title)}</span></span><span class="task-meta">${meta}</span></button>`;
  }).join('')}</div>`;
}


function isRecurringTask(t){
  const project=state.projects.find(p=>p.code===t.projectCode);
  return !!t.recurring || project?.type==='Постоянная работа';
}
function planningOrigin(t, month){
  const prev=getMonthRecord(t.id,prevMonth(month));
  if(prev?.monthResult==='Перенесено' && (prev.carryTo===month || getMonthRecord(t.id,month))) return 'Перенос';
  if(isRecurringTask(t)) return 'Постоянная';
  return 'Новая';
}
function planningOriginBadge(origin){
  const map={'Перенос':'amber','Постоянная':'blue','Новая':'green'};
  return `<span class="badge ${map[origin]||'gray'}">${origin}</span>`;
}
function renderPlanning(){
  const target=ui.planMonth;
  const previous=prevMonth(target);
  const planned=taskRecordsForMonth(target).sort((a,b)=>{
    const pa={'Высокий':0,'Средний':1,'Низкий':2,'':3}[a.r.priority]??3;
    const pb={'Высокий':0,'Средний':1,'Низкий':2,'':3}[b.r.priority]??3;
    return pa-pb || (a.r.deadline||'9999').localeCompare(b.r.deadline||'9999') || a.t.direction.localeCompare(b.t.direction,'ru');
  });
  const carried=planned.filter(({t})=>planningOrigin(t,target)==='Перенос');
  const recurringInPlan=planned.filter(({t})=>planningOrigin(t,target)==='Постоянная');
  const high=planned.filter(({r})=>r.priority==='Высокий').length;
  const noDeadline=planned.filter(({r})=>!r.deadline).length;
  const previousMeeting=state.meetings.find(m=>m.month===previous);
  const unfinishedPrev=taskRecordsForMonth(previous).filter(({t,r})=>!getMonthRecord(t.id,target) && !isClosedRecord(r) && r.monthResult!=='Снято');
  const unfinishedIds=new Set(unfinishedPrev.map(({t})=>t.id));
  const recurringCandidates=state.tasks.filter(t=>actionableTask(t)&&isRecurringTask(t)&&!getMonthRecord(t.id,target)&&!unfinishedIds.has(t.id));
  const recurringIds=new Set(recurringCandidates.map(t=>t.id));
  const backlog=state.tasks.filter(t=>actionableTask(t)&&!getMonthRecord(t.id,target)&&!unfinishedIds.has(t.id)&&!recurringIds.has(t.id));
  const maxDirection=Math.max(1,...DIRECTIONS.map(d=>planned.filter(({t})=>t.direction===d).length));
  return `
    <div class="planning-hero card">
      <div>
        <div class="eyebrow">План на ${monthLabel(target)}</div>
        <h2>Соберите месяц до его начала</h2>
        <p>Сначала проверьте переносы и постоянную работу, затем добавьте новые задачи. Изменения здесь сразу становятся планом выбранного месяца.</p>
      </div>
      <div class="hero-actions">
        <button class="btn primary" data-plan-new-task>+ Новая задача</button>
        <button class="btn" data-open-plan-dashboard>Открыть месяц →</button>
      </div>
    </div>

    ${previousMeeting?.nextFocus?`<div class="planning-focus"><div><span class="eyebrow">Фокус из супервизии за ${monthLabel(previous)}</span><p>${escapeHtml(previousMeeting.nextFocus)}</p></div><button class="btn small" data-edit-prev-focus="${previous}">Изменить</button></div>`:''}

    <div class="grid kpi section compact-section">
      ${kpi('В плане',planned.length,`${carried.length} переносов · ${recurringInPlan.length} постоянных`)}
      ${kpi('Высокий приоритет',high,high?'Проверьте, не слишком ли много':'Высоких приоритетов нет')}
      ${kpi('Без срока',noDeadline,noDeadline?'Можно уточнить в таблице':'У всех задач есть срок')}
      ${kpi('Новых задач',Math.max(0,planned.length-carried.length-recurringInPlan.length),'Добавлены специально на этот месяц')}
    </div>

    <div class="section">
      <div class="section-head"><div><h2>Нагрузка по направлениям</h2><span class="muted">Количество задач — это ориентир, а не оценка трудоёмкости.</span></div></div>
      <div class="planning-load-grid">
        ${DIRECTIONS.map(d=>{
          const rows=planned.filter(({t})=>t.direction===d);
          const h=rows.filter(({r})=>r.priority==='Высокий').length;
          const width=Math.round(rows.length/maxDirection*100);
          return `<div class="planning-load-card"><div class="planning-load-top"><b>${d}</b><strong>${rows.length}</strong></div><div class="load-bar"><div style="width:${width}%"></div></div><div class="muted">${h?`${h} высокого приоритета`:'без высоких приоритетов'}</div></div>`;
        }).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><div><h2>План месяца</h2><span class="muted">Приоритет и срок можно менять прямо здесь.</span></div><span class="badge gray">${planned.length}</span></div>
      ${planned.length?`<div class="table-wrap"><table class="planning-table"><thead><tr><th>Источник</th><th>Направление / проект</th><th>Задача</th><th>Приоритет</th><th>Срок</th><th>Статус</th><th></th></tr></thead><tbody>
        ${planned.map(({t,r})=>`<tr>
          <td>${planningOriginBadge(planningOrigin(t,target))}</td>
          <td><b>${escapeHtml(t.direction)}</b><div class="muted">${escapeHtml(projectName(t.projectCode))}</div></td>
          <td><div class="row-title">${escapeHtml(t.title)}</div>${r.planned&&r.planned!==t.title?`<div class="muted">${escapeHtml(r.planned)}</div>`:''}</td>
          <td><select class="inline-select" data-plan-priority="${escapeHtml(t.id)}">${options(PRIORITIES.filter(Boolean),r.priority||'','—')}</select></td>
          <td><input class="inline-date" type="date" data-plan-deadline="${escapeHtml(t.id)}" value="${r.deadline||''}"></td>
          <td>${statusBadge(r.status)}</td>
          <td><div class="actions"><button class="btn small" data-plan-open-task="${escapeHtml(t.id)}">Открыть</button><button class="btn small danger" data-plan-remove="${escapeHtml(t.id)}">Убрать</button></div></td>
        </tr>`).join('')}
      </tbody></table></div>`:'<div class="empty-plan card"><b>План пока пуст</b><p>Добавьте переносы, постоянные задачи или создайте новую задачу.</p><button class="btn primary" data-plan-new-task>+ Новая задача</button></div>'}
    </div>

    <div class="grid two section planning-sources">
      <div class="card source-card">
        <div class="section-head"><div><div class="eyebrow">Повторяется</div><h2>Постоянная работа</h2></div>${recurringCandidates.length?`<button class="btn small" data-add-all-recurring>Добавить все (${recurringCandidates.length})</button>`:''}</div>
        <p class="source-note">Задачи, отмеченные как повторяющиеся, и задачи из проектов типа «Постоянная работа».</p>
        ${recurringCandidates.length?planningCandidateList(recurringCandidates.map(t=>({t,r:getMonthRecord(t.id,previous)})),'recurring'):'<div class="empty compact">Все постоянные задачи уже включены в план.</div>'}
      </div>
      <div class="card source-card">
        <div class="section-head"><div><div class="eyebrow">${monthLabel(previous)}</div><h2>Незавершённое</h2></div><span class="badge ${unfinishedPrev.length?'amber':'green'}">${unfinishedPrev.length}</span></div>
        <p class="source-note">Задачи прошлого месяца без завершённого результата. При добавлении они будут отмечены как перенос.</p>
        ${unfinishedPrev.length?planningCandidateList(unfinishedPrev,'carry'):'<div class="empty compact">Незавершённых задач прошлого месяца нет.</div>'}
      </div>
    </div>

    <div class="section card source-card">
      <div class="section-head"><div><div class="eyebrow">Резерв</div><h2>Бэклог</h2></div><span class="badge gray">${backlog.length}</span></div>
      <p class="source-note">Существующие задачи, которые ещё не включены в ${monthLabel(target)}. Добавляйте только то, что действительно планируете сделать.</p>
      ${backlog.length?planningCandidateList(backlog.slice(0,18).map(t=>({t,r:null})),'backlog'):'<div class="empty compact">Свободных задач в бэклоге нет.</div>'}
      ${backlog.length>18?`<div class="muted planning-more">Показаны первые 18 из ${backlog.length}. Остальные доступны в разделе «Задачи».</div>`:''}
    </div>`;
}
function planningCandidateList(items,mode){
  return `<div class="planning-candidate-list">${items.map(({t,r})=>`
    <div class="planning-candidate">
      <div class="candidate-copy">
        <span class="task-id">${escapeHtml(t.id)}</span>
        <b>${escapeHtml(t.title)}</b>
        <small>${escapeHtml(t.direction)} · ${escapeHtml(projectName(t.projectCode))}${r?.monthResult?` · ${escapeHtml(r.monthResult)}`:''}</small>
      </div>
      <button class="btn small" ${mode==='carry'?`data-plan-carry="${escapeHtml(t.id)}"`:`data-plan-add="${escapeHtml(t.id)}"`}>${mode==='carry'?'→ Перенести':'+ В план'}</button>
    </div>`).join('')}</div>`;
}

function renderTasks(){
  const projectOptions = state.projects.filter(p=>!ui.taskDirection||p.direction===ui.taskDirection);
  let rows = state.tasks.map(t=>({t,r:getMonthRecord(t.id,ui.month)})).filter(x=>x.r);
  if(ui.taskDirection) rows=rows.filter(x=>x.t.direction===ui.taskDirection);
  if(ui.taskProject) rows=rows.filter(x=>x.t.projectCode===ui.taskProject);
  if(ui.taskStatus) rows=rows.filter(x=>x.r.status===ui.taskStatus || x.r.monthResult===ui.taskStatus);
  if(ui.taskSearch){ const q=ui.taskSearch.toLowerCase(); rows=rows.filter(x=>(x.t.id+' '+x.t.title+' '+projectName(x.t.projectCode)).toLowerCase().includes(q)); }
  rows.sort((a,b)=>a.t.direction.localeCompare(b.t.direction,'ru')||a.t.id.localeCompare(b.t.id,'ru'));
  return `
    <div class="filters">
      <select id="filterDirection">${options(DIRECTIONS,ui.taskDirection,'Все направления')}</select>
      <select id="filterProject"><option value="">Все проекты</option>${projectOptions.map(p=>`<option value="${p.code}" ${p.code===ui.taskProject?'selected':''}>${escapeHtml(p.code+' '+p.name)}</option>`).join('')}</select>
      <input id="filterSearch" placeholder="Поиск по задаче…" value="${escapeHtml(ui.taskSearch)}">
      <select id="filterStatus">${options([...WORK_STATUSES,...MONTH_RESULTS.filter(Boolean)],ui.taskStatus,'Все статусы')}</select>
    </div>
    <div class="table-wrap"><table><thead><tr><th>ID</th><th>Направление / проект</th><th>Задача</th><th>Срок</th><th>Статус</th><th>Итог месяца</th><th></th></tr></thead><tbody>
      ${rows.length?rows.map(({t,r})=>`<tr><td><b>${escapeHtml(t.id)}</b>${t.parentId?`<div class="muted">↳ ${escapeHtml(t.parentId)}</div>`:''}</td><td><b>${escapeHtml(t.direction)}</b><div class="muted">${escapeHtml(projectName(t.projectCode))}</div></td><td><div class="row-title">${escapeHtml(t.title)}</div>${r.nextStep?`<div class="muted">Дальше: ${escapeHtml(r.nextStep)}</div>`:''}</td><td>${r.deadline?formatDate(r.deadline):'—'}<div>${priorityBadge(r.priority)}</div></td><td>${statusBadge(r.status)}</td><td>${resultBadge(r.monthResult)}${r.carryTo?`<div class="muted">→ ${monthLabel(r.carryTo)}</div>`:''}</td><td><div class="actions"><button class="btn small" data-edit-task="${t.id}">Открыть</button><button class="btn small" data-copy-task="${t.id}">→ месяц</button></div></td></tr>`).join(''):`<tr><td colspan="7"><div class="empty">В ${monthLabel(ui.month)} пока нет задач. Добавьте новую или включите задачу из списка ниже.</div></td></tr>`}
    </tbody></table></div>
    ${renderBacklog()}`;
}
function renderBacklog(){
  let items=state.tasks.filter(t=>!getMonthRecord(t.id,ui.month));
  if(ui.taskDirection)items=items.filter(t=>t.direction===ui.taskDirection);
  if(ui.taskProject)items=items.filter(t=>t.projectCode===ui.taskProject);
  if(ui.taskSearch){const q=ui.taskSearch.toLowerCase();items=items.filter(t=>(t.id+' '+t.title+' '+projectName(t.projectCode)).toLowerCase().includes(q));}
  if(!items.length)return '';
  return `<div class="section"><div class="section-head"><h2>Не в плане ${monthLabel(ui.month)}</h2><span class="muted">${items.length} записей</span></div><div class="table-wrap"><table><thead><tr><th>ID</th><th>Направление / проект</th><th>Задача</th><th>Тип</th><th></th></tr></thead><tbody>${items.map(t=>`<tr><td><b>${escapeHtml(t.id)}</b></td><td><b>${escapeHtml(t.direction)}</b><div class="muted">${escapeHtml(projectName(t.projectCode))}</div></td><td>${escapeHtml(t.title)}</td><td>${escapeHtml(t.type)}</td><td><button class="btn small" data-plan-task="${t.id}">+ В план месяца</button></td></tr>`).join('')}</tbody></table></div></div>`;
}

function renderProjects(){
  const projects=[...state.projects].sort((a,b)=>a.code.localeCompare(b.code,'ru',{numeric:true}));
  return `<div class="notice">Проект — постоянная «папка» для задач. Месяц назначается не проекту, а конкретной задаче.</div><div class="project-tree section">${projects.map(p=>`<div class="project-item"><div class="project-code">${escapeHtml(p.code)}</div><div><b>${escapeHtml(p.name)}</b><div class="muted">${escapeHtml(p.direction)}</div></div><div>${statusBadge(p.type)}</div><div class="actions"><button class="btn small" data-edit-project="${escapeHtml(p.code)}">Изменить</button><button class="btn small" data-project-task="${p.code}">+ задача</button><button class="btn small danger" data-delete-project="${p.code}">Удалить</button></div></div>`).join('')}</div>`;
}

function renderCompare(){
  const a=countSummary(ui.compareMonth), b=countSummary(ui.month);
  return `
    <div class="toolbar no-print" style="margin-bottom:16px"><div class="field"><label>Предыдущий месяц</label><input type="month" id="compareMonth" value="${ui.compareMonth}"></div><div class="field"><label>Текущий месяц</label><input type="month" id="compareCurrent" value="${ui.month}"></div></div>
    <div class="compare-grid">
      ${compareCard(ui.compareMonth,a)}<div class="compare-mid">→</div>${compareCard(ui.month,b)}
    </div>
    <div class="section"><div class="section-head"><h2>Изменение по направлениям</h2></div><div class="table-wrap"><table><thead><tr><th>Направление</th><th>${monthLabel(ui.compareMonth)}</th><th>${monthLabel(ui.month)}</th><th>Изменение плана</th><th>Готово сейчас</th></tr></thead><tbody>${DIRECTIONS.map(d=>{const x=directionSummary(ui.compareMonth,d), y=directionSummary(ui.month,d); return `<tr><td><b>${d}</b></td><td>${x.total}</td><td>${y.total}</td><td>${y.total-x.total>=0?'+':''}${y.total-x.total}</td><td>${y.done} / ${y.total}</td></tr>`}).join('')}</tbody></table></div></div>
    <div class="section"><div class="section-head"><h2>Перенесённые задачи</h2></div>${renderCarryComparison()}</div>`;
}
function compareCard(month,s){ return `<div class="compare-card"><h3>${monthLabel(month)}</h3><div class="big">${s.total} задач</div><div class="stat-list"><div class="stat-row"><span>Готово</span><b>${s.done}</b></div><div class="stat-row"><span>Частично</span><b>${s.partial}</b></div><div class="stat-row"><span>Не сделано</span><b>${s.failed}</b></div><div class="stat-row"><span>Перенесено</span><b>${s.carried}</b></div><div class="stat-row"><span>Без итога</span><b>${s.open}</b></div></div></div>`; }
function renderCarryComparison(){
  const rows=taskRecordsForMonth(ui.compareMonth).filter(x=>x.r.monthResult==='Перенесено' || x.r.carryTo===ui.month);
  if(!rows.length) return '<div class="empty card">Нет зафиксированных переносов между выбранными месяцами.</div>';
  return `<div class="table-wrap"><table><thead><tr><th>ID</th><th>Задача</th><th>Было</th><th>Стало</th></tr></thead><tbody>${rows.map(({t,r})=>{const nr=getMonthRecord(t.id,ui.month); return `<tr><td><b>${t.id}</b></td><td>${escapeHtml(t.title)}</td><td>${resultBadge(r.monthResult)}</td><td>${nr?statusBadge(nr.status):'<span class="badge red">Не добавлена</span>'}</td></tr>`}).join('')}</tbody></table></div>`;
}

function renderCrm(){
  const c=selectedCrm(); const total=crmTotal(c); const prev=crmForMonth(prevMonth(ui.month)); const prevT=crmTotal(prev); const delta=(total!==null&&prevT!==null)?total-prevT:null;
  return `${snapshotToolbar(c)}<div class="grid two"><div class="card"><div class="label muted">Всего сделок</div><div class="crm-total">${total===null?'—':total}</div><div class="muted">${delta===null?'Для сравнения нужны два полностью заполненных месяца':`${delta>=0?'+':''}${delta} к ${monthLabel(prevMonth(ui.month))}`}</div></div><div class="card"><div class="field"><label>Дата фактического среза</label><input type="date" id="crmSnapshotDate" value="${c.snapshotDate||''}"></div></div></div>
    <div class="section"><div class="section-head"><h2>Сделки по стадиям</h2><span class="muted">пусто = нет данных; 0 = проверено, сделок нет</span></div><div class="crm-stage-grid">${CRM_STAGES.map(s=>`<div class="crm-stage"><div class="name">${escapeHtml(s)}</div><input type="number" min="0" step="1" data-crm-stage="${escapeHtml(s)}" aria-label="${escapeHtml(s)}" value="${escapeHtml(c.stages[s]??'')}"></div>`).join('')}</div></div>
    <div class="grid two section"><div class="card"><div class="field"><label>Состояние базы</label><textarea id="crmState">${escapeHtml(c.state)}</textarea></div><div class="field"><label>Что сделано / изменилось</label><textarea id="crmChanges">${escapeHtml(c.changes)}</textarea></div></div><div class="card"><div class="field"><label>Проблемы / нужна помощь</label><textarea id="crmProblems">${escapeHtml(c.problems)}</textarea></div><div class="field"><label>Следующий шаг</label><textarea id="crmNextStep">${escapeHtml(c.nextStep)}</textarea></div></div></div>
    <div class="section"><div class="section-head"><h2>История CRM</h2></div>${crmHistory()}</div>`;
}
function renderMeetings(){
  const m=ensureMeeting(ui.month);
  return `<div class="grid two"><div class="card"><div class="field"><label>Дата супервизии</label><input type="date" id="meetingDate" value="${m.date||''}"></div><div class="field"><label>Главные результаты месяца</label><textarea id="meetingKeyResults">${escapeHtml(m.keyResults)}</textarea></div><div class="field"><label>Трудности / вопросы руководству</label><textarea id="meetingDifficulties">${escapeHtml(m.difficulties)}</textarea></div></div><div class="card"><div class="field"><label>Решения и изменения планов</label><textarea id="meetingDecisions">${escapeHtml(m.decisions)}</textarea></div><div class="field"><label>Фокус следующего месяца</label><textarea id="meetingNextFocus">${escapeHtml(m.nextFocus)}</textarea></div><div class="field"><label>Следующая встреча</label><input type="date" id="meetingNextMeeting" value="${m.nextMeeting||''}"></div></div></div><div class="section"><div class="section-head"><h2>Журнал встреч</h2></div>${meetingHistory()}</div>`;
}
function meetingHistory(){ const rows=[...state.meetings].sort((a,b)=>b.month.localeCompare(a.month)); return `<div class="table-wrap"><table><thead><tr><th>Месяц</th><th>Дата</th><th>Главные результаты</th><th>Фокус дальше</th></tr></thead><tbody>${rows.map(m=>`<tr><td><b>${monthLabel(m.month)}</b></td><td>${m.date?formatDate(m.date):'—'}</td><td>${escapeHtml(m.keyResults||'—')}</td><td>${escapeHtml(m.nextFocus||'—')}</td></tr>`).join('')}</tbody></table></div>`; }

function reportDirectionStats(month,direction){
  const rows=taskRecordsForMonth(month).filter(x=>x.t.direction===direction);
  return {rows,total:rows.length,done:rows.filter(x=>x.r.monthResult==='Готово').length,partial:rows.filter(x=>x.r.monthResult==='Частично').length,carried:rows.filter(x=>x.r.monthResult==='Перенесено').length,failed:rows.filter(x=>x.r.monthResult==='Не сделано').length,open:rows.filter(x=>!x.r.monthResult).length};
}
function safeText(v,fallback='—'){ return v?escapeHtml(v).replace(/\n/g,'<br>'):fallback; }
function reportTaskTable(rows){
  if(!rows.length) return '<div class="report-empty">Нет задач в плане этого месяца.</div>';
  return `<div class="report-task-table"><table><thead><tr><th>Задача</th><th>Итог</th><th>Фактический результат</th><th>Дальше</th></tr></thead><tbody>${rows.map(({t,r})=>`<tr><td><b>${escapeHtml(t.id)}</b><br>${escapeHtml(t.title)}</td><td>${resultBadge(r.monthResult)}</td><td>${safeText(r.actual,r.monthResult==='Готово'?'Выполнено':escapeHtml(r.planned||'—'))}</td><td>${safeText(r.nextStep,r.carryTo?`Перенесено на ${monthLabel(r.carryTo)}`:'—')}</td></tr>`).join('')}</tbody></table></div>`;
}
function reportCrmStageRows(current,previous){
  return CRM_STAGES.map(stage=>{
    const cv=current?.stages?.[stage]; const pv=previous?.stages?.[stage];
    const c=cv===''||cv===undefined||cv===null?null:Number(cv); const p=pv===''||pv===undefined||pv===null?null:Number(pv);
    const d=c!==null&&p!==null?c-p:null;
    return `<tr><td>${escapeHtml(stage)}</td><td>${p===null?'—':p}</td><td>${c===null?'—':c}</td><td class="${d>0?'delta-up':d<0?'delta-down':''}">${d===null?'—':`${d>0?'+':''}${d}`}</td></tr>`;
  }).join('');
}
function renderMonthlyReport(month){
  const summary=countSummary(month); const meeting=state.meetings.find(m=>m.month===month); const crm=crmForMonth(month); const prevCrm=crmForMonth(prevMonth(month));
  const total=crmTotal(crm), prevTotal=crmTotal(prevCrm); const crmDelta=total!==null&&prevTotal!==null?total-prevTotal:null;
  const completion=summary.total?Math.round(summary.done/summary.total*100):0; const next=nextMonth(month); const nextRows=taskRecordsForMonth(next);
  const blockers=taskRecordsForMonth(month).filter(({r})=>r.blocker).slice(0,8);
  return `<article class="monthly-report" id="monthlyReport">
    <header class="report-cover">
      <div><div class="report-kicker">Ежемесячная рабочая супервизия</div><h1>${monthLabel(month)}</h1><p>ПСТБИ · Школы · Олимпиады</p></div>
      <div class="report-cover-meta"><span>Сформировано ${new Intl.DateTimeFormat('ru-RU').format(new Date())}</span>${meeting?.date?`<span>Супервизия: ${formatDate(meeting.date)}</span>`:''}</div>
    </header>
    <section class="report-metrics">
      <div><span>Задач в плане</span><strong>${summary.total}</strong></div>
      <div><span>Выполнено</span><strong>${summary.done}</strong><small>${completion}% плана</small></div>
      <div><span>Перенесено</span><strong>${summary.carried}</strong></div>
      <div><span>CRM</span><strong>${total===null?'—':total}</strong><small>${crmDelta===null?'нет сравнения':`${crmDelta>=0?'+':''}${crmDelta} к прошлому месяцу`}</small></div>
    </section>
    <section class="report-section report-summary-section"><div class="report-section-number">01</div><div><h2>Главные результаты месяца</h2>${meeting?.keyResults?`<div class="report-lead">${safeText(meeting.keyResults)}</div>`:`<div class="report-note">Поле «Главные результаты месяца» пока не заполнено в разделе «Супервизии». Ниже отчёт собран автоматически из задач.</div>`}</div></section>
    <section class="report-section"><div class="report-section-number">02</div><div class="report-section-body"><h2>Результаты по направлениям</h2>${DIRECTIONS.map(direction=>{
      const ds=reportDirectionStats(month,direction); const pct=ds.total?Math.round(ds.done/ds.total*100):0;
      return `<div class="report-direction"><div class="report-direction-head"><div><h3>${direction}</h3><p>${ds.done} готово · ${ds.partial} частично · ${ds.carried} перенесено${ds.open?` · ${ds.open} без итога`:''}</p></div><div class="report-percent">${pct}%</div></div>${reportTaskTable(ds.rows)}</div>`;
    }).join('')}</div></section>
    <section class="report-section"><div class="report-section-number">03</div><div class="report-section-body"><h2>CRM ПСТБИ</h2>
      <div class="report-crm-top"><div><span>Всего сделок</span><strong>${total===null?'—':total}</strong></div><div><span>Изменение</span><strong>${crmDelta===null?'—':`${crmDelta>=0?'+':''}${crmDelta}`}</strong></div><div><span>Дата среза</span><strong class="report-date-value">${crm?.snapshotDate?formatDate(crm.snapshotDate):'—'}</strong></div></div>
      ${crm?`<div class="report-crm-grid"><div><h4>Состояние базы</h4><p>${safeText(crm.state)}</p></div><div><h4>Что изменилось</h4><p>${safeText(crm.changes)}</p></div><div><h4>Проблемы</h4><p>${safeText(crm.problems)}</p></div><div><h4>Следующий шаг</h4><p>${safeText(crm.nextStep)}</p></div></div><div class="report-task-table crm-comparison"><table><thead><tr><th>Стадия</th><th>${monthLabel(prevMonth(month))}</th><th>${monthLabel(month)}</th><th>Δ</th></tr></thead><tbody>${reportCrmStageRows(crm,prevCrm)}</tbody></table></div>`:'<div class="report-note">Срез CRM за этот месяц ещё не заполнен.</div>'}
    </div></section>
    <section class="report-section"><div class="report-section-number">04</div><div class="report-section-body"><h2>Трудности, вопросы и решения</h2>
      <div class="report-two-col"><div><h4>Трудности / вопросы руководству</h4><div class="report-text-box">${safeText(meeting?.difficulties,blockers.length?blockers.map(({t,r})=>`<b>${escapeHtml(t.id)}</b> — ${escapeHtml(r.blocker)}`).join('<br>'):'Не зафиксированы.')}</div></div><div><h4>Решения и изменения планов</h4><div class="report-text-box">${safeText(meeting?.decisions,'Пока не зафиксированы.')}</div></div></div>
    </div></section>
    <section class="report-section report-next"><div class="report-section-number">05</div><div class="report-section-body"><h2>Следующий месяц — ${monthLabel(next)}</h2><div class="report-focus"><span>Фокус</span><p>${safeText(meeting?.nextFocus,'Фокус следующего месяца пока не сформулирован.')}</p></div>
      ${nextRows.length?`<div class="report-next-list">${DIRECTIONS.map(d=>{const rows=nextRows.filter(x=>x.t.direction===d);if(!rows.length)return'';return `<div><h4>${d}</h4><ul>${rows.map(({t,r})=>`<li><b>${escapeHtml(t.title)}</b>${r.deadline?` <span>до ${formatDate(r.deadline)}</span>`:''}${r.priority?` · ${escapeHtml(r.priority)} приоритет`:''}</li>`).join('')}</ul></div>`}).join('')}</div>`:'<div class="report-note">План следующего месяца ещё пуст.</div>'}
      ${meeting?.nextMeeting?`<div class="report-next-meeting">Следующая супервизия: <b>${formatDate(meeting.nextMeeting)}</b></div>`:''}
    </div></section>
  </article>`;
}
function monthsBetween(start,end){
  if(!start||!end||start>end) return [];
  const out=[]; let m=start; let guard=0;
  while(m<=end && guard<240){ out.push(m); m=nextMonth(m); guard++; }
  return out;
}
function analyticsMonthList(){
  if(ui.analyticsRange==='all'){
    const candidates=[...state.taskMonths.map(r=>r.month),...state.crm.map(c=>c.month)].filter(m=>m&&m<=ui.month).sort();
    const start=candidates[0]||ui.month;
    return monthsBetween(start,ui.month);
  }
  const count=Math.max(1,Number(ui.analyticsRange)||6); let start=ui.month;
  for(let i=1;i<count;i++) start=prevMonth(start);
  return monthsBetween(start,ui.month);
}
function pct(n,d){ return d?Math.round(n/d*100):0; }
function analyticsRecordSet(months){ const set=new Set(months); return state.taskMonths.filter(r=>set.has(r.month)).map(r=>({r,t:getTask(r.taskId)})).filter(x=>x.t&&actionableTask(x.t)); }
function renderAnalytics(){
  const months=analyticsMonthList();
  const records=analyticsRecordSet(months);
  const total=records.length;
  const done=records.filter(({r})=>r.monthResult==='Готово').length;
  const carried=records.filter(({r})=>r.monthResult==='Перенесено').length;
  const open=records.filter(({r})=>!r.monthResult).length;
  const completion=pct(done,total), carryRate=pct(carried,total), openRate=pct(open,total);
  const latest=taskRecordsForMonth(ui.month);
  const noDeadline=latest.filter(({r})=>!r.deadline&&!isClosedRecord(r)).length;
  const high=latest.filter(({r})=>r.priority==='Высокий'&&!isClosedRecord(r)).length;

  const carryByTask=new Map();
  records.forEach(({t,r})=>{ if(r.monthResult==='Перенесено') carryByTask.set(t.id,(carryByTask.get(t.id)||0)+1); });
  const repeated=[...carryByTask.entries()].filter(([,n])=>n>=2).map(([id,n])=>({t:getTask(id),n,last:state.taskMonths.filter(r=>r.taskId===id&&r.month<=ui.month).sort((a,b)=>b.month.localeCompare(a.month))[0]})).filter(x=>x.t).sort((a,b)=>b.n-a.n||a.t.id.localeCompare(b.t.id,'ru'));

  const directionStats=DIRECTIONS.map(direction=>{
    const rows=records.filter(({t})=>t.direction===direction); const d=rows.filter(({r})=>r.monthResult==='Готово').length; const c=rows.filter(({r})=>r.monthResult==='Перенесено').length;
    return {direction,total:rows.length,done:d,carried:c,share:pct(rows.length,total),completion:pct(d,rows.length)};
  });
  const maxDirection=Math.max(1,...directionStats.map(x=>x.total));

  const projectMap=new Map();
  records.forEach(({t,r})=>{
    if(!projectMap.has(t.projectCode)) projectMap.set(t.projectCode,{code:t.projectCode,direction:t.direction,total:0,done:0,carried:0,open:0});
    const x=projectMap.get(t.projectCode); x.total++; if(r.monthResult==='Готово')x.done++; if(r.monthResult==='Перенесено')x.carried++; if(!r.monthResult)x.open++;
  });
  const projectStats=[...projectMap.values()].sort((a,b)=>b.carried-a.carried||b.open-a.open||b.total-a.total).slice(0,12);

  const monthStats=months.map(month=>{const x=countSummary(month); return {month,...x,completion:pct(x.done,x.total),carryRate:pct(x.carried,x.total)};});
  const maxMonthTotal=Math.max(1,...monthStats.map(x=>x.total));

  const crmSeries=months.map(month=>{const c=crmForMonth(month); return {month,c,total:crmTotal(c)};});
  const completeCrm=crmSeries.filter(x=>x.total!==null);
  const crmLatest=completeCrm.at(-1)||null, crmPrev=completeCrm.at(-2)||null;
  const crmDelta=crmLatest&&crmPrev?crmLatest.total-crmPrev.total:null;
  const maxCrm=Math.max(1,...completeCrm.map(x=>x.total||0));
  const stageChanges=(crmLatest&&crmPrev)?CRM_STAGES.map(stage=>({stage,current:Number(crmLatest.c.stages?.[stage]||0),previous:Number(crmPrev.c.stages?.[stage]||0)})).map(x=>({...x,delta:x.current-x.previous})).filter(x=>x.delta!==0).sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta)).slice(0,6):[];

  const suggestions=[];
  if(total===0) suggestions.push({title:'Накопите историю',text:'Для аналитики пока недостаточно месячных записей. После двух–трёх закрытых месяцев здесь появятся устойчивые тренды.'});
  if(total>0&&carryRate>=25) suggestions.push({title:'Проверить объём плана',text:`За выбранный период перенесено ${carried} из ${total} месячных задач (${carryRate}%). Перед началом следующего месяца стоит отдельно проверить объём и сроки переносимых задач.`});
  if(repeated.length) suggestions.push({title:'Разобрать повторные переносы',text:`${repeated.length} ${plural(repeated.length,'задача переносилась','задачи переносились','задач переносились')} как минимум дважды. Для них полезно уточнить следующий физический шаг, зависимость или реальный срок.`});
  if(latest.length&&noDeadline) suggestions.push({title:'Уточнить сроки текущего месяца',text:`В ${monthLabel(ui.month)} у ${noDeadline} ${plural(noDeadline,'активной задачи','активных задач','активных задач')} не указан срок. Их можно оставить без даты осознанно или назначить контрольную точку.`});
  if(latest.length>=5&&high>=Math.ceil(latest.length*.4)) suggestions.push({title:'Перепроверить приоритеты',text:`В текущем месяце высокий приоритет стоит у ${high} из ${latest.length} задач. Если всё важно одновременно, приоритет хуже помогает выбирать, чем заняться первым.`});
  const dominant=[...directionStats].sort((a,b)=>b.share-a.share)[0];
  if(total>=6&&dominant?.share>=60) suggestions.push({title:'Учесть концентрацию нагрузки',text:`На направление «${dominant.direction}» приходится ${dominant.share}% месячных записей за выбранный период. Это не проблема само по себе, но полезно учитывать эту концентрацию при добавлении новых задач.`});
  if(total>0&&openRate>=20) suggestions.push({title:'Дозакрыть историю',text:`У ${open} из ${total} месячных записей (${openRate}%) ещё нет итога. Закрытые итоги делают сравнение месяцев и долю переносов точнее.`});
  if(!suggestions.length) suggestions.push({title:'Явных повторяющихся сигналов пока нет',text:'Продолжайте закрывать месяц с итогами и фиксировать переносы: чем длиннее история, тем полезнее будет этот экран.'});

  return `
    <div class="analytics-hero card">
      <div><div class="eyebrow">Период до · ${monthLabel(ui.month)}</div><h2>Качество планирования во времени</h2><p>Экран считает только фактические записи приложения. Он не выставляет оценок, а показывает переносы, незакрытые итоги, распределение нагрузки и повторяющиеся паттерны.</p></div>
      <div class="analytics-range"><label for="analyticsRange">Период</label><select id="analyticsRange"><option value="3" ${ui.analyticsRange==='3'?'selected':''}>3 месяца</option><option value="6" ${ui.analyticsRange==='6'?'selected':''}>6 месяцев</option><option value="12" ${ui.analyticsRange==='12'?'selected':''}>12 месяцев</option><option value="all" ${ui.analyticsRange==='all'?'selected':''}>Вся история</option></select></div>
    </div>
    <div class="grid kpi section compact-section">
      ${kpi('Выполнено',`${completion}%`,`${done} из ${total} месячных задач`)}
      ${kpi('Перенесено',`${carryRate}%`,`${carried} из ${total} записей`,carryRate>=25?'danger':'')}
      ${kpi('Повторные переносы',repeated.length,repeated.length?'Задачи с 2+ переносами':'Повторных переносов нет')}
      ${kpi('CRM',crmLatest?crmLatest.total:'—',crmLatest?(crmDelta===null?`Полный срез за ${monthLabel(crmLatest.month)}`:`${crmDelta>=0?'+':''}${crmDelta} к ${monthLabel(crmPrev.month)}`):'Нет полного среза')}
    </div>

    <div class="grid two section analytics-top-grid">
      <div class="card">
        <div class="section-head"><div><div class="eyebrow">По месяцам</div><h2>План → результат</h2></div><span class="muted">${monthLabel(months[0])} — ${monthLabel(months.at(-1))}</span></div>
        <div class="analytics-month-list">${monthStats.map(x=>`<div class="analytics-month-row"><div class="analytics-month-label"><b>${monthLabel(x.month)}</b><span>${x.total} задач</span></div><div class="analytics-month-bars"><div class="analytics-total-track"><i style="width:${Math.round(x.total/maxMonthTotal*100)}%"></i></div><div class="analytics-outcomes"><span class="outcome-done" style="width:${x.total?pct(x.done,x.total):0}%" title="Готово ${x.done}"></span><span class="outcome-carry" style="width:${x.total?pct(x.carried,x.total):0}%" title="Перенесено ${x.carried}"></span><span class="outcome-other" style="width:${x.total?pct(Math.max(0,x.total-x.done-x.carried),x.total):0}%"></span></div></div><div class="analytics-month-values"><b>${x.completion}%</b><span>${x.carried?`${x.carried} →`:''}</span></div></div>`).join('')}</div>
        <div class="analytics-legend"><span><i class="legend-done"></i> выполнено</span><span><i class="legend-carry"></i> перенесено</span><span><i class="legend-other"></i> другое / без итога</span></div>
      </div>
      <div class="card">
        <div class="section-head"><div><div class="eyebrow">Структура работы</div><h2>Нагрузка по направлениям</h2></div></div>
        <div class="analytics-direction-list">${directionStats.map(x=>`<button data-analytics-direction="${x.direction}" class="analytics-direction-row"><div><b>${x.direction}</b><span>${x.total} записей · ${x.share}% периода</span></div><div class="analytics-dir-bar"><i style="width:${Math.round(x.total/maxDirection*100)}%"></i></div><strong>${x.completion}% <small>готово</small></strong></button>`).join('')}</div>
        <p class="analytics-footnote">Считается количество месячных записей, а не трудоёмкость в часах.</p>
      </div>
    </div>

    <div class="grid two section">
      <div class="card">
        <div class="section-head"><div><div class="eyebrow">Повторяющийся сигнал</div><h2>Задачи с повторными переносами</h2></div><span class="badge ${repeated.length?'amber':'green'}">${repeated.length}</span></div>
        ${repeated.length?`<div class="analytics-repeat-list">${repeated.slice(0,10).map(x=>`<button class="analytics-repeat" data-analytics-task="${escapeHtml(x.t.id)}"><span><b>${escapeHtml(x.t.id)}</b>${escapeHtml(x.t.title)}</span><strong>${x.n}×</strong><small>${escapeHtml(projectName(x.t.projectCode))}</small></button>`).join('')}</div>`:'<div class="empty compact">В выбранном периоде нет задач, перенесённых два и более раза.</div>'}
      </div>
      <div class="card">
        <div class="section-head"><div><div class="eyebrow">ПСТБИ</div><h2>Динамика CRM</h2></div><button class="link-btn" data-nav="crm">Открыть CRM</button></div>
        ${completeCrm.length?`<div class="crm-trend">${completeCrm.map(x=>`<div class="crm-trend-col"><div class="crm-trend-value">${x.total}</div><div class="crm-trend-bar"><i style="height:${Math.max(6,Math.round(x.total/maxCrm*100))}%"></i></div><span>${monthLabel(x.month).split(' ')[0].slice(0,3)}</span></div>`).join('')}</div>${stageChanges.length?`<div class="subsection-title">Самые заметные изменения между двумя последними полными срезами</div><div class="stage-change-list">${stageChanges.map(x=>`<div><span>${escapeHtml(x.stage)}</span><b class="${x.delta>0?'delta-up':'delta-down'}">${x.delta>0?'+':''}${x.delta}</b></div>`).join('')}</div>`:''}`:'<div class="empty compact">Для графика нужен хотя бы один полностью заполненный CRM-срез.</div>'}
      </div>
    </div>

    <div class="section card">
      <div class="section-head"><div><div class="eyebrow">Проекты</div><h2>Где накапливаются переносы и незакрытые итоги</h2></div><span class="muted">первые ${projectStats.length} по числу сигналов</span></div>
      ${projectStats.length?`<div class="table-wrap analytics-project-table"><table><thead><tr><th>Проект</th><th>Направление</th><th>Записей</th><th>Готово</th><th>Переносы</th><th>Без итога</th><th></th></tr></thead><tbody>${projectStats.map(x=>`<tr><td><b>${escapeHtml(projectName(x.code))}</b></td><td>${escapeHtml(x.direction)}</td><td>${x.total}</td><td>${x.done} · ${pct(x.done,x.total)}%</td><td>${x.carried}</td><td>${x.open}</td><td><button class="btn small" data-analytics-project="${escapeHtml(x.code)}">Задачи</button></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty compact">Нет данных за выбранный период.</div>'}
    </div>

    <div class="section card analytics-suggestions">
      <div class="section-head"><div><div class="eyebrow">Следующий цикл</div><h2>Что учесть при планировании</h2></div></div>
      <div class="analytics-suggestion-grid">${suggestions.slice(0,5).map((x,i)=>`<div class="analytics-suggestion"><span>${String(i+1).padStart(2,'0')}</span><div><b>${escapeHtml(x.title)}</b><p>${escapeHtml(x.text)}</p></div></div>`).join('')}</div>
    </div>`;
}
function plural(n,one,few,many){ const a=Math.abs(n)%100,b=a%10; if(a>10&&a<20)return many; if(b>1&&b<5)return few; if(b===1)return one; return many; }

function renderReports(){
  return `<div class="report-controls card no-print"><div><div class="eyebrow">Готовый документ</div><h2>Отчёт за ${monthLabel(ui.month)}</h2><p>Данные подтягиваются из задач, CRM и раздела «Супервизии». Перед печатью достаточно проверить незаполненные поля.</p></div><div class="report-control-actions"><button class="btn" data-nav="meetings">Дополнить супервизию</button><button class="btn" data-nav="crm">Проверить CRM</button><button class="btn primary" data-print>Печать / PDF</button></div></div>
    ${renderMonthlyReport(ui.month)}
    <details class="export-panel card no-print"><summary><div><b>Выгрузка данных и резервная копия</b><span>CSV за произвольный период, JSON и импорт</span></div><span>⌄</span></summary><div class="export-panel-body"><div class="form-grid"><div class="field"><label>С месяца</label><input type="month" id="reportFrom" value="${ui.reportFrom}"></div><div class="field"><label>По месяц</label><input type="month" id="reportTo" value="${ui.reportTo}"></div></div><div class="toolbar" style="margin-top:14px"><button class="btn primary" data-export-tasks>Скачать задачи CSV</button><button class="btn" data-export-crm>Скачать CRM CSV</button><button class="btn" data-export-json>Резервная копия JSON</button><label class="btn" for="importJson">Импорт JSON</label><input class="file-input" id="importJson" type="file" accept="application/json"></div></div></details>`;
}

function renderModal(){
  if(ui.modal==='snapshot') return renderSnapshotModal();
  if(ui.modal==='editProject') return renderEditProjectModal();
  if(ui.modal==='task') return renderTaskModal();
  if(ui.modal==='project') return renderProjectModal();
  if(ui.modal==='closeMonth') return renderCloseMonthModal();
  return '';
}
function taskHistoryHtml(t){
  if(!t) return '';
  const rows=state.taskMonths.filter(r=>r.taskId===t.id).sort((a,b)=>b.month.localeCompare(a.month));
  if(rows.length<=1) return '';
  return `<details class="task-history"><summary>История задачи по месяцам <span class="muted">${rows.length} записей</span></summary><div class="task-history-list">${rows.map(r=>`<div class="task-history-row"><b>${monthLabel(r.month)}</b><span>${statusBadge(r.status)}</span><span>${resultBadge(r.monthResult)}</span>${r.actual?`<p>${escapeHtml(r.actual)}</p>`:''}</div>`).join('')}</div></details>`;
}
function renderTaskModal(){
  const t=ui.editTaskId?getTask(ui.editTaskId):null; const r=t?getMonthRecord(t.id,ui.month):null; const direction=t?.direction||ui.taskDirection||'ПСТБИ'; const projectCode=t?.projectCode||ui.taskProject||state.projects.find(p=>p.direction===direction)?.code||'';
  return `<div class="modal-backdrop" data-close-modal><div class="modal task-modal" onclick="event.stopPropagation()">
    <div class="modal-title-row"><div><div class="eyebrow">${t?'Карточка задачи':'Быстрое добавление'}</div><h3>${t?'Задача '+escapeHtml(t.id):'Новая задача'}</h3></div>${t?`<div class="quick-task-actions"><button class="btn small success" data-quick-done>✓ Готово</button><button class="btn small" data-quick-carry>→ Перенести</button></div>`:''}</div>
    ${!t&&state.templates.length?`<div class="field template-picker"><label for="taskTemplate">Заполнить по шаблону</label><select id="taskTemplate"><option value="">Без шаблона</option>${state.templates.map(x=>`<option value="${escapeHtml(x.id)}">${escapeHtml(x.title)}</option>`).join('')}</select></div>`:''}
    <section class="task-form-section"><div class="task-form-heading"><b>1. Основное</b><span>Достаточно указать направление, проект и название.</span></div><div class="form-grid">
      <div class="field"><label>Направление</label><select id="taskDirection">${options(DIRECTIONS,direction,null)}</select></div>
      <div class="field"><label>Проект</label><select id="taskProject">${state.projects.filter(p=>p.direction===direction).map(p=>`<option value="${p.code}" ${p.code===projectCode?'selected':''}>${escapeHtml(p.code+' '+p.name)}</option>`).join('')}</select></div>
      <div class="field wide"><label>Название задачи</label><textarea id="taskTitle" class="task-title-input" placeholder="Что нужно сделать?">${escapeHtml(t?.title||'')}</textarea></div>
      <div class="field"><label>ID задачи</label><input id="taskId" value="${escapeHtml(t?.id||nextTaskId(projectCode))}" ${t?'readonly':''}></div>
      <div class="field"><label>Тип записи</label><select id="taskType">${options(TASK_TYPES,t?.type||'Задача',null)}</select></div>
      <label class="check-field"><input type="checkbox" id="taskRecurring" ${t?.recurring?'checked':''}><span><b>Повторять каждый месяц</b><small>Задача будет предлагаться на экране планирования.</small></span></label>
    </div></section>
    <section class="task-form-section"><div class="task-form-heading"><b>2. План на ${monthLabel(ui.month)}</b><span>Срок и приоритет можно оставить пустыми.</span></div><div class="form-grid">
      <div class="field"><label>Месяц</label><input type="month" id="taskMonth" value="${ui.month}"></div>
      <div class="field"><label>Родительская задача</label><input id="taskParent" value="${escapeHtml(t?.parentId||'')}" placeholder="например 2.2-01"></div>
      <div class="field wide"><label>Планируемый результат месяца</label><textarea id="taskPlanned">${escapeHtml(r?.planned||t?.title||'')}</textarea></div>
      <div class="field"><label>Срок</label><input type="date" id="taskDeadline" value="${r?.deadline||''}"></div>
      <div class="field"><label>Приоритет</label><select id="taskPriority">${options(PRIORITIES.filter(Boolean),r?.priority||'','—')}</select></div>
      <div class="field"><label>Рабочий статус</label><select id="taskStatus">${options(WORK_STATUSES,r?.status||'Запланировано',null)}</select></div>
    </div></section>
    <details class="task-form-section result-section" ${t&&r?.monthResult?'open':''}><summary><b>3. Итог месяца</b><span>Заполняется при супервизии или закрытии месяца</span></summary><div class="form-grid result-grid">
      <div class="field"><label>Итог месяца</label><select id="taskResult">${options(MONTH_RESULTS.filter(Boolean),r?.monthResult||'','Без итога')}</select></div>
      <div class="field wide"><label>Фактический результат</label><textarea id="taskActual">${escapeHtml(r?.actual||'')}</textarea></div>
      <div class="field"><label>Что помешало / нужна помощь</label><textarea id="taskBlocker">${escapeHtml(r?.blocker||'')}</textarea></div>
      <div class="field"><label>Решение / следующий шаг</label><textarea id="taskNextStep">${escapeHtml(r?.nextStep||'')}</textarea></div>
    </div></details>
    ${taskHistoryHtml(t)}
    <div class="modal-actions">${t?'<button class="btn" data-save-template>В шаблоны</button><button class="btn danger" data-delete-task>Удалить задачу</button>':''}<button class="btn" data-close-modal>Отмена</button>${!t?'<button class="btn" data-save-task-add>Сохранить и добавить ещё</button>':''}<button class="btn primary" data-save-task>Сохранить</button></div>
  </div></div>`;
}
function renderCloseMonthModal(){
  const records=taskRecordsForMonth(ui.month);
  const crm=crmForMonth(ui.month); const filled=crm?CRM_STAGES.filter(stage=>crm.stages?.[stage]!==''&&crm.stages?.[stage]!==null&&crm.stages?.[stage]!==undefined).length:0;
  const meeting=state.meetings.find(m=>m.month===ui.month);
  const unresolved=records.filter(({r})=>!r.monthResult).length;
  const next=nextMonth(ui.month);
  return `<div class="modal-backdrop" data-close-modal><div class="modal close-month-modal" onclick="event.stopPropagation()">
    <div class="modal-title-row"><div><div class="eyebrow">Переход к ${monthLabel(next)}</div><h3>Закрыть ${monthLabel(ui.month)}</h3></div><span class="badge ${unresolved?'amber':'green'}">${unresolved?`${unresolved} без итога`:'Итоги заполнены'}</span></div>
    <div class="close-checks">
      <div class="close-check ${unresolved?'warn':'ok'}"><b>Задачи</b><span>${unresolved?`${unresolved} задач требуют итога`:'Все задачи имеют итог'}</span></div>
      <div class="close-check ${filled<CRM_STAGES.length?'warn':'ok'}"><b>CRM</b><span>${filled}/${CRM_STAGES.length} стадий заполнено</span></div>
      <div class="close-check ${meeting?.nextFocus?'ok':'warn'}"><b>Следующий месяц</b><span>${meeting?.nextFocus?'Фокус зафиксирован':'Фокус ещё не указан'}</span></div>
    </div>
    <div class="close-month-tools"><span class="muted">Для незавершённых задач можно одним действием выбрать перенос.</span><button class="btn small" data-mark-open-carry>Перенести все без итога</button></div>
    <div class="close-task-list">${records.length?records.map(({t,r})=>`<div class="close-task-row"><div class="close-task-copy"><b>${escapeHtml(t.id)}</b><span>${escapeHtml(t.title)}</span><small>${escapeHtml(projectName(t.projectCode))}</small></div><select data-close-result="${escapeHtml(t.id)}">${options(MONTH_RESULTS.filter(Boolean),r.monthResult||(r.status==='Завершено'?'Готово':''),'Без итога')}</select></div>`).join(''):'<div class="empty compact">В этом месяце нет задач.</div>'}</div>
    <div class="notice">При выборе «Перенесено» задача автоматически появится в ${monthLabel(next)}. Запись за ${monthLabel(ui.month)} останется в истории без изменений.</div>
    <div class="modal-actions"><button class="btn" data-close-modal>Отмена</button><button class="btn primary" data-save-month-results>Сохранить итоги месяца</button></div>
  </div></div>`;
}
function renderProjectModal(){ return `<div class="modal-backdrop" data-close-modal><div class="modal" onclick="event.stopPropagation()"><h3>Новый проект</h3><div class="form-grid"><div class="field"><label>Направление</label><select id="projectDirection">${options(DIRECTIONS,'ПСТБИ',null)}</select></div><div class="field"><label>Код</label><input id="projectCode" placeholder="например 1.4"></div><div class="field wide"><label>Название</label><input id="projectName"></div><div class="field"><label>Тип</label><select id="projectType">${options(['Проект','Постоянная работа'],'Проект',null)}</select></div></div><div class="modal-actions"><button class="btn" data-close-modal>Отмена</button><button class="btn primary" data-save-project>Добавить</button></div></div></div>`; }

function bind(){
  document.querySelectorAll('[data-nav]').forEach(el=>el.onclick=()=>{ui.page=el.dataset.nav;ui.mobileMenu=false;render();});
  bindUpgrade();
  const gm=document.querySelector('#globalMonth'); if(gm) gm.onchange=e=>{if(e.target.value)ui.month=e.target.value;render();};
  document.querySelector('[data-month-prev]')?.addEventListener('click',()=>{ui.month=prevMonth(ui.month);render();});
  document.querySelector('[data-month-next]')?.addEventListener('click',()=>{ui.month=nextMonth(ui.month);render();});
  document.querySelectorAll('[data-add-task]').forEach(el=>el.onclick=()=>{ui.editTaskId=null;ui.modal='task';render();});
  document.querySelector('[data-add-project]')?.addEventListener('click',()=>{ui.modal='project';render();});
  document.querySelectorAll('[data-close-month]').forEach(el=>el.onclick=()=>{ui.modal='closeMonth';render();});
  document.querySelectorAll('[data-dashboard-task]').forEach(el=>el.onclick=()=>{ui.editTaskId=el.dataset.dashboardTask;ui.modal='task';render();});
  document.querySelectorAll('[data-dashboard-direction]').forEach(el=>el.onclick=()=>{ui.page='tasks';ui.taskDirection=el.dataset.dashboardDirection;ui.taskProject='';ui.taskStatus='';ui.taskSearch='';render();});
  document.querySelector('[data-open-next-plan]')?.addEventListener('click',()=>{ui.planMonth=nextMonth(ui.month);ui.page='planning';render();});
  document.querySelectorAll('[data-close-modal]').forEach(el=>el.onclick=()=>{ui.modal=null;ui.editTaskId=null;render();});
  bindPlanning(); bindTasks(); bindProjects(); bindCompare(); bindAnalytics(); bindCrm(); bindMeetings(); bindReports(); bindModal();
}

function bindPlanning(){
  const pm=document.querySelector('#planMonth');
  if(pm) pm.onchange=e=>{if(e.target.value)ui.planMonth=e.target.value;render();};
  document.querySelector('[data-plan-month-prev]')?.addEventListener('click',()=>{ui.planMonth=prevMonth(ui.planMonth);render();});
  document.querySelector('[data-plan-month-next]')?.addEventListener('click',()=>{ui.planMonth=nextMonth(ui.planMonth);render();});
  document.querySelectorAll('[data-plan-new-task]').forEach(el=>el.onclick=()=>{ui.month=ui.planMonth;ui.editTaskId=null;ui.modal='task';render();});
  document.querySelector('[data-open-plan-dashboard]')?.addEventListener('click',()=>{ui.month=ui.planMonth;ui.page='dashboard';render();});
  document.querySelector('[data-edit-prev-focus]')?.addEventListener('click',e=>{ui.month=e.currentTarget.dataset.editPrevFocus;ui.page='meetings';render();});
  document.querySelectorAll('[data-plan-open-task]').forEach(el=>el.onclick=()=>{ui.month=ui.planMonth;ui.editTaskId=el.dataset.planOpenTask;ui.modal='task';render();});
  document.querySelectorAll('[data-plan-add]').forEach(el=>el.onclick=()=>addTaskToPlan(el.dataset.planAdd,ui.planMonth));
  document.querySelectorAll('[data-plan-carry]').forEach(el=>el.onclick=()=>carryFromPlanning(el.dataset.planCarry,ui.planMonth));
  document.querySelector('[data-add-all-recurring]')?.addEventListener('click',()=>addAllRecurring(ui.planMonth));
  document.querySelectorAll('[data-plan-remove]').forEach(el=>el.onclick=()=>removeTaskFromPlan(el.dataset.planRemove,ui.planMonth));
  document.querySelectorAll('[data-plan-priority]').forEach(el=>el.onchange=e=>{const r=getMonthRecord(e.target.dataset.planPriority,ui.planMonth);if(r){r.priority=e.target.value;saveState();render();}});
  document.querySelectorAll('[data-plan-deadline]').forEach(el=>el.onchange=e=>{const r=getMonthRecord(e.target.dataset.planDeadline,ui.planMonth);if(r){r.deadline=e.target.value;saveState();render();}});
}

function bindTasks(){
  const fd=document.querySelector('#filterDirection'); if(fd)fd.onchange=e=>{ui.taskDirection=e.target.value;ui.taskProject='';render();};
  const fp=document.querySelector('#filterProject'); if(fp)fp.onchange=e=>{ui.taskProject=e.target.value;render();};
  const fs=document.querySelector('#filterStatus'); if(fs)fs.onchange=e=>{ui.taskStatus=e.target.value;render();};
  const fq=document.querySelector('#filterSearch'); if(fq)fq.oninput=e=>{ui.taskSearch=e.target.value;render();setTimeout(()=>document.querySelector('#filterSearch')?.focus(),0);};
  document.querySelectorAll('[data-edit-task]').forEach(b=>b.onclick=()=>{ui.editTaskId=b.dataset.editTask;ui.modal='task';render();});
  document.querySelectorAll('[data-copy-task]').forEach(b=>b.onclick=()=>carryTask(b.dataset.copyTask,ui.month,nextMonth(ui.month)));
  document.querySelectorAll('[data-plan-task]').forEach(b=>b.onclick=()=>planTask(b.dataset.planTask,ui.month));
}
function bindProjects(){
  document.querySelectorAll('[data-project-task]').forEach(b=>b.onclick=()=>{const p=state.projects.find(x=>x.code===b.dataset.projectTask);ui.taskDirection=p.direction;ui.taskProject=p.code;ui.editTaskId=null;ui.modal='task';render();});
  document.querySelectorAll('[data-delete-project]').forEach(b=>b.onclick=()=>{const code=b.dataset.deleteProject;if(state.tasks.some(t=>t.projectCode===code)) return alert('Сначала удалите или перенесите задачи этого проекта.'); if(confirm('Удалить проект?')){state.projects=state.projects.filter(p=>p.code!==code);saveState();render();}});
}
function bindCompare(){ const a=document.querySelector('#compareMonth');if(a)a.onchange=e=>{if(e.target.value)ui.compareMonth=e.target.value;render();};const b=document.querySelector('#compareCurrent');if(b)b.onchange=e=>{if(e.target.value)ui.month=e.target.value;render();}; }
function bindAnalytics(){
  const range=document.querySelector('#analyticsRange'); if(range) range.onchange=e=>{ui.analyticsRange=e.target.value;render();};
  document.querySelectorAll('[data-analytics-task]').forEach(el=>el.onclick=()=>{ui.editTaskId=el.dataset.analyticsTask;ui.modal='task';render();});
  document.querySelectorAll('[data-analytics-direction]').forEach(el=>el.onclick=()=>{ui.page='tasks';ui.taskDirection=el.dataset.analyticsDirection;ui.taskProject='';ui.taskStatus='';ui.taskSearch='';render();});
  document.querySelectorAll('[data-analytics-project]').forEach(el=>el.onclick=()=>{ui.page='tasks';ui.taskProject=el.dataset.analyticsProject;const p=state.projects.find(x=>x.code===ui.taskProject);ui.taskDirection=p?.direction||'';ui.taskStatus='';ui.taskSearch='';render();});
}
function bindCrm(){
  if(ui.page!=='crm') return;
  const c=selectedCrm(); const save=()=>{saveState();render();};
  document.querySelector('#crmSnapshotDate')?.addEventListener('change',e=>{const date=e.target.value; if(date && (date.slice(0,7)!==ui.month || crmSnapshots(ui.month).some(x=>x.id!==c.id&&x.snapshotDate===date))){alert('Выберите уникальную дату в выбранном месяце.');render();return;} c.snapshotDate=date;save();});
  document.querySelectorAll('[data-crm-stage]').forEach(i=>i.onchange=e=>{const val=e.target.value; if(val!==''&&(!Number.isSafeInteger(Number(val))||Number(val)<0)){alert('Введите целое число от 0.');render();return;} c.stages[e.target.dataset.crmStage]=val===''?'':Number(val);save();});
  [['crmState','state'],['crmChanges','changes'],['crmProblems','problems'],['crmNextStep','nextStep']].forEach(([id,key])=>{const el=document.querySelector('#'+id); if(el) el.onchange=e=>{c[key]=e.target.value;saveState();};});
}
function bindMeetings(){ if(ui.page!=='meetings')return; const m=ensureMeeting(ui.month); [['meetingDate','date'],['meetingKeyResults','keyResults'],['meetingDifficulties','difficulties'],['meetingDecisions','decisions'],['meetingNextFocus','nextFocus'],['meetingNextMeeting','nextMeeting']].forEach(([id,key])=>{const el=document.querySelector('#'+id);if(el)el.onchange=e=>{m[key]=e.target.value;saveState();render();};}); }
function bindReports(){
  const f=document.querySelector('#reportFrom');if(f)f.onchange=e=>{ui.reportFrom=e.target.value;render();}; const t=document.querySelector('#reportTo');if(t)t.onchange=e=>{ui.reportTo=e.target.value;render();};
  document.querySelector('[data-export-tasks]')?.addEventListener('click',exportTasksCsv); document.querySelector('[data-export-crm]')?.addEventListener('click',exportCrmCsv); document.querySelector('[data-export-json]')?.addEventListener('click',exportJson); document.querySelectorAll('[data-print]').forEach(el=>el.addEventListener('click',()=>window.print()));
  document.querySelector('#importJson')?.addEventListener('change',importJson);
}
function bindModal(){
  document.querySelector('#taskDirection')?.addEventListener('change',e=>{const d=e.target.value; const select=document.querySelector('#taskProject'); select.innerHTML=state.projects.filter(p=>p.direction===d).map(p=>`<option value="${p.code}">${escapeHtml(p.code+' '+p.name)}</option>`).join(''); if(!ui.editTaskId){const p=select.value;document.querySelector('#taskId').value=nextTaskId(p);} });
  document.querySelector('#taskProject')?.addEventListener('change',e=>{if(!ui.editTaskId)document.querySelector('#taskId').value=nextTaskId(e.target.value);});
  document.querySelector('[data-save-task]')?.addEventListener('click',()=>saveTaskFromModal(false));
  document.querySelector('[data-save-task-add]')?.addEventListener('click',()=>saveTaskFromModal(true));
  document.querySelector('[data-quick-done]')?.addEventListener('click',()=>quickFinishTask('Готово'));
  document.querySelector('[data-quick-carry]')?.addEventListener('click',()=>quickFinishTask('Перенесено'));
  document.querySelector('[data-mark-open-carry]')?.addEventListener('click',()=>{document.querySelectorAll('[data-close-result]').forEach(sel=>{if(!sel.value)sel.value='Перенесено';});});
  document.querySelector('[data-save-month-results]')?.addEventListener('click',saveMonthResults);
  document.querySelector('[data-delete-task]')?.addEventListener('click',()=>{const id=ui.editTaskId;if(confirm(`Удалить задачу ${id} и всю её месячную историю?`)){state.tasks=state.tasks.filter(t=>t.id!==id);state.taskMonths=state.taskMonths.filter(r=>r.taskId!==id);saveState();ui.modal=null;ui.editTaskId=null;render();}});
  document.querySelector('[data-save-project]')?.addEventListener('click',()=>{const code=v('projectCode').trim(),name=v('projectName').trim();if(!code||!name)return alert('Заполните код и название.');if(state.projects.some(p=>p.code===code))return alert('Такой код уже существует.');state.projects.push({code,direction:v('projectDirection'),name,type:v('projectType')});saveState();ui.modal=null;render();});
}
function v(id){ return document.querySelector('#'+id)?.value||''; }
function saveTaskFromModal(addAnother=false){
  const id=v('taskId').trim(), month=v('taskMonth'); if(!ui.editTaskId&&getTask(id))return alert('Такой ID уже существует. Укажите другой ID.'); if(!v('taskProject'))return alert('Сначала создайте проект.'); if(!id||!v('taskTitle').trim()||!month) return alert('Заполните ID, название и месяц.');
  const recurring=!!document.querySelector('#taskRecurring')?.checked;
  let t=getTask(id); if(!t){ if(state.tasks.some(x=>x.id===id))return alert('Такой ID уже есть.'); t={id,direction:v('taskDirection'),projectCode:v('taskProject'),title:v('taskTitle').trim(),parentId:v('taskParent').trim(),type:v('taskType'),recurring}; state.tasks.push(t); }
  else Object.assign(t,{direction:v('taskDirection'),projectCode:v('taskProject'),title:v('taskTitle').trim(),parentId:v('taskParent').trim(),type:v('taskType'),recurring});
  let r=getMonthRecord(id,month); if(!r){r={taskId:id,month};state.taskMonths.push(r);} Object.assign(r,{planned:v('taskPlanned')||v('taskTitle').trim(),deadline:v('taskDeadline'),priority:v('taskPriority'),status:v('taskStatus'),monthResult:v('taskResult'),actual:v('taskActual'),blocker:v('taskBlocker'),nextStep:v('taskNextStep'),carryTo:r.carryTo||''});
  if(r.monthResult==='Перенесено'){ carryTaskRecord(r,month,nextMonth(month)); }
  if(r.monthResult!=='Перенесено'){ r.carryTo=''; }
  saveState(); ui.month=month;
  if(addAnother){ ui.editTaskId=null; ui.modal='task'; render(); return; }
  ui.modal=null; ui.editTaskId=null; render();
}
function carryTaskRecord(src,from,to){
  let dst=getMonthRecord(src.taskId,to);
  if(!dst){dst={...clone(src),month:to,monthResult:'',actual:'',blocker:'',carryTo:'',status:'Запланировано'};state.taskMonths.push(dst);}
  src.monthResult='Перенесено'; src.carryTo=to;
}
function quickFinishTask(result){
  const t=ui.editTaskId?getTask(ui.editTaskId):null; if(!t)return;
  const month=v('taskMonth')||ui.month; let r=getMonthRecord(t.id,month); if(!r)return;
  r.monthResult=result;
  if(result==='Готово'){r.status='Завершено';r.carryTo='';}
  if(result==='Перенесено') carryTaskRecord(r,month,nextMonth(month));
  saveState(); ui.modal=null; ui.editTaskId=null; render();
}
function saveMonthResults(){
  const next=nextMonth(ui.month); let carried=0, changed=0;
  document.querySelectorAll('[data-close-result]').forEach(sel=>{
    const id=sel.dataset.closeResult; const r=getMonthRecord(id,ui.month); if(!r)return;
    const result=sel.value;
    if(r.monthResult!==result) changed++;
    r.monthResult=result;
    if(result==='Готово'){r.status='Завершено';r.carryTo='';}
    else if(result==='Перенесено'){carryTaskRecord(r,ui.month,next);carried++;}
    else if(result!=='Перенесено'){r.carryTo='';}
  });
  saveState(); ui.modal=null; ui.planMonth=next; ui.page='planning'; render();
  alert(`Итоги ${monthLabel(prevMonth(next))} сохранены.${carried?` Перенесено в ${monthLabel(next)}: ${carried}.`:''} Открыт план следующего месяца.`);
}

function latestTaskRecordBefore(taskId,month){
  return state.taskMonths.filter(r=>r.taskId===taskId&&r.month<month).sort((a,b)=>b.month.localeCompare(a.month))[0]||null;
}
function addTaskToPlan(taskId,month){
  if(getMonthRecord(taskId,month))return;
  const t=getTask(taskId); if(!t)return;
  const prev=latestTaskRecordBefore(taskId,month);
  state.taskMonths.push({
    taskId,month,
    planned:prev?.planned||t.title,
    deadline:'',
    priority:prev?.priority||'',
    status:t.type==='Предложение'?'К согласованию':'Запланировано',
    monthResult:'',actual:'',blocker:'',nextStep:prev?.nextStep||'',carryTo:''
  });
  saveState(); render();
}
function addAllRecurring(month){
  const items=state.tasks.filter(t=>actionableTask(t)&&isRecurringTask(t)&&!getMonthRecord(t.id,month));
  items.forEach(t=>{
    const prev=latestTaskRecordBefore(t.id,month);
    state.taskMonths.push({taskId:t.id,month,planned:prev?.planned||t.title,deadline:'',priority:prev?.priority||'',status:'Запланировано',monthResult:'',actual:'',blocker:'',nextStep:prev?.nextStep||'',carryTo:''});
  });
  saveState(); render();
}
function carryFromPlanning(taskId,target){
  const src=getMonthRecord(taskId,prevMonth(target))||latestTaskRecordBefore(taskId,target);
  if(!src)return addTaskToPlan(taskId,target);
  carryTaskRecord(src,src.month,target);
  saveState(); render();
}
function removeTaskFromPlan(taskId,month){
  const t=getTask(taskId); if(!t)return;
  if(!confirm(`Убрать задачу «${t.title}» из плана на ${monthLabel(month)}? Сама задача и её история сохранятся.`))return;
  state.taskMonths=state.taskMonths.filter(r=>!(r.taskId===taskId&&r.month===month));
  state.taskMonths.filter(r=>r.taskId===taskId&&r.carryTo===month).forEach(r=>{r.carryTo='';});
  saveState(); render();
}

function planTask(taskId,month){
  if(getMonthRecord(taskId,month))return; const t=getTask(taskId); if(!t)return; state.taskMonths.push({taskId,month,planned:t.title,deadline:'',priority:'',status:t.type==='Предложение'?'К согласованию':'Запланировано',monthResult:'',actual:'',blocker:'',nextStep:'',carryTo:''}); saveState(); render();
}
function carryTask(taskId,from,to){
  const src=getMonthRecord(taskId,from); if(!src)return; carryTaskRecord(src,from,to); saveState();alert(`Задача перенесена в ${monthLabel(to)}. История ${monthLabel(from)} сохранена.`);render();
}
function formatDate(s){ if(!s)return'—'; const [y,m,d]=s.split('-');return `${d}.${m}.${y}`; }
function download(name,content,type='text/plain;charset=utf-8'){ const blob=new Blob([content],{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000); }
function csvCell(v){ const s=String(v??''); return `"${s.replaceAll('"','""')}"`; }
function exportTasksCsv(){
  const rows=[['Месяц','Направление','Проект','ID','Задача','Срок','Приоритет','Статус','Итог месяца','Фактический результат','Что помешало','Следующий шаг','Перенос на']];
  state.taskMonths.filter(r=>r.month>=ui.reportFrom&&r.month<=ui.reportTo).sort((a,b)=>a.month.localeCompare(b.month)).forEach(r=>{const t=getTask(r.taskId);if(!t)return;rows.push([r.month,t.direction,projectName(t.projectCode),t.id,t.title,r.deadline,r.priority,r.status,r.monthResult,r.actual,r.blocker,r.nextStep,r.carryTo]);});
  download(`tasks_${ui.reportFrom}_${ui.reportTo}.csv`,'\ufeff'+rows.map(r=>r.map(csvCell).join(';')).join('\n'),'text/csv;charset=utf-8');
}
function exportCrmCsv(){
  const rows=[['Месяц','Дата среза',...CRM_STAGES,'Всего','Состояние базы','Что сделано / изменилось','Проблемы / нужна помощь','Следующий шаг']];
  state.crm.filter(c=>c.month>=ui.reportFrom&&c.month<=ui.reportTo).sort((a,b)=>(a.month+(a.snapshotDate||'')).localeCompare(b.month+(b.snapshotDate||''))).forEach(c=>rows.push([c.month,c.snapshotDate,...CRM_STAGES.map(s=>c.stages[s]),crmTotal(c)??'',c.state,c.changes,c.problems,c.nextStep]));
  download(`crm_${ui.reportFrom}_${ui.reportTo}.csv`,'\ufeff'+rows.map(r=>r.map(csvCell).join(';')).join('\n'),'text/csv;charset=utf-8');
}
function exportJson(){ download(`supervision_backup_${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(state,null,2),'application/json'); }
function importJson(e){ const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(!data.version||!Array.isArray(data.projects)||!Array.isArray(data.tasks)||!Array.isArray(data.taskMonths)||!Array.isArray(data.crm)||!Array.isArray(data.meetings))throw new Error();if(confirm('Заменить текущие данные данными из резервной копии?')){state=normalizeState(data);ui.crmId=null;saveState();render();}}catch{alert('Не удалось прочитать резервную копию.');}};reader.readAsText(file); }


// 1.0 — dated snapshots and personal workspace. Existing storage key is preserved.
function uid(){return typeof crypto.randomUUID==='function'?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);}
function readPreference(key){try{return localStorage.getItem(key);}catch{return null;}}
function normalizeState(data){
  data.crm=Array.isArray(data.crm)?data.crm:[]; data.meetings=Array.isArray(data.meetings)?data.meetings:[];
  data.templates=Array.isArray(data.templates)?data.templates:[];
  const ids=new Set();
  data.crm.forEach(c=>{if(!c.id||ids.has(c.id))c.id=uid();ids.add(c.id);c.stages={...Object.fromEntries(CRM_STAGES.map(s=>[s,''])),...c.stages};});
  return data;
}
function crmSnapshots(month){return state.crm.filter(c=>c.month===month).sort((a,b)=>(b.snapshotDate||'').localeCompare(a.snapshotDate||''));}
function crmForMonth(month){return crmSnapshots(month)[0];}
function ensureCrm(month){let c=crmForMonth(month);if(!c){c={id:uid(),month,snapshotDate:'',stages:Object.fromEntries(CRM_STAGES.map(s=>[s,''])),state:'',changes:'',problems:'',nextStep:''};state.crm.push(c);saveState();}return c;}
function selectedCrm(){return crmSnapshots(ui.month).find(c=>c.id===ui.crmId)||crmForMonth(ui.month)||ensureCrm(ui.month);}
function snapshotOptions(c){return crmSnapshots(ui.month).map(x=>`<option value="${escapeHtml(x.id)}" ${x.id===c?.id?'selected':''}>${x.snapshotDate?formatDate(x.snapshotDate):'Дата не указана'}${x===crmForMonth(ui.month)?' · последний':''}</option>`).join('');}
function snapshotToolbar(c){return `<div class="card snapshot-toolbar section"><div class="field"><label for="crmSnapshotSelect">Срез за ${monthLabel(ui.month)}</label><select id="crmSnapshotSelect">${snapshotOptions(c)}</select></div><button class="btn primary" data-new-snapshot>+ Новый срез</button><p class="muted">Изменения сохраняются автоматически. Для другой даты создайте новый срез — история останется на месте.</p></div>`;}
function renderDashboardCrm(){
  const list=crmSnapshots(ui.month);const c=list.find(x=>x.id===ui.crmId)||list[0];
  const idx=list.indexOf(c);const prev=list[idx+1]||crmForMonth(prevMonth(ui.month));
  const total=crmTotal(c);const filled=CRM_STAGES.filter(s=>c?.stages[s]!==undefined&&c?.stages[s]!==null&&c?.stages[s]!=='').length;
  return `<section class="card section crm-overview"><div class="section-head"><div><div class="eyebrow">База абитуриентов · ПСТБИ</div><h2>CRM по стадиям</h2><p class="muted">${c?.snapshotDate?'Состояние на '+formatDate(c.snapshotDate):'Дата среза пока не указана'} · ${monthLabel(ui.month)}</p></div><div class="toolbar">${list.length?`<select id="overviewSnapshot" aria-label="Дата среза CRM">${snapshotOptions(c)}</select>`:''}<button class="btn" data-nav="crm">Редактировать ↗</button></div></div>
  <div class="crm-overview-layout"><div class="crm-overview-summary"><span class="eyebrow">Всего сделок</span><strong>${total===null?'—':total}</strong><p>${filled} из 11 стадий заполнено</p><div class="snapshot-note">${total===null?'Для общего итога заполните все стадии. Ноль означает, что сделок нет.':'Показатели выбранного среза.'}</div>${c?.nextStep?`<div class="focus-box"><b>Следующий шаг</b><p>${escapeHtml(c.nextStep)}</p></div>`:''}<button class="btn primary" data-new-snapshot>+ Новый срез</button></div>
  <div class="table-wrap crm-stage-table"><table><thead><tr><th>Стадия</th><th>Сделок</th><th title="Изменение к предыдущему срезу">Δ ${prev?.snapshotDate?formatDate(prev.snapshotDate):'к предыдущему'}</th></tr></thead><tbody>${CRM_STAGES.map((s,i)=>{const val=c?.stages[s],pv=prev?.stages[s];const has=val!==''&&val!==undefined&&val!==null;const hasPrev=pv!==''&&pv!==undefined&&pv!==null;const d=has&&hasPrev?Number(val)-Number(pv):null;return `<tr><td><span class="stage-dot tone-${i%4}"></span>${escapeHtml(s)}</td><td><b>${has?escapeHtml(val):'—'}</b></td><td class="muted">${d===null?'—':(d>0?'+':'')+d}</td></tr>`;}).join('')}</tbody></table><div class="table-note">— нет данных · 0 сделок нет · Δ изменение количества, не оценка результата</div></div></div>
  ${list.length>1?`<details class="snapshot-history"><summary>Все даты месяца · ${list.length} среза</summary>${crmMonthMatrix(list)}</details>`:''}</section>`;
}
function crmMonthMatrix(rows){return `<div class="table-wrap"><table><thead><tr><th>Стадия</th>${rows.map(c=>`<th>${c.snapshotDate?formatDate(c.snapshotDate):'Без даты'}</th>`).join('')}</tr></thead><tbody>${CRM_STAGES.map(s=>`<tr><td>${escapeHtml(s)}</td>${rows.map(c=>`<td>${c.stages[s]===''?'—':escapeHtml(c.stages[s]??'—')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function crmHistory(){const rows=[...state.crm].sort((a,b)=>(b.month+(b.snapshotDate||'')).localeCompare(a.month+(a.snapshotDate||'')));return `<p class="muted">В отчёт и аналитику попадает последний по дате срез каждого месяца. В CSV и JSON сохраняются все срезы.</p><div class="table-wrap"><table><thead><tr><th>Месяц</th><th>Дата среза</th><th>Всего</th><th>Состояние</th><th></th></tr></thead><tbody>${rows.map(c=>`<tr><td>${monthLabel(c.month)}</td><td>${c.snapshotDate?formatDate(c.snapshotDate):'Не указана'}</td><td>${crmTotal(c)??'—'}</td><td>${escapeHtml(c.state||'—')}</td><td><button class="btn small" data-open-snapshot="${escapeHtml(c.id)}">Открыть</button></td></tr>`).join('')}</tbody></table></div>`;}
function renderSnapshotModal(){const c=crmForMonth(ui.month);let date=ui.month===currentMonth()?`${ui.month}-${String(new Date().getDate()).padStart(2,'0')}`:`${ui.month}-01`;return `<div class="modal-backdrop" data-close-modal><div class="modal" onclick="event.stopPropagation()"><h3>Новый срез CRM</h3><p class="muted">Укажите фактическую дату. Предыдущие записи сохранятся.</p><form id="snapshotForm"><div class="field"><label for="newSnapshotDate">Дата среза</label><input id="newSnapshotDate" type="date" required min="${ui.month}-01" max="${ui.month}-${new Date(Number(ui.month.slice(0,4)),Number(ui.month.slice(5)),0).getDate()}" value="${date}"></div>${c?'<label class="check-field"><input type="checkbox" id="copySnapshot"><span>Взять числа из последнего среза для сверки</span></label>':''}<div class="modal-actions"><button type="button" class="btn" data-close-modal>Отмена</button><button type="submit" class="btn primary">Создать срез</button></div></form></div></div>`;}
function icon(name){const paths={dashboard:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',planning:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-14 5h4"/>',tasks:'<path d="m3 6 2 2 4-4m3 2h9M3 13l2 2 4-4m3 2h9M3 20l2 2 4-4m3 2h9"/>',projects:'<path d="M3 7V5a2 2 0 0 1 2-2h5l3 4h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',compare:'<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',analytics:'<path d="M4 3v18h17M8 16l4-6 4 3 5-8"/>',crm:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',meetings:'<path d="M21 11a8 8 0 0 1-8 8H7l-4 3V5a2 2 0 0 1 2-2h8a8 8 0 0 1 8 8Z"/><path d="M7 8h9m-9 5h6"/>',reports:'<path d="M5 3h10l4 4v14H5V3Zm10 0v5h4M8 12h8m-8 4h6"/>',settings:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',panel:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16m5-11 3 3-3 3"/>'};return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.tasks}</svg>`;}
function renderSettings(){return `<div class="card"><div class="eyebrow">Начать просто</div><h2>Ваш рабочий ритм</h2><div class="guide-grid"><div><b>01 · Запланировать</b><p>Добавьте проекты и задачи. В «Планировании» соберите месяц из новых и постоянных дел.</p><button class="link-btn" data-nav="planning">К плану →</button></div><div><b>02 · Зафиксировать</b><p>Указывайте результаты задач. В CRM создавайте срез на каждую нужную дату.</p><button class="link-btn" data-nav="crm">К CRM →</button></div><div><b>03 · Подвести итог</b><p>Закройте месяц на «Обзоре», заполните супервизию и сохраните отчёт в PDF.</p><button class="link-btn" data-nav="reports">К отчёту →</button></div></div></div><div class="grid two section"><div class="card"><h2>Проекты и направления</h2><p class="muted">ПСТБИ · Школы · Олимпиады</p><p>Название, направление и тип проекта можно изменить в справочнике. Связанные задачи обновятся автоматически.</p><button class="btn" data-nav="projects">Настроить проекты</button></div><div class="card"><h2>Данные под вашим контролем</h2><p>Записи сохраняются в этом браузере. Для переноса на другой компьютер скачайте JSON и импортируйте его там.</p><div class="toolbar"><button class="btn primary" data-export-json>Скачать резервную копию</button><button class="btn" data-nav="reports">Импорт и выгрузка</button></div></div></div><div class="card section"><div class="section-head"><div><h2>Шаблоны задач</h2><p class="muted">Откройте задачу → «В шаблоны». При добавлении новой задачи выберите готовый шаблон.</p></div></div>${state.templates.length?state.templates.map(t=>`<div class="template-row"><div><b>${escapeHtml(t.title)}</b><p class="muted">${escapeHtml(projectName(t.projectCode))}</p></div><button class="btn small danger" data-delete-template="${escapeHtml(t.id)}">Удалить шаблон</button></div>`).join(''):'<div class="empty compact">Пока нет шаблонов. Сохраните первую типовую задачу из её карточки.</div>'}</div>`;}
function renderEditProjectModal(){const p=state.projects.find(p=>p.code===ui.editProject);return `<div class="modal-backdrop" data-close-modal><div class="modal" onclick="event.stopPropagation()"><h3>Изменить проект ${escapeHtml(p.code)}</h3><div class="form-grid"><div class="field wide"><label for="editProjectName">Название</label><input id="editProjectName" value="${escapeHtml(p.name)}"></div><div class="field"><label for="editProjectDirection">Направление</label><select id="editProjectDirection">${options(DIRECTIONS,p.direction,null)}</select></div><div class="field"><label for="editProjectType">Тип</label><select id="editProjectType">${options(['Проект','Постоянная работа'],p.type,null)}</select></div></div><p class="muted">Направление изменится у всех задач проекта, включая их историю.</p><div class="modal-actions"><button class="btn" data-close-modal>Отмена</button><button class="btn primary" data-update-project>Сохранить</button></div></div></div>`;}
function bindUpgrade(){
 document.querySelector('[data-toggle-menu]')?.addEventListener('click',()=>{if(matchMedia('(max-width: 760px)').matches)ui.mobileMenu=false;else {ui.collapsed=!ui.collapsed;localStorage.setItem('supervision-menu-collapsed',String(ui.collapsed));}render();});
 document.querySelector('[data-mobile-open]')?.addEventListener('click',()=>{ui.mobileMenu=true;render();});
 document.querySelector('[data-mobile-close]')?.addEventListener('click',()=>{ui.mobileMenu=false;render();});
 ['overviewSnapshot','crmSnapshotSelect'].forEach(id=>document.getElementById(id)?.addEventListener('change',e=>{ui.crmId=e.target.value;render();}));
 document.querySelectorAll('[data-new-snapshot]').forEach(el=>el.onclick=()=>{ui.modal='snapshot';render();});
 document.querySelectorAll('[data-open-snapshot]').forEach(el=>el.onclick=()=>{const c=state.crm.find(x=>x.id===el.dataset.openSnapshot);ui.month=c.month;ui.crmId=c.id;ui.page='crm';render();});
 document.getElementById('snapshotForm')?.addEventListener('submit',e=>{e.preventDefault();const date=v('newSnapshotDate');if(date.slice(0,7)!==ui.month)return alert('Дата должна быть в выбранном месяце.');if(crmSnapshots(ui.month).some(c=>c.snapshotDate===date))return alert('Срез на эту дату уже существует. Выберите его в списке для редактирования.');const prev=crmForMonth(ui.month);const c={id:uid(),month:ui.month,snapshotDate:date,stages:document.getElementById('copySnapshot')?.checked?clone(prev.stages):Object.fromEntries(CRM_STAGES.map(s=>[s,''])),state:'',changes:'',problems:'',nextStep:''};state.crm.push(c);saveState();ui.crmId=c.id;ui.modal=null;ui.page='crm';render();});
 document.querySelectorAll('[data-edit-project]').forEach(el=>el.onclick=()=>{ui.editProject=el.dataset.editProject;ui.modal='editProject';render();});
 document.querySelector('[data-update-project]')?.addEventListener('click',()=>{const p=state.projects.find(p=>p.code===ui.editProject);if(!v('editProjectName').trim())return alert('Введите название проекта.');Object.assign(p,{name:v('editProjectName').trim(),direction:v('editProjectDirection'),type:v('editProjectType')});state.tasks.filter(t=>t.projectCode===p.code).forEach(t=>t.direction=p.direction);state.templates.filter(t=>t.projectCode===p.code).forEach(t=>t.direction=p.direction);saveState();ui.modal=null;render();});
 document.querySelector('[data-save-template]')?.addEventListener('click',()=>{if(!v('taskTitle').trim())return alert('Укажите название.');const t={id:uid(),title:v('taskTitle').trim(),direction:v('taskDirection'),projectCode:v('taskProject'),planned:v('taskPlanned'),priority:v('taskPriority'),recurring:document.getElementById('taskRecurring').checked};state.templates.push(t);saveState();alert('Шаблон сохранён. Он доступен при создании новой задачи.');});
 document.getElementById('taskTemplate')?.addEventListener('change',e=>{const t=state.templates.find(t=>t.id===e.target.value);if(!t)return;const p=state.projects.find(p=>p.code===t.projectCode);if(!p)return alert('Проект шаблона удалён. Создайте новый шаблон.');document.getElementById('taskDirection').value=p.direction;document.getElementById('taskDirection').dispatchEvent(new Event('change'));document.getElementById('taskProject').value=p.code;document.getElementById('taskProject').dispatchEvent(new Event('change'));document.getElementById('taskTitle').value=t.title;document.getElementById('taskPlanned').value=t.planned;document.getElementById('taskPriority').value=t.priority;document.getElementById('taskRecurring').checked=t.recurring;});
 document.querySelectorAll('[data-delete-template]').forEach(el=>el.onclick=()=>{if(confirm('Удалить шаблон? Созданные задачи останутся.')){state.templates=state.templates.filter(t=>t.id!==el.dataset.deleteTemplate);saveState();render();}});
 // Labels in legacy forms are linked without changing existing field IDs.
 document.querySelectorAll('.field').forEach(f=>{const label=f.querySelector('label'),input=f.querySelector('input,select,textarea');if(label&&input?.id)label.htmlFor=input.id;});
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&(ui.modal||ui.mobileMenu)){ui.modal=null;ui.mobileMenu=false;render();}});
render();
