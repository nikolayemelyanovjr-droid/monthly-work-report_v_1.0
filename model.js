/* Задачник 3.0 — общие расчёты и проверка данных. Не зависит от интерфейса. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.Z=api;})(typeof globalThis==='object'?globalThis:this,function(){
'use strict';
const VERSION=3;
const DIRECTIONS=['ПСТБИ','Школы','Олимпиады'];
const CRM_STAGES=['неразобранные','нет связи','думает','жду обратной связи','ждет собеседования','к владыке','не прошел фильтр','Прошел собеседование','в беседе абитуриентов','не в ПСТБИ','28+'];
const STATUSES=['Запланировано','В работе','Ожидание','К согласованию','Заблокировано','Завершено','Провалено','Отменено'];
const CLOSED=['Завершено','Провалено','Отменено'];
const TYPES=['Задача','Группа задач','Предложение'];
const FIELDS=['title','projectCode','parentId','type','status','priority','startDate','deadline','completedAt','result','blocker','nextStep','archived'];
const clone=x=>JSON.parse(JSON.stringify(x));
const uid=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function validDate(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00Z');return !Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===s;}
function addDays(s,n){if(!validDate(s))throw Error('Некорректная дата.');const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
function calendarMonth(s=today()){const d=new Date(s+'T12:00:00Z');return [s.slice(0,7)+'-01',new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0,12)).toISOString().slice(0,10)];}
const between=(d,a,b)=>validDate(d)&&d>=a&&d<=b;
function period(a,b){if(!validDate(a)||!validDate(b))throw Error('Укажите обе даты периода.');if(a>b)throw Error('Конец периода не может быть раньше начала.');}
const isActive=t=>!CLOSED.includes(t.status)&&!t.archived;
const isWork=t=>t.type==='Задача';
const pick=t=>Object.fromEntries(FIELDS.map(k=>[k,k==='archived'?!!t[k]:String(t[k]??'')]));
const task=(d,id)=>d.tasks.find(t=>t.id===id);
const project=(d,code)=>d.projects.find(p=>p.code===code);
const direction=(d,t)=>project(d,t.projectCode)?.direction||'';
const sortEvents=events=>[...events].sort((a,b)=>a.date.localeCompare(b.date)||a.recordedAt.localeCompare(b.recordedAt)||(a.order||0)-(b.order||0));
function taskAt(t,date){
 if(t.effectiveFrom&&date<t.effectiveFrom)return null;
 let result={...t,...clone(t.baseline)};
 for(const e of sortEvents(t.history||[]))if(e.date<=date)Object.assign(result,e.changes);
 return result;
}
function taskAtOutcome(t,event,to){
 let view={...t,...clone(t.baseline)},found=false;
 for(const e of sortEvents(t.history||[])){
  if(e.date>to)break;
  if(found&&e.id!==event.id&&'status'in e.changes)break;
  Object.assign(view,e.changes);
  if(e.id===event.id)found=true;
 }
 return view;
}
function refreshTask(t,now=today()){const x=taskAt(t,now);if(x)Object.assign(t,pick(x));}
function descendants(data,id){const seen=new Set(),queue=[id];while(queue.length){const p=queue.shift();for(const t of data.tasks)if(t.parentId===p&&!seen.has(t.id)){seen.add(t.id);queue.push(t.id);}}return seen;}
function checkParent(data,id,parentId){if(!parentId)return;if(!task(data,parentId))throw Error('Родительская задача не найдена.');if(parentId===id||descendants(data,id).has(parentId))throw Error('Нельзя назначить родителем саму задачу или её потомка.');}
function validateTask(data,t){
 if(!t.id||typeof t.id!=='string'||t.id.length>120)throw Error('У задачи должен быть ID длиной до 120 символов.');
 if(!t.title?.trim())throw Error('Введите название задачи.');
 if(!project(data,t.projectCode))throw Error('Выберите существующий проект.');
 if(!STATUSES.includes(t.status)||!TYPES.includes(t.type))throw Error('Неизвестный статус или тип задачи.');
 if(!['','Высокий','Средний','Низкий'].includes(t.priority||''))throw Error('Неизвестный приоритет.');
 for(const k of ['startDate','deadline','completedAt','createdAt','effectiveFrom'])if(t[k]&&!validDate(t[k]))throw Error('Некорректная дата задачи: '+k);
 if(t.startDate&&t.deadline&&t.startDate>t.deadline)throw Error('Дедлайн не может быть раньше начала задачи.');
 if(t.completedAt&&t.startDate&&t.completedAt<t.startDate)throw Error('Завершение не может быть раньше начала задачи.');
 if(!CLOSED.includes(t.status)&&t.completedAt)throw Error('У активной задачи не должно быть текущей даты завершения.');
 checkParent(data,t.id,t.parentId);
}
function newTask(data,input,now=today()){
 const t={id:input.id||uid(),...pick({type:'Задача',status:'Запланировано',...input}),createdAt:now,updatedAt:now,effectiveFrom:input.startDate&&input.startDate<now?input.startDate:now,history:[],historyIncomplete:false};
 if(task(data,t.id))throw Error('Такой ID уже существует.');
 if(CLOSED.includes(t.status)){t.completedAt=t.completedAt||now;if(t.completedAt>now)throw Error('Фактическое завершение не может быть в будущем.');}
 else t.completedAt='';
 if(t.completedAt&&t.completedAt<t.effectiveFrom)t.effectiveFrom=t.completedAt;
 validateTask(data,t);
 t.baseline=pick(t);
 if(CLOSED.includes(t.status)){const changes={status:t.status,completedAt:t.completedAt,result:t.result};Object.assign(t.baseline,{status:'Запланировано',completedAt:'',result:''});t.history.push({id:uid(),date:t.completedAt,recordedAt:new Date().toISOString(),order:0,changes});}
 data.tasks.push(t);return t;
}
function patchTask(data,id,changes,date=today(),now=today()){
 const t=task(data,id);if(!t)throw Error('Задача не найдена.');
 if(!validDate(date)||date>now)throw Error('Дата фактического изменения должна быть не позже сегодня.');
 if(t.effectiveFrom&&date<t.effectiveFrom)throw Error('Изменение не может быть раньше появления задачи.');
 const clean=Object.fromEntries(Object.entries(changes).filter(([k])=>FIELDS.includes(k)));
 const old=taskAt(t,date)||t;const next={...old,...clean};
 if('status'in clean){if(CLOSED.includes(next.status))next.completedAt=clean.completedAt||date;else next.completedAt='';clean.completedAt=next.completedAt;}
 if('completedAt'in clean&&next.completedAt){if(next.completedAt>now)throw Error('Фактическое завершение не может быть в будущем.');if(!CLOSED.includes(next.status))throw Error('Сначала выберите завершённый статус.');}
 validateTask(data,next);
 const actual=Object.fromEntries(Object.entries(clean).filter(([k,v])=>v!==old[k]));
 if(!Object.keys(actual).length)return t;
 const e={id:uid(),date,recordedAt:new Date().toISOString(),order:t.history.length,changes:actual};
 // Объединяем последовательный ввод одного текстового поля, сохраняя переходы статусов.
 const last=t.history.at(-1),keys=Object.keys(actual);
 if(last&&last.date===date&&keys.length===1&&!['status','completedAt','archived'].includes(keys[0])&&Object.keys(last.changes).length===1&&keys[0]in last.changes)Object.assign(last,{changes:actual,recordedAt:e.recordedAt});
 else t.history.push(e);
 refreshTask(t,now);t.updatedAt=now;
 // Запретить несовместимые состояния также в последующих исторических точках.
 for(const day of new Set(t.history.map(h=>h.date))){const view=taskAt(t,day);validateTask(data,view);}
 return t;
}
function setClosureDate(data,id,date,now=today()){
 const t=task(data,id);if(!t||!CLOSED.includes(t.status))throw Error('Укажите завершённый статус.');
 if(!validDate(date)||date>now||t.startDate&&date<t.startDate||t.effectiveFrom&&date<t.effectiveFrom)throw Error('Проверьте дату завершения.');
 const events=sortEvents(t.history);const e=[...events].reverse().find(e=>'status'in e.changes);
 if(e&&CLOSED.includes(e.changes.status)){
   const prior=events.slice(0,events.indexOf(e)).at(-1);
   if(prior&&date<prior.date)throw Error('Завершение раньше предыдущего события. Уточните историю задачи.');
   e.date=date;e.changes.completedAt=date;e.recordedAt=new Date().toISOString();delete e.source;
 }else t.history.push({id:uid(),date,recordedAt:new Date().toISOString(),order:t.history.length,changes:{status:t.status,completedAt:date}});
 refreshTask(t,now);t.unknownCompletionMonth='';t.updatedAt=now;return t;
}
function addUpdate(data,taskId,date,text,now=today()){
 const t=task(data,taskId);if(!t)throw Error('Задача не найдена.');
 if(!validDate(date)||date>now)throw Error('Укажите фактическую дату не позже сегодня.');
 if(t.effectiveFrom&&date<t.effectiveFrom)throw Error('Запись не может быть раньше появления задачи.');
 if(!text.trim())throw Error('Опишите, что сделано.');
 const u={id:uid(),taskId,date,text:text.trim(),createdAt:new Date().toISOString()};data.updates.push(u);return u;
}
function crmTotal(c){if(!c)return null;const vals=CRM_STAGES.map(k=>c.stages[k]);return vals.every(v=>Number.isInteger(v)&&v>=0)?vals.reduce((a,b)=>a+b,0):null;}
function latestCrm(data,date=today()){return [...data.crm].filter(c=>validDate(c.snapshotDate)&&c.snapshotDate<=date).sort((a,b)=>b.snapshotDate.localeCompare(a.snapshotDate)||String(b.recordedAt||b.id).localeCompare(String(a.recordedAt||a.id)))[0]||null;}
function validateCrm(data,c,now=today()){
 if(!c.snapshotDate&&!c.legacyUndated)throw Error('Укажите дату среза.');
 if(c.snapshotDate&&(!validDate(c.snapshotDate)||c.snapshotDate>now))throw Error('Дата среза должна быть не позже сегодня.');
 if(c.snapshotDate&&data.crm.some(x=>x.id!==c.id&&x.snapshotDate===c.snapshotDate&&!x.legacyDuplicate&&!c.legacyDuplicate))throw Error('Срез на эту дату уже существует. Откройте его для изменения.');
 for(const k of CRM_STAGES){const v=c.stages[k];if(v!==''&&v!==null&&(!Number.isSafeInteger(v)||v<0))throw Error('Количество сделок — целое неотрицательное число; пустое поле означает отсутствие данных.');}
}
function newCrm(data,date,copy=false,now=today()){
 const prev=latestCrm(data,date);const c={id:uid(),snapshotDate:date,month:date.slice(0,7),stages:copy&&prev?clone(prev.stages):Object.fromEntries(CRM_STAGES.map(k=>[k,''])),state:'',changes:'',problems:'',nextStep:'',recordedAt:new Date().toISOString()};
 validateCrm(data,c,now);data.crm.push(c);return c;
}
function validateMeeting(m){
 if(!m.date&&!m.legacyUndated)throw Error('Укажите дату супервизии.');
 for(const k of ['date','periodStart','nextMeeting'])if(m[k]&&!validDate(m[k]))throw Error('Некорректная дата супервизии.');
 if(m.date&&m.periodStart&&m.periodStart>m.date)throw Error('Начало отчёта не может быть позже супервизии.');
 if(m.date&&m.nextMeeting&&m.nextMeeting<=m.date)throw Error('Следующая супервизия должна быть позже текущей.');
}
function metrics(data,from,to){
 period(from,to);
 const views=data.tasks.map(t=>taskAt(t,to)).filter(t=>t&&isWork(t));
 const completed=[],failed=[],cancelled=[];
 for(const t of data.tasks){
  // Одну задачу учитываем не больше одного раза в каждом исходе за период.
  for(const [status,list]of [['Завершено',completed],['Провалено',failed],['Отменено',cancelled]]){
   const e=sortEvents(t.history||[]).filter(e=>between(e.date,from,to)&&e.changes.status===status&&e.source!=='observed').at(-1);
   if(e){const view=taskAtOutcome(t,e,to);if(view&&isWork(view))list.push({...view,eventDate:e.date});}
  }
 }
 const active=views.filter(isActive);
 const updates=data.updates.filter(u=>between(u.date,from,to));
 const touched=views.filter(t=>updates.some(u=>u.taskId===t.id)||data.tasks.find(x=>x.id===t.id)?.history.some(h=>between(h.date,from,to)));
 const uncertain=data.tasks.filter(t=>t.historyIncomplete&&(!t.historyKnownFrom||from<t.historyKnownFrom));
 const undated=data.tasks.filter(t=>t.unknownCompletionMonth&&t.unknownCompletionMonth>=from.slice(0,7)&&t.unknownCompletionMonth<=to.slice(0,7));
 return {completed,failed,cancelled,active,updates,touched,uncertain,undated};
}
function buildReport(data,from,to,meetingId='',now=today()){
 const m=metrics(data,from,to),meeting=clone(data.meetings.find(x=>x.id===meetingId)||{});
 const decorate=t=>({id:t.id,...pick(t),eventDate:t.eventDate||'',unknownCompletionMonth:t.unknownCompletionMonth||'',projectName:project(data,t.projectCode)?.name||t.projectCode,direction:direction(data,t),updates:clone(m.updates.filter(u=>u.taskId===t.id))});
 const cycle=data.cycles.find(c=>c.startDate===addDays(to,1));
 return {from,to,generatedAt:new Date().toISOString(),asOf:now,meeting,completed:m.completed.map(decorate),failed:m.failed.map(decorate),cancelled:m.cancelled.map(decorate),active:m.active.map(decorate),touched:m.touched.length,updateCount:m.updates.length,uncertainCount:m.uncertain.length,undated:m.undated.map(decorate),crmStart:clone(latestCrm(data,from)),crmEnd:clone(latestCrm(data,to)),plan:cycle?{...clone(cycle),tasks:cycle.taskIds.map(id=>task(data,id)).filter(Boolean).map(t=>({id:t.id,title:t.title,deadline:t.deadline}))}:null};
}
function saveReport(data,from,to,meetingId='',now=today()){
 const report={id:uid(),from,to,meetingId,version:data.reports.filter(r=>r.from===from&&r.to===to&&r.meetingId===meetingId).length+1,savedAt:new Date().toISOString(),data:buildReport(data,from,to,meetingId,now)};data.reports.push(report);return report;
}
function validateRaw(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||!Array.isArray(raw.projects)||!Array.isArray(raw.tasks)||!Array.isArray(raw.crm)||!Array.isArray(raw.meetings))throw Error('Это не резервная копия Задачника: нужны проекты, задачи, CRM и супервизии.');
 if(raw.version!==undefined&&![1,2,3].includes(raw.version))throw Error('Эта версия файла не поддерживается.');
 for(const key of ['updates','cycles','reports','taskMonths'])if(raw[key]!==undefined&&!Array.isArray(raw[key]))throw Error('Некорректный список: '+key);
 const unique=(rows,key,label)=>{const ids=new Set();for(const x of rows){if(!x||typeof x!=='object'||typeof x[key]!=='string'||!x[key]||ids.has(x[key]))throw Error('Пустой или повторяющийся идентификатор: '+label);ids.add(x[key]);}};
 unique(raw.projects,'code','проект');unique(raw.tasks,'id','задача');
 if(raw.version===3){for(const key of ['updates','cycles','crm','meetings','reports'])unique(raw[key]||[],'id',key);}
 for(const p of raw.projects)if(!p.name?.trim())throw Error('У проекта нет названия.');
}
function validate(data,now=today()){
 validateRaw(data);
 for(const t of data.tasks){validateTask(data,t);if(!t.baseline||!Array.isArray(t.history))throw Error('Отсутствует история задачи.');
  for(const [key,val]of Object.entries(t.baseline))if(!FIELDS.includes(key)||(key==='archived'?typeof val!=='boolean':typeof val!=='string'))throw Error('Некорректное начальное состояние задачи.');
  if(!STATUSES.includes(t.baseline.status)||!TYPES.includes(t.baseline.type))throw Error('Некорректное начальное состояние задачи.');
  const eventIds=new Set();
  for(const e of t.history){if(!e.id||eventIds.has(e.id)||!validDate(e.date)||e.date>now||typeof e.recordedAt!=='string'||!e.changes||Object.keys(e.changes).some(k=>!FIELDS.includes(k)))throw Error('Некорректное событие в истории задачи.');eventIds.add(e.id);if(e.changes.status&&!STATUSES.includes(e.changes.status))throw Error('Некорректный статус в истории.');for(const [key,val]of Object.entries(e.changes))if(key==='archived'?typeof val!=='boolean':typeof val!=='string')throw Error('Некорректное значение в истории задачи.');}
 }
 for(const u of data.updates){if(!task(data,u.taskId)||!u.text?.trim()||u.date&&!validDate(u.date)||!u.date&&!u.legacyMonth)throw Error('Некорректная запись хода работы.');}
 for(const c of data.cycles){period(c.startDate,c.endDate);if(!Array.isArray(c.taskIds)||c.taskIds.some(id=>!task(data,id)))throw Error('В плане указана неизвестная задача.');}
 for(const c of data.crm)validateCrm(data,c,now);
 for(const m of data.meetings)validateMeeting(m);
 for(const r of data.reports){period(r.from,r.to);if(!r.data||!Array.isArray(r.data.completed)||!Array.isArray(r.data.active)||!Array.isArray(r.data.failed)||!Array.isArray(r.data.cancelled)||!Array.isArray(r.data.undated))throw Error('Повреждён сохранённый отчёт.');period(r.data.from,r.data.to);if(r.from!==r.data.from||r.to!==r.data.to||!Number.isInteger(r.version)||r.version<1||typeof r.savedAt!=='string')throw Error('Повреждены даты или версия отчёта.');for(const list of ['completed','active','failed','cancelled','undated'])for(const row of r.data[list])if(!row||typeof row.id!=='string'||typeof row.title!=='string'||!STATUSES.includes(row.status)||!Array.isArray(row.updates)||row.updates.some(u=>!u||typeof u.text!=='string'||!validDate(u.date)))throw Error('Повреждена строка отчёта.');for(const key of ['crmStart','crmEnd'])if(r.data[key]&&(!validDate(r.data[key].snapshotDate)||!r.data[key].stages||CRM_STAGES.some(k=>{const v=r.data[key].stages[k];return v!==''&&v!==null&&(!Number.isSafeInteger(v)||v<0);})))throw Error('Повреждён срез в отчёте.');if(r.data.plan&&(!Array.isArray(r.data.plan.tasks)||r.data.plan.tasks.some(t=>!t||typeof t.title!=='string')))throw Error('Повреждён план в отчёте.');}
 return data;
}
function migrate(raw,now=today()){
 validateRaw(raw);const d=clone(raw);if(d.version===VERSION)return validate(d,now);
 const warnings=[];const warn=s=>{if(!warnings.includes(s))warnings.push(s);};
 for(const k of ['updates','cycles','reports','taskMonths'])d[k]=d[k]||[];
 d.projects.forEach(p=>{p.direction=p.direction||'';p.type=p.type||'Проект';});
 const monthly=d.taskMonths;
 for(const t of d.tasks){
  const records=monthly.filter(r=>r.taskId===t.id).sort((a,b)=>(a.month||'').localeCompare(b.month||''));const last=records.at(-1),done=[...records].reverse().find(r=>r.monthResult==='Готово'||r.status==='Завершено');
  const fallback=done&&(done.deadline?.startsWith(done.month)?done.deadline:done.month+'-28');
  t.status=t.status||last?.status||'Запланировано';
  if(last?.monthResult==='Готово'&&(t.status==='Запланировано'||t.status==='В работе'))t.status='Завершено';
  if(last?.monthResult==='Не сделано')t.status='Провалено';
  if(last?.monthResult==='Снято')t.status='Отменено';
  if(t.status==='Снято')t.status='Отменено';
  if(!t.projectCode&&t.direction)t.projectCode=d.projects.find(p=>p.direction===t.direction)?.code||'';
  Object.assign(t,{type:t.type||'Задача',parentId:t.parentId||'',priority:t.priority??last?.priority??'',startDate:t.startDate||'',deadline:t.deadline??last?.deadline??'',completedAt:t.completedAt||'',result:t.result??last?.actual??'',blocker:t.blocker??last?.blocker??'',nextStep:t.nextStep??last?.nextStep??'',archived:!!t.archived});
  if(records.length){
   if(t.completedAt===fallback||!t.completedAt&&CLOSED.includes(t.status)){t.unknownCompletionMonth=done?.month||last?.month||'';t.completedAt='';warn('У месячных итогов нет подтверждённой точной даты. Уточните её в карточках.');}
   if(t.startDate===records[0].month+'-01'){t.startDate='';t.createdAt='';}
   if(!d.updates.some(u=>u.taskId===t.id))for(const r of records){const text=[r.actual,r.blocker&&'Проблема: '+r.blocker,r.nextStep&&'Дальше: '+r.nextStep].filter(Boolean).join(' · ');if(text)d.updates.push({id:uid(),taskId:t.id,date:'',legacyMonth:r.month,text,createdAt:new Date().toISOString()});}
   else for(const u of d.updates.filter(u=>u.taskId===t.id)){const r=records.find(r=>u.date===r.month+'-28'||u.date===r.deadline);if(r){u.legacyMonth=r.month;u.date='';warn('Даты старых месячных заметок требуют уточнения.');}}
  }
  if(!CLOSED.includes(t.status))t.completedAt='';
  if(t.completedAt>now){t.legacyCompletionDate=t.completedAt;t.unknownCompletionMonth=t.completedAt.slice(0,7);t.completedAt='';warn('Будущие даты завершения требуют подтверждения.');}
  t.createdAt=t.createdAt||t.startDate||'';t.effectiveFrom=t.createdAt||t.startDate||'';t.updatedAt=t.updatedAt||now;
  t.historyIncomplete=true;t.historyKnownFrom=now;t.history=[];t.baseline=pick(t);
  if(CLOSED.includes(t.status)&&t.completedAt){const changes={status:t.status,completedAt:t.completedAt,result:t.result};Object.assign(t.baseline,{status:'В работе',completedAt:'',result:''});t.history.push({id:uid(),date:t.completedAt,recordedAt:new Date().toISOString(),order:0,source:'legacy',changes});}
  else if(CLOSED.includes(t.status)){t.unknownCompletionMonth=t.unknownCompletionMonth||'';t.baseline.status='Ожидание';t.baseline.result='';t.history.push({id:uid(),date:now,recordedAt:new Date().toISOString(),order:0,source:'observed',changes:{status:t.status,result:t.result,completedAt:''}});}
  if(t.startDate&&t.deadline&&t.startDate>t.deadline){t.legacyStartDate=t.startDate;t.startDate='';t.baseline.startDate='';warn('Несогласованные старые даты начала сохранены для проверки.');}
  if(t.completedAt&&t.startDate&&t.completedAt<t.startDate){t.legacyStartDate=t.startDate;t.startDate='';t.baseline.startDate='';warn('Несогласованные старые даты начала сохранены для проверки.');}
 }
 if(!d.cycles.length&&monthly.length){for(const month of [...new Set(monthly.map(r=>r.month))]){if(!/^\d{4}-\d{2}$/.test(month||'')||!validDate(month+'-01'))continue;const [startDate,endDate]=calendarMonth(month+'-01');d.cycles.push({id:uid(),startDate,endDate,focus:'',notes:'Перенесено из месячного плана',taskIds:[...new Set(monthly.filter(r=>r.month===month&&task(d,r.taskId)).map(r=>r.taskId))]});}}
 // Сохраняем записи со спорными связями; размыкаем только связь, исходное значение остаётся.
 for(const t of d.tasks){try{checkParent(d,t.id,t.parentId);}catch{t.legacyParentId=t.parentId;t.parentId='';t.baseline.parentId='';warn('Некорректные родительские связи разомкнуты; прежние ID сохранены.');}}
 for(const m of d.meetings){m.id=m.id||uid();m.date=m.date||'';if(m.month&&m.date===m.month+'-28'){m.legacyMonth=m.month;m.date='';}if(!m.date){m.legacyUndated=true;m.legacyMonth=m.legacyMonth||m.month||'';warn('У старых супервизий нужно уточнить дату.');}m.periodStart=m.periodStart||'';m.nextMeeting=m.nextMeeting||'';if(m.date&&m.periodStart>m.date){m.legacyPeriodStart=m.periodStart;m.periodStart='';}if(m.date&&m.nextMeeting&&m.nextMeeting<=m.date){m.legacyNextMeeting=m.nextMeeting;m.nextMeeting='';}}
 const ids=new Set(),dates=new Set();
 for(const c of d.crm){if(!c.id||ids.has(c.id))c.id=uid();ids.add(c.id);c.stages={...Object.fromEntries(CRM_STAGES.map(k=>[k,''])),...c.stages};
  if(c.snapshotDate&&dates.has(c.snapshotDate)){c.legacyDuplicate=true;warn('Есть старые срезы на одну дату. Сравнение использует последний из них; проверьте их в CRM.');}dates.add(c.snapshotDate);
  if(!c.snapshotDate){c.snapshotDate='';c.legacyUndated=true;}
  if(c.snapshotDate>now){c.legacyFutureDate=c.snapshotDate;c.snapshotDate='';c.legacyUndated=true;warn('Будущие срезы требуют подтверждения фактической даты.');}
  for(const k of CRM_STAGES){const v=c.stages[k];if(v===''||v===null)continue;if(Number.isSafeInteger(Number(v))&&Number(v)>=0)c.stages[k]=Number(v);else{c.legacyValues={...c.legacyValues,[k]:v};c.stages[k]='';warn('Некорректные количества CRM сохранены отдельно; уточните их.');}}
  c.recordedAt=c.recordedAt||String(d.crm.indexOf(c)).padStart(6,'0');
 }
 d.version=VERSION;d.migratedAt=now;d.migrationWarnings=[...(d.migrationWarnings||[]),...warnings];d.revision=0;
 warn('История до обновления неполна: прежние статусы и поля не были сохранены. Такие отчёты отмечены как восстановленные.');d.migrationWarnings=[...new Set([...d.migrationWarnings,...warnings])];
 return validate(d,now);
}
return {VERSION,DIRECTIONS,CRM_STAGES,STATUSES,CLOSED,TYPES,FIELDS,clone,uid,today,validDate,addDays,calendarMonth,between,period,isActive,isWork,pick,task,project,direction,sortEvents,taskAt,descendants,checkParent,validateTask,newTask,patchTask,setClosureDate,addUpdate,crmTotal,latestCrm,validateCrm,newCrm,validateMeeting,metrics,buildReport,saveReport,validateRaw,validate,migrate};
});
