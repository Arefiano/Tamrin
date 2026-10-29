/* Pure data rules. No DOM, network or storage. Kept inline in the published app. */
(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TamrinCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const clone = x => JSON.parse(JSON.stringify(x));
  const obj = x => x !== null && typeof x === 'object' && !Array.isArray(x);
  const canonical=x=>JSON.stringify(x,(_k,v)=>obj(v)?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))):v);
  const safeKey = k => !['__proto__', 'constructor', 'prototype'].includes(k);
  const digits = v => String(v == null ? '' : v).trim().replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[٫,،]/g, '.');
  function number(v, integer = false, max = 10000) {
    const s = digits(v);
    if (!s || !/^\d+(?:\.\d+)?$/.test(s)) return null;
    const n = Number(s);
    return Number.isFinite(n) && n >= 0 && n <= max && (!integer || Number.isInteger(n)) ? n : null;
  }
  const iso = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && Number.isFinite(Date.parse(s)) && new Date(s+'T12:00:00Z').toISOString().slice(0,10) === s;
  const text = (s, max = 10000) => { if (typeof s !== 'string' || s.length > max) throw Error('متن نامعتبر در پشتیبان'); return s; };
  function numeric(v, integer = false, max = 10000) {
    if (v === '' || v == null) return '';
    const n = number(v, integer, max); if (n == null) throw Error('عدد نامعتبر در پشتیبان'); return String(n);
  }
  function target(t) {
    if (!obj(t) || !Number.isInteger(t.s) || t.s < 1 || t.s > 100) throw Error('هدف نامعتبر');
    const pair = (a, max) => { if (!Array.isArray(a) || a.length !== 2 || a.some(n=> typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > max) || a[0] > a[1]) throw Error('بازهٔ نامعتبر'); return a.slice(); };
    return {s:t.s, r:pair(t.r,1000), rir:t.rir == null ? null : pair(t.rir, 10)};
  }
  function spec(o) {
    if (!obj(o)) throw Error('مشخصات حرکت نامعتبر');
    const clean=(v,max)=>{const t=text(v,max);if(/[<>\"']/.test(t))throw Error('مشخصات حرکت شامل متن نامعتبر است');return t;};
    const z = {name:clean(o.name,200)};if(!z.name.trim()||!safeKey(z.name))throw Error('نام حرکت نامعتبر');
    for (const k of ['db','lm','tb','pl','carry']) if (o[k]) z[k]=1;
    for (const k of ['unit','tag','pz']) if (o[k] != null) z[k]=clean(o[k],300);
    if(o.r){if(!Array.isArray(o.r)||o.r.length!==2||o.r.some(n=>!Number.isInteger(n)||n<1||n>1000)||o.r[0]>o.r[1])throw Error('بازهٔ حرکت نامعتبر');z.r=o.r.slice();}
    for (const k of ['rest','restLast']) if(o[k]) { if(!Array.isArray(o[k])||o[k].length!==2||o[k].some(n=>!Number.isInteger(n)||n<0||n>3600)||o[k][0]>o[k][1])throw Error('استراحت نامعتبر');z[k]=o[k].slice(); }
    return z;
  }
  function entry(e, depth = 0) {
    if (!obj(e) || !Array.isArray(e.sets) || e.sets.length > 100) throw Error('ست‌های پشتیبان نامعتبرند');
    const z = {alt:!!e.alt, rir:numeric(e.rir, true, 4), sets:e.sets.map(s=> {
      if (!obj(s)) throw Error('ست نامعتبر');
      const st={w:numeric(s.w), r:numeric(s.r, false, 1000), d:s.d?1:0};
      // Historic fractional distances are valid. Live repeat fields enforce integers.
      if(s.x) st.x=1;
      if(s.at!=null){const n=number(s.at,false,1e16);if(n==null)throw Error('زمان ست نامعتبر');st.at=n;}
      if(s.p!=null) st.p=numeric(s.p);
      if(s.b!=null && s.b!=='') st.b=Number(numeric(s.b,false,80));
      return st;
    })};
    if(Object.prototype.hasOwnProperty.call(e,'equipment'))z.equipment=e.equipment==null?null:equipment(e.equipment);
    if (e.t) z.t=target(e.t);
    if (e.spec) z.spec=spec(e.spec);
    if (e.variants && !depth) { z.variants={}; for(const k of ['main','alt'])if(e.variants[k])z.variants[k]=entry(e.variants[k],1); }
    return z;
  }
  function session(r, key) {
    if (!obj(r)||!iso(r.date)||!['sat','mon','wed','fri'].includes(r.day)||key!==r.date+'|'+r.day||!obj(r.ex)) throw Error('شناسه یا ساختار جلسه نامعتبر است');
    const z={date:r.date,day:r.day,ex:{},cardio:{},done:!!r.done,note:r.note==null?'':text(r.note),upd:0};
    for(const [id,e] of Object.entries(r.ex)) { if(!safeKey(id)||!/^\w[\w-]{0,79}$/.test(id))throw Error('شناسهٔ حرکت نامعتبر');z.ex[id]=entry(e); }
    for (const k of ['upd','t0','t1']) if(r[k]!=null) { if(typeof r[k]!=='number'||!Number.isFinite(r[k])||r[k]<0)throw Error('زمان نامعتبر');z[k]=r[k]; }
    for(const [k,max] of [['min',1440],['rpe',10],['rpm',10]])if(r[k]!=null){const n=number(r[k],true,max);if(n==null||n<1)throw Error('مدت یا سختی نامعتبر');z[k]=n;}
    if(r.cardio!=null && !obj(r.cardio))throw Error('هوازی نامعتبر');
    for(const k of ['min','inc','spd','inc2','spd2','inc1','spd1','lvl'])if(r.cardio?.[k]!=null)z.cardio[k]=numeric(r.cardio[k],false,k==='min'?1440:1000);
    for(const k of ['d','alt'])if(r.cardio?.[k])z.cardio[k]=true;
    if(r.ssOff){if(!obj(r.ssOff))throw Error('سوپرست نامعتبر');z.ssOff={};for(const [k,v]of Object.entries(r.ssOff)){if(!safeKey(k))throw Error('شناسه نامعتبر');if(v)z.ssOff[k]=1;}}
    return z;
  }
  function normalize(raw) {
    if(!obj(raw)||!obj(raw.sessions)||Object.keys(raw.sessions).length>10000)throw Error('این فایل پشتیبان دفتر تمرین نیست');
    if(raw.schema!=null && raw.schema>3)throw Error('این پشتیبان مربوط به نسخهٔ جدیدتری است؛ ابتدا اپ را به‌روزرسانی کن');
    const d={v:1,schema:3,sessions:{},deload:[],exNotes:{}};
    for(const [k,r] of Object.entries(raw.sessions))d.sessions[k]=session(r,k);
    if(raw.start!=null){if(!iso(raw.start))throw Error('تاریخ شروع نامعتبر');d.start=raw.start;}
    if(raw.deload!=null){if(!Array.isArray(raw.deload)||raw.deload.some(x=>!iso(x)))throw Error('هفتهٔ دی‌لود نامعتبر');d.deload=[...new Set(raw.deload)];}
    if(raw.exNotes!=null){if(!obj(raw.exNotes))throw Error('یادداشت نامعتبر');for(const [k,n]of Object.entries(raw.exNotes)){if(!safeKey(k)||k.length>250||!obj(n))throw Error('یادداشت نامعتبر');d.exNotes[k]={t:text(n.t),upd:number(n.upd,false,1e16)||0};}}
    for(const k of ['mig1','mig2','hideInstall','shortcutReady'])if(raw[k])d[k]=1;
    if(raw.tbBar!=null && raw.tbBar!==''){const n=number(raw.tbBar,false,80);if(n==null)throw Error('وزن میله نامعتبر');d.tbBar=n;}
    for(const k of ['lastBackup','lastShortcutAttempt','backupPending'])if(raw[k]!=null){const n=number(raw[k],false,1e16);if(n==null)throw Error('زمان پشتیبان نامعتبر');d[k]=n;}
    if(raw.backupMode)d.backupMode=['shortcut','manual'].includes(raw.backupMode)?raw.backupMode:'manual';
    if(raw.shortcutName!=null)d.shortcutName=text(raw.shortcutName,150);
    if(raw.equipment!=null){if(!obj(raw.equipment)||Object.keys(raw.equipment).length>1000)throw Error('مشخصات دستگاه نامعتبر');d.equipment={};for(const [k,v]of Object.entries(raw.equipment)){if(!safeKey(k)||k.length>200)throw Error('نام حرکت نامعتبر');d.equipment[k]=equipment(v);}}
    // Migrate the incoming state, independent of the receiving device's flags.
    if(!raw.mig2)for(const r of Object.values(d.sessions)){const e=r.ex.sat1;if(e&&!e.alt&&r.date<='2026-10-24')e.alt=true;}
    if(!raw.mig1)for(const r of Object.values(d.sessions)){const e=r.ex.mon1;if(e&&e.alt&&r.date<'2026-10-20')e.alt=false;}
    d.mig1=1;d.mig2=1;
    if(raw.conflicts!=null){if(!Array.isArray(raw.conflicts)||raw.conflicts.length>10000)throw Error('تعارض نامعتبر');d.conflicts=raw.conflicts.map(x=>{if(!obj(x)||typeof x.key!=='string')throw Error('تعارض نامعتبر');return {key:x.key,rec:session(x.rec,x.key),at:number(x.at,false,1e16)||0};});}
    return d;
  }
  function parseBackup(txt) {
    if(typeof txt!=='string'||txt.length>20*1024*1024)throw Error('فایل خالی یا بیش از حد بزرگ است');
    let o;try{o=JSON.parse(txt);}catch{throw Error('فایل پشتیبان قابل خواندن نیست');}
    if(!obj(o))throw Error('ساختار پشتیبان نامعتبر');
    if(o.app && o.app!=='daftar-tamrin')throw Error('این پشتیبان متعلق به دفتر تمرین نیست');
    return normalize(o.data || o);
  }
  function merge(current,incoming) {
    const out=clone(current);out.conflicts=out.conflicts||[];
    const counts={added:0,updated:0,conflicts:0};
    for(const [k,r]of Object.entries(incoming.sessions)){
      const old=out.sessions[k];if(!old){out.sessions[k]=clone(r);counts.added++;continue;}
      if(canonical(old)===canonical(r))continue;
      // Preserve both complete versions: field merges can silently invent a workout.
      const newer=(r.upd||0)>(old.upd||0), losing=newer?old:r;
      const signature=canonical(losing);
      if(!out.conflicts.some(x=>x.key===k&&canonical(x.rec)===signature)){out.conflicts.push({key:k,rec:clone(losing),at:Date.now()});counts.conflicts++;}
      if(newer){out.sessions[k]=clone(r);counts.updated++;}
    }
    for(const x of incoming.conflicts||[])if(!out.conflicts.some(y=>y.key===x.key&&canonical(y.rec)===canonical(x.rec)))out.conflicts.push(clone(x));
    for(const [k,n]of Object.entries(incoming.exNotes))if(!out.exNotes[k]||n.upd>out.exNotes[k].upd)out.exNotes[k]=clone(n);
    out.equipment=out.equipment||{};
    for(const [k,v]of Object.entries(incoming.equipment||{}))if(!out.equipment[k]||v.upd>out.equipment[k].upd)out.equipment[k]=clone(v);
    out.deload=[...new Set(out.deload.concat(incoming.deload))];
    const empty=Object.keys(current.sessions).length===0;
    if(empty&&incoming.start)out.start=incoming.start;
    if(incoming.tbBar!=null && (empty || out.tbBar==null))out.tbBar=incoming.tbBar;
    out.schema=3;out.mig1=1;out.mig2=1;
    return {data:out,counts,barConflict:incoming.tbBar!=null && current.tbBar!=null && incoming.tbBar!==current.tbBar};
  }
  function metric(st, exercise) {
    const w=number(st.w),r=number(st.r);
    if(r==null||r<=0)return null;
    if(exercise?.carry||exercise?.unit==='متر')return w>0?{k:'carry',v:w*r}: {k:'distance',v:r};
    return w>0?{k:'w',v:w*(1+r/30)}:{k:'r',v:r};
  }
  function trapTotal(st, fallback) {
    if(st && st.w!=='' && number(st.w)!=null)return String(number(st.w));
    return st?.p!=='' && number(st?.p)!=null ? String(number(st.p)+(st.b??fallback??0)):'';
  }

  function equipment(o){
    if(!obj(o))throw Error('مشخصات دستگاه نامعتبر');
    const out={label:text(o.label??'',100),seat:text(o.seat??'',60),handle:text(o.handle??'',100),note:text(o.note??'',500),upd:0};
    if(!out.label.trim()&&(out.seat.trim()||out.handle.trim()||out.note.trim()))throw Error('نام دستگاه یا وسیله را هم بنویس');
    if(o.upd!=null){const n=number(o.upd,false,1e16);if(n==null)throw Error('زمان مشخصات نامعتبر');out.upd=n;}
    return out;
  }
  const labelKey=s=>digits(s).replace(/ك/g,'ک').replace(/ي/g,'ی').replace(/\s+/g,' ').trim().toLocaleLowerCase();
  function equipmentKey(o){return o?.label?.trim()?JSON.stringify([o.label,o.seat||'',o.handle||''].map(labelKey)):'';}
  const noteKey=name=>'n:'+name.trim().replace(/\s+/g,' ');
  // Retire the old structured field without discarding anything the owner entered.
  // Unresolved entries and notes that would exceed the backup limit stay intact.
  function equipmentToNotes(state,resolveName=()=>null){
    state.exNotes=state.exNotes||{};
    const move=(holder,key,name)=>{
      const eq=holder[key];if(!eq){delete holder[key];return;}
      if(!name)return;
      const parts=[eq.label,eq.seat?'صندلی: '+eq.seat:'',eq.handle?'دسته: '+eq.handle:'',eq.note].filter(Boolean);
      if(parts.length){
        const k=noteKey(name),old=state.exNotes[k],block='وسیله و تنظیمات قبلی: '+parts.join(' · ');
        const t=old?.t?.includes(block)?old.t:[old?.t,block].filter(Boolean).join('\n\n');
        if(t.length>10000)return;
        state.exNotes[k]={t,upd:Math.max(old?.upd||0,eq.upd||0)};
      }
      delete holder[key];
    };
    for(const name of Object.keys(state.equipment||{}))move(state.equipment,name,name);
    if(state.equipment&&!Object.keys(state.equipment).length)delete state.equipment;
    const visit=(e,id)=>{
      move(e,'equipment',e.spec?.name||resolveName(id,e.alt));
      for(const v of Object.values(e.variants||{}))visit(v,id);
    };
    for(const r of [...Object.values(state.sessions),...(state.conflicts||[]).map(x=>x.rec)])for(const [id,e]of Object.entries(r.ex))visit(e,id);
    return state;
  }
  function contextMatch(a,b){
    if(!!a?.alt!==!!b?.alt)return {ok:false,verified:false,reason:'variant'};
    const as=a?.spec||{},bs=b?.spec||{};
    if(as.name&&bs.name&&as.name!==bs.name)return {ok:false,verified:false,reason:'movement'};
    for(const k of ['db','lm','tb','pl','carry'])if(as.name&&bs.name&&!!as[k]!==!!bs[k])return {ok:false,verified:false,reason:'unit'};
    if(as.name&&bs.name&&(as.unit||'')!==(bs.unit||''))return {ok:false,verified:false,reason:'unit'};
    // Device details are free-form personal notes now; never infer equality from them.
    return {ok:true,verified:false,reason:'unspecified'};
  }
  function comparison(current,previous,t){
    if(!previous)return {status:'no_history'};
    const match=contextMatch(current,previous);
    if(!match.ok)return {status:'context_changed',reason:match.reason,verified:false};
    const pt=previous.t||t;
    if(!t||!pt||pt.s!==t.s||canonical(pt.r)!==canonical(t.r))return {status:'target_changed'};
    const read=(e,n)=>(e?.sets||[]).slice(0,n).map(st=>({w:number(st.w),r:number(st.r)}));
    const now=read(current,t.s),before=read(previous,t.s);
    if(now.length<t.s||before.length<t.s||now.concat(before).some(st=>st.w==null||st.r==null||st.r<=0))return {status:'incomplete'};
    if(t.rir){
      if(current.rir===''||current.rir==null||previous.rir===''||previous.rir==null)return {status:'rir_missing'};
      if(number(current.rir)!==number(previous.rir))return {status:'rir_changed',currentRir:number(current.rir),previousRir:number(previous.rir)};
    }
    const close=(a,b)=>Math.abs(a-b)<0.001;
    const sameWeights=now.every((st,i)=>close(st.w,before[i].w));
    const sameReps=now.every((st,i)=>close(st.r,before[i].r));
    let kind,delta;
    if(sameWeights){kind=(current.spec?.unit==='متر'||current.spec?.carry)?'distance':'reps';delta=now.reduce((n,st,i)=>n+st.r-before[i].r,0);}
    else if(sameReps){
      const differences=now.map((st,i)=>st.w-before[i].w);
      if(!differences.every(d=>close(d,differences[0])))return {status:'mixed'};
      kind='weight';delta=differences[0];
    }else return {status:'mixed'};
    delta=Math.round(delta*100)/100;
    return {status:'compared',kind,delta,verdict:delta>0?'up':delta<0?'down':'same',verified:match.verified,count:t.s};
  }
  function progression(previous,t,current){
    if(!previous)return {type:'info',reason:'no_history'};
    const match=contextMatch(current,previous);
    if(!match.ok)return {type:'info',reason:'context_changed'};
    const pt=previous.t||t;
    if(pt.s!==t.s||canonical(pt.r)!==canonical(t.r))return {type:'info',reason:'target_changed'};
    const done=(previous.sets||[]).slice(0,pt.s);
    if(done.length<pt.s||done.some(st=>!st.d||number(st.w)==null||number(st.w)<=0||number(st.r)==null))return {type:'info',reason:'incomplete'};
    if(pt.rir&&(previous.rir===''||previous.rir==null||number(previous.rir)==null))return {type:'info',reason:'rir_missing'};
    if(pt.rir&&number(previous.rir)<pt.rir[0])return {type:'info',reason:'rir_low'};
    if(done.some(st=>number(st.r)<pt.r[1]))return {type:'info',reason:'reps_low',cap:pt.r[1]};
    const w=number(done[0].w);
    if(done.some(st=>Math.abs(number(st.w)-w)>0.001))return {type:'info',reason:'mixed_weights'};
    return {type:'up',w0:w,bottom:t.r[0],count:pt.s,cap:pt.r[1],rir:previous.rir,verified:match.verified};
  }
  function latestSet(sessions,today,now=Date.now()){
    let last=null;
    for(const rec of Object.values(sessions)){
      if(rec.done||rec.date!==today)continue;
      for(const [id,e]of Object.entries(rec.ex||{}))for(const [index,st]of (e.sets||[]).entries()){
        if(!st.d||!st.at||st.at>now||now-st.at>12*60*60*1000)continue;
        if(!last||st.at>last.at)last={rec,id,index,at:st.at};
      }
    }
    return last;
  }
  function summarize(comparisons,currentRpm,previousRpm){
    const counted=comparisons.filter(c=>c.status==='compared');
    return {up:counted.filter(c=>c.verdict==='up').length,down:counted.filter(c=>c.verdict==='down').length,same:counted.filter(c=>c.verdict==='same').length,unknown:comparisons.length-counted.length,assumed:counted.filter(c=>!c.verified).length,mental:number(currentRpm)>0&&number(previousRpm)>0?number(currentRpm)-number(previousRpm):null};
  }

  return {clone,number,digits,iso,normalize,parseBackup,merge,metric,trapTotal,equipment,equipmentKey,noteKey,equipmentToNotes,contextMatch,comparison,progression,latestSet,summarize};
});
