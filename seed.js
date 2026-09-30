const ZSEED = {
  version: 2,
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
    {id:'1.1-01',projectCode:'1.1',title:'Поддерживать базу CRM и фиксировать состояние базы и сделки по стадиям.',parentId:'',type:'Задача',status:'В работе',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'Заполнять срезы CRM по мере необходимости.',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'1.2.1-01',projectCode:'1.2.1',title:'Провести запланированное собрание по трёхдневному практикуму.',parentId:'',type:'Задача',status:'Запланировано',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'1.2.2-01',projectCode:'1.2.2',title:'Провести первый эфир.',parentId:'',type:'Задача',status:'Запланировано',priority:'',deadline:'2026-09-30',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'Провести первый эфир и зафиксировать результат.',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'1.2.3-01',projectCode:'1.2.3',title:'Провести день открытых дверей.',parentId:'',type:'Задача',status:'Запланировано',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'1.3.1-01',projectCode:'1.3.1',title:'Снять три ролика для сайта с Никитой.',parentId:'',type:'Задача',status:'Запланировано',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'1.3.2-01',projectCode:'1.3.2',title:'Начать работу над мерчем.',parentId:'',type:'Предложение',status:'К согласованию',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'2.1-01',projectCode:'2.1',title:'Провести встречу с И. В. Павлюткиным по конференции для руководителей школ.',parentId:'',type:'Задача',status:'Запланировано',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'2.2-01',projectCode:'2.2',title:'Привезти две школы в Лихов переулок.',parentId:'',type:'Группа задач',status:'В работе',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'2.2-01.1',projectCode:'2.2',title:'Организовать приезд первой школы в Лихов переулок.',parentId:'2.2-01',type:'Задача',status:'Запланировано',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'2.2-01.2',projectCode:'2.2',title:'Организовать приезд второй школы в Лихов переулок.',parentId:'2.2-01',type:'Задача',status:'Запланировано',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'2.3-01',projectCode:'2.3',title:'Провести два круглых стола с учителями-предметниками.',parentId:'',type:'Группа задач',status:'В работе',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'2.3-01.1',projectCode:'2.3',title:'Провести первый круглый стол с учителями-предметниками.',parentId:'2.3-01',type:'Задача',status:'Запланировано',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'2.3-01.2',projectCode:'2.3',title:'Провести второй круглый стол с учителями-предметниками.',parentId:'2.3-01',type:'Задача',status:'Запланировано',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'2.4-01',projectCode:'2.4',title:'Определить первый этап создания сайта / портала для школ-партнёров.',parentId:'',type:'Предложение',status:'К согласованию',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'},
    {id:'3.1-01',projectCode:'3.1',title:'Принять участие в мероприятии олимпиады.',parentId:'',type:'Задача',status:'Запланировано',priority:'',deadline:'',startDate:'2026-09-01',completedAt:'',result:'',blocker:'',nextStep:'',createdAt:'2026-09-01',updatedAt:'2026-09-01'}
  ],
  updates: [
    {id:'seed-u1',taskId:'1.1-01',date:'2026-09-28',text:'Работа с CRM ведётся в течение всего года.',createdAt:'2026-09-28'}
  ],
  cycles: [],
  crm: [{id:'seed-crm',month:'2026-09',snapshotDate:'',stages:Object.fromEntries(Z.CRM_STAGES.map(s=>[s,''])),state:'',changes:'',problems:'',nextStep:''}],
  meetings: [],
  templates: [],
  taskMonths: []
};

