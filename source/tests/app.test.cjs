const {test}=require('node:test'),a=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const C=require('../core.js'),H=require('../history.js');
function harness(initial){
 const store=new Map(Object.entries(initial||{})),els=new Map(),listeners=new Map();let failing=false;
 const el=()=>({hidden:true,value:'',dataset:{},style:{setProperty(){},removeProperty(){}},classList:{toggle(){},add(){},remove(){},contains(){return false}},setAttribute(){},getAttribute(){},addEventListener(){},querySelector(){return el()},querySelectorAll(){return []},parentElement:{hidden:false},textContent:'',innerHTML:'',offsetWidth:390});
 const get=k=>{if(!els.has(k))els.set(k,el());return els.get(k)};
 const ctx={console,TamrinCore:C,TamrinHistory:H,TamrinGuides:require('../exercise-guides.js'),setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},requestAnimationFrame:()=>0,cancelAnimationFrame(){},Date,Intl,URL,AbortController,Blob,matchMedia:()=>({matches:true}),location:{reload(){throw Error('unexpected reload')},protocol:'https:'},navigator:{},document:{documentElement:{},body:{classList:el().classList},querySelector:get,getElementById:k=>get('#'+k),querySelectorAll:()=>[],addEventListener(){}},window:{navigator:{},matchMedia:()=>({matches:true}),addEventListener:(k,fn)=>listeners.set(k,fn),scrollTo(){},innerWidth:390},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(failing)throw Error('disk full');store.set(k,v)},removeItem:k=>store.delete(k)},fetch:async()=>{throw Error('offline')}};
 vm.createContext(ctx);const source=fs.readFileSync(require.resolve('../app.src.html'),'utf8').split('<script>')[1].split('</script>')[0];const end=source.lastIndexOf('render();updateSaveUI();');
 vm.runInContext(source.slice(0,end)+`globalThis.api={get S(){return S},set S(v){S=v},get blocked(){return STORE_BLOCKED},setView:v=>view=v,EX,exCard,guideData,tgt,targetFor,effective,exerciseSpec,suggest,prevBest,progHTML,entry,snapT,freezeEntries,load,save,checkpoint,undoLast,forceUpdate,onCheck,validField,finishMissing,myNote,normNotes,openNote,importText,contextEntry,comparisonFor,sessionSummary,adviceFor,nextRemaining,renderResume,hooks:f=>{if(f.startTimer)startTimer=f.startTimer;if(f.refreshCards)refreshCards=f.refreshCards;if(f.render)render=f.render;if(f.stopTimer)stopTimer=f.stopTimer;if(f.toast)toast=f.toast;}};})();`,ctx);
 return {ctx,api:ctx.api,store,els,listeners,fail:()=>failing=true};
}
const makeState=(sessions={})=>({v:1,schema:2,start:'2026-10-17',deload:[],sessions,exNotes:{},mig1:1,mig2:1});
const entry=(d=1)=>({sets:Array.from({length:4},()=>({w:'30',r:'10',d})),rir:'',alt:false,t:{s:4,r:[6,10],rir:[2,3]}});
test('boot with current and legacy states preserves entries',()=>{for(const raw of [makeState(),{sessions:{},deload:[],exNotes:{}}]){const h=harness({'daftar-tamrin-v1':JSON.stringify(raw)});a.equal(h.api.blocked,false);}});
test('corrupt data is quarantined and automatic writes are blocked',()=>{const h=harness({'daftar-tamrin-v1':'{broken'});a.equal(h.api.blocked,true);a.equal(h.api.save(true),false);a.equal(h.store.get('daftar-tamrin-v1'),'{broken');a.equal(h.store.get('daftar-tamrin-v1:quarantine'),'{broken');});
test('valid previous state recovered without overwriting corrupt primary',()=>{const h=harness({'daftar-tamrin-v1':'{broken','daftar-tamrin-v1:lastgood':JSON.stringify({...makeState(),tbBar:35})});a.equal(h.api.S.tbBar,35);a.equal(h.api.blocked,true);});
test('storage failure produces a persistent alert',()=>{const h=harness();h.fail();a.equal(h.api.save(true),false);a.equal(h.els.get('#save-status').hidden,false);});
test('save reuses known-valid previous state and still validates external writes',()=>{
 const key='daftar-tamrin-v1',h=harness({[key]:JSON.stringify(makeState())});
 const old=C.normalize;let calls=0;
 C.normalize=(...args)=>{calls++;return old(...args)};
 try{
   h.api.S.tbBar=20;a.equal(h.api.save(true),true);
   h.api.S.tbBar=25;a.equal(h.api.save(true),true);
   a.equal(calls,0,'own prior saves should not be parsed and normalized again');
   h.store.set(key,JSON.stringify({...makeState(),tbBar:30}));
   h.api.S.tbBar=35;a.equal(h.api.save(true),true);
   a.equal(calls,1,'external previous data must still be validated');
   a.equal(JSON.parse(h.store.get(key+':lastgood')).tbBar,30);
 }finally{C.normalize=old;}
});
test('missing RIR blocks progression while valid RIR allows it',()=>{const e=entry();const h=harness();h.api.S=makeState({'2026-10-26|mon':{date:'2026-10-26',day:'mon',ex:{mon1:e}}});h.api.setView({date:'2026-10-29',day:'mon'});a.equal(h.api.suggest(h.api.EX.mon1,{s:4,r:[6,10],rir:[2,3]},{week:3}),null);e.rir='2';a.equal(h.api.suggest(h.api.EX.mon1,{s:4,r:[6,10],rir:[2,3]},{week:3}).type,'up');});
test('unchecked sets intentionally remain in record baseline and charts',()=>{const h=harness();h.api.S=makeState({'2026-10-26|mon':{date:'2026-10-26',day:'mon',ex:{mon1:entry(0)}}});h.api.setView({date:'2026-10-29',day:'mon'});a.ok(h.api.prevBest('mon1','2026-10-29',false).w>30);a.ok(h.api.progHTML().includes('۳۰'));});
test('alternative equipment and target are independent',()=>{const h=harness();const base=h.api.EX.fri2,e={sets:[],rir:'',alt:true,spec:h.api.exerciseSpec(base,true)};const ex=h.api.effective(base,e);a.equal(ex.db,1);a.equal(ex.lm,undefined);a.deepEqual(Array.from(ex.r),[12,20]);});
test('saved target remains unchanged after date/deload changes',()=>{const h=harness();const rec={date:'2026-10-26',day:'mon',ex:{mon1:entry()}};h.api.S=makeState();h.api.setView({date:rec.date,day:'mon'});const t=h.api.targetFor(h.api.EX.mon1,{week:1,deload:true},rec);a.equal(t.s,4);a.deepEqual(Array.from(t.rir),[2,3]);});
test('undo restores data after an action',()=>{const h=harness();h.api.checkpoint('test');h.api.S.tbBar=35;h.api.hooks({render:()=>{},stopTimer:()=>{}});h.api.undoLast();a.equal(h.api.S.tbBar,undefined);});
test('offline update preserves the app and does not delete caches or reload',async()=>{const h=harness();let n=0;h.ctx.caches={keys:async()=>['other-app'],delete:()=>n++};await h.api.forceUpdate();a.equal(n,0);});
test('last unmatched superset round starts rest instead of suggesting completed partner',()=>{
 const h=harness();const sets=n=>Array.from({length:n},()=>({w:'20',r:'12',d:1}));const rec={date:'2026-10-29',day:'sat',ex:{sat7:{sets:sets(3),rir:'1',alt:false},sat8:{sets:sets(2),rir:'',alt:false}},cardio:{},upd:0};rec.ex.sat7.sets[2].d=0;
 h.api.S=makeState({'2026-10-29|sat':rec});h.api.setView({date:rec.date,day:'sat',editing:false});h.api.hooks({refreshCards:()=>{},toast:m=>h.ctx.lastToast=m,startTimer:(r,l)=>h.ctx.started={r,l}});
 const card={querySelectorAll:()=>[]},button={setAttribute(){}};const inp=v=>({value:v,placeholder:'',setAttribute(){},classList:{toggle(){}},focus(){}});const w=inp('20'),r=inp('12');const row={dataset:{ex:'sat7',i:'2'},querySelector:q=>q==='.w'?w:q==='.r'?r:button,closest:()=>card,classList:{add(){},remove(){}}};
 h.api.onCheck(row);a.ok(h.ctx.started,JSON.stringify({toast:h.ctx.lastToast,rec}));a.equal(h.ctx.started.l,'Seated Leg Curl');
});
test('legacy snapshots reimport without false conflicts from transient target mode',()=>{const h=harness();const raw=makeState({'2026-10-26|mon':{date:'2026-10-26',day:'mon',ex:{mon1:{sets:[{w:'20',r:'8',d:1}],rir:'2',alt:false}}}});const first=h.api.freezeEntries(C.normalize(raw)),incoming=h.api.freezeEntries(C.normalize(raw));const m=C.merge(C.normalize(first),incoming);a.equal(m.counts.conflicts,0);});

test('personal notes follow movement names across days, future slots and programs',()=>{const h=harness();h.api.S=makeState();h.api.S.exNotes['n:Dumbbell Lateral Raise']={t:'صندلی ۴',upd:5};for(const id of ['mon4','wed7'])a.equal(h.api.myNote(h.api.EX[id]),'صندلی ۴');a.equal(h.api.myNote({id:'future42',name:'  Dumbbell   Lateral Raise  '}),'صندلی ۴');h.api.S.sessions={};h.api.S.start='2027-01-02';a.equal(h.api.myNote({id:'new-program-1',name:'Dumbbell Lateral Raise'}),'صندلی ۴');});
test('alternative notes are independent and shared with the same main movement elsewhere',()=>{const h=harness();h.api.S=makeState();h.api.S.exNotes={'n:Landmine Lateral Raise':{t:'میله',upd:1},'n:Dumbbell Lateral Raise':{t:'دمبل',upd:2}};const ex=h.api.effective(h.api.EX.fri2,{alt:true});a.equal(h.api.myNote(ex),'دمبل');a.equal(h.api.myNote(h.api.EX.fri2),'میله');h.api.setView({date:'2026-10-29',day:'fri'});const r={date:'2026-10-29',day:'fri',ex:{fri2:{alt:true,sets:[],rir:''}}};h.api.S.sessions['2026-10-29|fri']=r;h.api.openNote('fri2');a.ok(h.els.get('#m-card').innerHTML.includes('Dumbbell Lateral Raise'));a.ok(h.els.get('#m-card').innerHTML.includes('>دمبل</textarea>'));});
test('legacy ID notes preserve retired, unknown and newly identified movements',()=>{const h=harness();const s=makeState({'2026-10-28|wed':{ex:{future1:{spec:{name:'Future Press'},alt:false}}}});const r=h.api.normNotes({wed2:{t:'old squat',upd:1},future1:{t:'future',upd:2},unresolved:{t:'keep me',upd:3},'n:Cleared':{t:'',upd:9}},s);a.equal(r['n:Split Squat'].t,'old squat');a.equal(r['n:Future Press'].t,'future');a.equal(r.unresolved.t,'keep me');a.equal(r['n:Cleared'].t,'');});
test('legacy device fields migrate into notes once and survive reload/export/import',()=>{const eq={label:'نیمکت الف',seat:'۴',handle:'خنثی',note:'تکیه بده',upd:8},raw=makeState({'2026-10-26|mon':{date:'2026-10-26',day:'mon',ex:{mon1:{...entry(),equipment:eq}}}});raw.schema=3;raw.equipment={'Neutral-Grip Dumbbell Bench Press':eq};raw.exNotes={'n:Neutral-Grip Dumbbell Bench Press':{t:'نکتهٔ قبلی',upd:5}};const h=harness({'daftar-tamrin-v1':JSON.stringify(raw)}),name='n:Neutral-Grip Dumbbell Bench Press';const migrated=h.api.S.exNotes[name].t;a.ok(migrated.startsWith('نکتهٔ قبلی'));for(const text of ['نیمکت الف','صندلی: ۴','دسته: خنثی','تکیه بده'])a.ok(migrated.includes(text));a.equal(migrated.split('وسیله و تنظیمات قبلی:').length,2);a.equal(h.api.S.equipment,undefined);a.equal(h.api.S.sessions['2026-10-26|mon'].ex.mon1.equipment,undefined);h.api.save(true);a.equal(h.api.load().exNotes[name].t,migrated);const normalized=h.api.freezeEntries(C.parseBackup(JSON.stringify({app:'daftar-tamrin',data:h.api.S})));a.equal(normalized.exNotes[name].t,migrated);a.equal(h.api.importText(JSON.stringify(raw)),true);h.api.S.exNotes[name]={t:'',upd:20};h.api.save(true);a.equal(h.api.load().exNotes[name].t,'');});
test('resume selects a still-pending extra set',()=>{const h=harness();const ex=h.api.EX.mon1;const e={sets:Array.from({length:4},()=>({w:'30',r:'10',d:1})),rir:'2',t:{s:4,r:[6,10],rir:[2,3]}};e.sets.push({w:'',r:'',d:0,x:1});const rec={date:'2026-10-29',day:'mon',ex:{mon1:e}};h.api.S=makeState();const next=h.api.nextRemaining(rec,'mon1');a.equal(next.ex.id,'mon1');a.equal(next.index,4);});

const guides=require('../exercise-guides.js');
test('researched guides cover every main and alternative movement with explicit empty image slots',()=>{const h=harness();const names=new Set(Object.values(h.api.EX).flatMap(ex=>[ex.name,ex.alt].filter(Boolean)));a.equal(names.size,39);a.equal(Object.keys(guides.exercises).length,47);for(const name of names)a.ok(guides.exercises[name],name);for(const [name,g]of Object.entries(guides.exercises)){a.equal(g.cues.length,3,name);a.equal(g.image,null,name);a.ok(g.sources.length,name);for(const k of g.sources)a.match(guides.sources[k].url,/^https:\/\//);}a.deepEqual(guides.colors,{primary:'#C5F04A',secondary:'#8FCFFF'});});
test('compact exercise card retains personal notes and sets while moving all three details into the guide',()=>{const h=harness();h.api.S=makeState();h.api.setView({date:'2026-10-29',day:'sat'});h.api.S.exNotes['n:Single-Arm Cable Row']={t:'صندلی ۴ <img src=x>',upd:1};const html=h.api.exCard(h.api.EX.sat3,{week:1,deload:false},null,false);a.ok(html.includes('صندلی ۴ &lt;img'));a.ok(html.includes('data-info'));a.ok(html.includes('id="w-sat3-0"'));a.ok(!html.includes('class="cues"'));a.ok(!html.includes('class="insight why"'));a.ok(!html.includes('data-comparison'));});
test('guide lookup follows effective movement and handles unknown historical names safely',()=>{const h=harness();a.ok(h.api.guideData('Single-Arm Cable Row').setup.includes('نشسته'));a.ok(h.api.guideData('Half-Kneeling Landmine Press').setup.includes('زانوی سمت دست فعال'));a.equal(h.api.guideData(h.api.effective(h.api.EX.fri2,{alt:true}).name).cues[0],guides.exercises['Dumbbell Lateral Raise'].cues[0]);for(const name of ['Future Press','__proto__','constructor'])a.equal(h.api.guideData(name).cues.length,0);});

test('Lyfta video is connected to rear-delt fly only and packaged as an offline asset',()=>{const g=require('../exercise-guides.js');const name='Chest-Supported Dumbbell Rear Delt Raise';const v=g.exercises[name].video;a.equal(v.source,'https://lyfta.app/ex/8b');a.equal(v.src,'media/rear-delt-fly.mp4');a.equal(v.poster,'media/rear-delt-fly.png');a.equal(v.webm,'media/rear-delt-fly.webm');a.equal(Object.values(g.exercises).filter(x=>x.video).length,1);const h=harness();h.api.S=makeState();h.api.setView({date:'2026-10-30',day:'fri'});h.api.openNote('fri3');const html=h.els.get('#m-card').innerHTML;a.ok(html.includes('<video controls playsinline loop muted preload="none"'));a.ok(html.includes('https://lyfta.app/ex/8b'));a.ok(!html.includes('IMG_8588'));});

test('iOS zoom prevention preserves single-finger gestures and build settings',()=>{
 const source=fs.readFileSync(require.resolve('../app.src.html'),'utf8');
 const build=fs.readFileSync(require.resolve('../build.py'),'utf8');
 a.match(source,/touch-action:manipulation/);
 a.match(source,/\['gesturestart', 'gesturechange', 'gestureend'\]/);
 a.match(source,/event\.touches\.length > 1/);
 a.match(source,/passive: false/);
 a.match(build,/maximum-scale=1, user-scalable=no/);
});


test('Friday landmine guide plays Lyfta video inline with muted autoplay and loop',()=>{
 const h=harness();h.api.S=makeState();h.api.setView({date:'2026-10-30',day:'fri'});
 a.equal(h.api.EX.fri2.name,'Landmine Lateral Raise');
 const g=h.api.guideData('Landmine Lateral Raise');
 a.equal(g.reference.url,'https://lyfta.app/ex/8l9');
 a.equal(g.video.src,'https://lyftaweb.s3.us-east-2.amazonaws.com/GymvisualMP4/32371201.mp4');
 a.equal(g.video.autoplay,true);
 a.equal(g.video.source,'https://lyfta.app/ex/8l9');
 a.ok(g.setup.includes('عمود بر امتداد'));
 a.ok(g.error.includes('روبه‌روی نوک'));
 h.api.openNote('fri2');
 const html=h.els.get('#m-card').innerHTML;
 a.ok(html.includes('https://lyfta.app/ex/8l9'));
 a.ok(html.includes('<video controls playsinline loop muted autoplay preload="auto"'));
 a.ok(html.includes('GymvisualMP4/32371201.mp4'));
 a.ok(html.includes('ویدئوی مرجع'));
 a.ok(!html.includes('class="guide-reference"'));
 a.ok(html.includes('جای ایستادن'));
});

test('personal note card follows muscle legend and opens editing on tap without an edit button',()=>{
 const h=harness();h.api.S=makeState();
 h.api.setView({date:'2026-10-30',day:'fri'});
 h.api.openNote('fri2');
 const html=h.els.get('#m-card').innerHTML;
 const muscles=html.indexOf('class="guide-muscles"'),hint=html.indexOf('class="guide-hint"'),note=html.indexOf('class="guide-personal"'),setup=html.indexOf('class="m-prog"');
 a.ok(muscles>=0&&muscles<hint&&hint<note&&note<setup);
 a.match(html,/<button class="guide-personal-trigger" type="button" data-m="edit-guide-note"/);
 a.ok(html.includes('aria-controls="guide-note-editor"'));
 a.ok(html.includes('id="guide-note-preview"'));
 a.ok(!html.includes('ویرایش</button>'));
 a.ok(html.includes('data-m="save-note"'));
 a.ok(html.includes('data-m="cancel-guide-note"'));
});
