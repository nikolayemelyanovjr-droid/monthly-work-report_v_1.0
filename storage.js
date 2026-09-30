/* Сохраняем прежний ключ: обновление файлов на том же адресе сохраняет базу. */
(function(root){
'use strict';
const KEY='work-supervision-v1',BACKUPS='zadachnik-backups-v3';
let state=null,error='',listeners=[],lastRaw=null;
function notify(){listeners.forEach(fn=>fn(state,error));}
function backup(raw,reason){
 if(!raw)return;
 let list=[];try{list=JSON.parse(localStorage.getItem(BACKUPS)||'[]');if(!Array.isArray(list))list=[];}catch{}
 list.unshift({id:Z.uid(),createdAt:new Date().toISOString(),reason,raw});
 localStorage.setItem(BACKUPS,JSON.stringify(list.slice(0,5)));
}
function init(seed){
 try{
  const raw=localStorage.getItem(KEY);lastRaw=raw;
  const source=raw?JSON.parse(raw):Z.clone(seed);state=Z.migrate(source);
  if(raw&&source.version!==Z.VERSION){backup(raw,'Перед обновлением до 3.0');localStorage.setItem(KEY,JSON.stringify(state));lastRaw=JSON.stringify(state);}
  if(!raw){localStorage.setItem(KEY,JSON.stringify(state));lastRaw=JSON.stringify(state);}
 }catch(e){error='Не удалось открыть данные: '+e.message;state=null;}
 return {state,error};
}
function transaction(fn){
 if(!state)throw Error('Сначала восстановите данные.');
 try{
  const raw=localStorage.getItem(KEY);
  if(raw!==lastRaw){if(!raw)throw Error('База была удалена в другой вкладке. Сначала сохраните резервную копию.');state=Z.migrate(JSON.parse(raw));lastRaw=raw;}
  const next=Z.clone(state);const value=fn(next);Z.validate(next);next.revision=(next.revision||0)+1;next.savedAt=new Date().toISOString();
  const serialized=JSON.stringify(next);localStorage.setItem(KEY,serialized);state=next;lastRaw=serialized;error='';notify();return value;
 }catch(e){error=e.name==='QuotaExceededError'?'Не хватает места для сохранения. Скачайте копию данных и освободите место.':e.message;throw Error(error);}
}
function replace(next,reason='Перед импортом'){
 Z.validate(next);
 const raw=localStorage.getItem(KEY);backup(raw,reason);
 const serial=JSON.stringify(next);localStorage.setItem(KEY,serial);state=Z.clone(next);lastRaw=serial;error='';notify();
}
function backups(){try{return JSON.parse(localStorage.getItem(BACKUPS)||'[]');}catch{return[];}}
function subscribe(fn){listeners.push(fn);}
root.addEventListener('storage',e=>{if(e.key!==KEY)return;try{if(!e.newValue)throw Error('Данные удалены в другой вкладке.');const next=Z.migrate(JSON.parse(e.newValue));state=next;lastRaw=e.newValue;error='';}catch(err){error='Другая вкладка: '+err.message;}notify();});
root.ZStore={KEY,init,transaction,replace,backups,backup,subscribe,get state(){return state;},get error(){return error;},raw:()=>localStorage.getItem(KEY)};
})(window);
