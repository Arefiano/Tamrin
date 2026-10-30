/* Run with Playwright installed. Tests only synthetic data on localhost. */
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
const {chromium,webkit}=require('playwright');
const root=path.resolve(__dirname,'../out/tamrin');
let networkUnavailable=false;
const server=http.createServer((req,res)=>{if(networkUnavailable){res.writeHead(503).end('offline test');return;}const pathname=new URL(req.url,'http://localhost').pathname;const file=path.join(root,pathname==='/'?'index.html':pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(e,b)=>{if(e){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.html')?'text/html':file.endsWith('.png')?'image/png':'application/json');res.end(b);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
 for(const [name,engine] of [['chromium',chromium],['webkit',webkit]]){
  const browser=await engine.launch({headless:true});const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const page=await ctx.newPage();let checkPage=page;const errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.goto(url);await page.waitForSelector('.ex[data-ex]');
   for(const [day,n]of [['sat',8],['mon',6],['wed',6],['fri',7]]){await page.locator('[data-day='+day+']').click();assert.equal(await page.locator('.ex[data-ex]').count(),n);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
   await page.locator('[data-day=wed]').click();await page.locator('[data-bar]').click();await page.locator('#m-bar').fill('20');await page.locator('[data-m=save-bar]').click();
   await page.locator('#w-wed1-0').fill('40');await page.locator('#r-wed1-0').fill('8');await page.locator('.set[data-ex=wed1][data-i="0"] [data-chk]').click();await page.waitForTimeout(350);
   let s=await page.evaluate(()=>JSON.parse(localStorage.getItem('daftar-tamrin-v1')));let r=Object.values(s.sessions).find(r=>r.ex.wed1);assert.equal(r.ex.wed1.sets[0].w,'60');assert.equal(r.ex.wed1.sets[0].d,1);
   await page.locator('#undo-last').click();s=await page.evaluate(()=>JSON.parse(localStorage.getItem('daftar-tamrin-v1')));r=Object.values(s.sessions).find(r=>r.ex.wed1);assert.equal(r.ex.wed1.sets[0].d,0);
   await page.locator('#w-wed1-0').fill('-5');assert.equal(await page.locator('#w-wed1-0').getAttribute('aria-invalid'),'true');await page.locator('#w-wed1-0').fill('40');
   await page.locator('[data-day=fri]').click();const card=page.locator('.ex[data-ex=fri2]');await card.locator('[data-alt]').click();assert.ok((await card.locator('.set-head').textContent()).includes('هر دمبل'));assert.ok((await card.locator('.t-sr').textContent()).includes('۲۰'));
   await page.locator('#w-fri2-0').fill('8');await page.locator('#r-fri2-0').fill('15');await card.locator('[data-alt]').click();assert.equal(await page.locator('#w-fri2-0').inputValue(),'');await card.locator('[data-alt]').click();assert.equal(await page.locator('#w-fri2-0').inputValue(),'۸');
   await page.locator('#finish').click();await page.locator('[data-m=save-finish]').click();assert.equal(await page.locator('#finish-warning').isVisible(),true);await page.locator('[data-m=save-finish]').click();await page.waitForTimeout(250);await page.locator('[data-m=close]').click();assert.equal(await page.locator('.done-note').count(),1);
   await page.locator('#open-settings').click();const before=await page.evaluate(()=>localStorage.getItem('daftar-tamrin-v1'));await page.locator('#import-text').fill('{"sessions":{"bad":{"date":"2026-10-28","day":"wed","ex":{}}}}');await page.locator('#import-btn').click();assert.equal(await page.evaluate(()=>localStorage.getItem('daftar-tamrin-v1')),before);
   await page.locator('#import-text').fill(JSON.stringify({app:'daftar-tamrin',data:{sessions:{},deload:[],exNotes:{},tbBar:35}}));await page.locator('#import-btn').click();assert.equal(await page.locator('[data-m=apply-import]').isVisible(),true);await page.locator('#import-bar').check();await page.locator('[data-m=apply-import]').click();s=await page.evaluate(()=>JSON.parse(localStorage.getItem('daftar-tamrin-v1')));assert.equal(s.tbBar,35);assert.ok(await page.evaluate(()=>localStorage.getItem('daftar-tamrin-v1:rescue')));
   await page.locator('#sh-settings [data-close]').click();await page.locator('#open-guide').click();await page.locator('#sh-guide [data-close]').click();await page.locator('#open-history').click();await page.locator('#sh-history [data-close]').click();
   await page.screenshot({path:path.resolve('test-results/'+name+'-390.png'),fullPage:false});
   // Check offline reload after the service worker has controlled this page.
   await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
   if(name==='webkit')networkUnavailable=true;else await ctx.setOffline(true);await page.reload();assert.equal(await page.locator('.ex[data-ex]').count()>0,true);await page.locator('#quick-update').click();await page.waitForTimeout(300);assert.equal(await page.locator('.ex[data-ex]').count()>0,true);networkUnavailable=false;await ctx.setOffline(false);

   // Independent legacy-migration/insight/resume fixture, with synthetic local dates.
   const fx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),fp=await fx.newPage();
   checkPage=fp;fp.on('pageerror',e=>errors.push(e.message));
   await fx.addInitScript(()=>{
     if(localStorage.getItem('daftar-tamrin-v1'))return;
     const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');const now=new Date(),prior=new Date(now);prior.setDate(prior.getDate()-7);
     const today=iso(now),previous=iso(prior),spec={name:'Neutral-Grip Dumbbell Bench Press',db:1},equipment={label:'نیمکت الف',seat:'۱',handle:'خنثی',note:'',upd:1},t={s:4,r:[6,10],rir:[2,3]};
     const old={date:previous,day:'mon',ex:{mon1:{alt:false,spec,equipment,t,rir:'2',sets:Array.from({length:4},()=>({w:'30',r:'10',d:1}))}},cardio:{},done:true,rpm:6,upd:1};
     const current={date:today,day:'mon',ex:{mon1:{alt:false,spec,equipment,t,rir:'2',sets:[{w:'30',r:'10',d:1,at:Date.now()-240000}]}},cardio:{},done:false,upd:2};
     localStorage.setItem('daftar-tamrin-v1',JSON.stringify({v:1,schema:3,start:previous,sessions:{[previous+'|mon']:old,[today+'|mon']:current},equipment:{[spec.name]:equipment},deload:[],exNotes:{},mig1:1,mig2:1,backupMode:'manual'}));
   });
   await fp.goto(url);assert.equal(await fp.locator('#resume-panel').isVisible(),true);assert.ok((await fp.locator('#resume-panel').textContent()).includes('۴ دقیقه'));await fp.locator('[data-resume-go]').click();assert.equal(await fp.locator('#resume-panel').isVisible(),false);
   const primary=fp.locator('.ex[data-ex=mon1]');
   const openGuide=async(card,tab=0)=>{await card.locator('[data-info]').click();await fp.locator('[data-guide-tab="'+tab+'"]').click();};
   const closeGuide=async()=>{await fp.locator('.guide-close').click();await fp.waitForSelector('#modal[hidden]',{state:'attached'});};
   const saveNote=async(card,text)=>{await openGuide(card);await fp.locator('[data-m=edit-guide-note]').click();await fp.locator('#m-note').fill(text);await fp.locator('[data-m=save-note]').click();assert.ok((await fp.locator('#guide-note-preview').textContent()).includes(text));await closeGuide();};
   await openGuide(primary,1);assert.ok((await fp.locator('#guide-panel-1 .why').textContent()).includes('هر ۴ ست'));await closeGuide();
   for(const [i,r]of [[1,'10'],[2,'10'],[3,'12']]){await fp.locator('#w-mon1-'+i).fill('30');await fp.locator('#r-mon1-'+i).fill(r);}
   await openGuide(primary,2);assert.ok((await fp.locator('[data-comparison=mon1]').textContent()).includes('۲ تکرار بیشتر'));await closeGuide();
   assert.equal(await fp.locator('[data-equipment]').count(),0);
   assert.ok((await primary.locator('.my-note').textContent()).includes('نیمکت الف'));
   await saveNote(primary,'نیمکت خودم، صندلی ۴');
   assert.ok((await primary.locator('.my-note').textContent()).includes('نیمکت خودم'));
   await openGuide(primary,2);assert.ok((await fp.locator('[data-comparison]').textContent()).includes('۲ تکرار بیشتر'));await closeGuide();
   // One actual movement shares its note across days and a different slot's alternative.
   await fp.locator('[data-day=mon]').click();const lateral=fp.locator('.ex[data-ex=mon4]');await saveNote(lateral,'ارتفاع ۴ <img src=x onerror=alert(1)>');
   await fp.locator('[data-day=wed]').click();assert.ok((await fp.locator('.ex[data-ex=wed7] .my-note').textContent()).includes('ارتفاع ۴ <img'));assert.equal(await fp.locator('.my-note img').count(),0);
   await fp.locator('[data-day=fri]').click();const landmine=fp.locator('.ex[data-ex=fri2]');assert.equal(await landmine.locator('.my-note').count(),0);await landmine.locator('[data-alt]').click();assert.ok((await landmine.locator('.my-note').textContent()).includes('ارتفاع ۴'));
   await saveNote(landmine,'تنظیم تازه');await landmine.locator('[data-alt]').click();assert.equal(await landmine.locator('.my-note').count(),0);
   // The sheet owns horizontal swipes; day navigation never receives them.
   await fp.locator('[data-day=fri]').click();await openGuide(landmine);
   const guideName=await fp.locator('.guide-head .en').textContent();assert.equal(guideName,'Landmine Lateral Raise');
   const swipe=async(dx,dy=0,cancel=false)=>fp.locator('.guide-viewport').evaluate((el,{dx,dy,cancel})=>{
     const target=el.querySelector('.guide-panel:not([inert]) .guide-image')||el.querySelector('.guide-panel:not([inert]) h3')||el.querySelector('.guide-panel:not([inert]) .guide-cues')||el.querySelector('.guide-panel:not([inert])');
     const rect=el.getBoundingClientRect(),x=rect.x+rect.width/2,y=rect.y+70;
     // WebKit exposes Touch without a usable constructor in this runner.
     // Dispatch the same touch lists through standard DOM events in both engines.
     const touch=(cx,cy)=>({identifier:7,target,clientX:cx,clientY:cy,pageX:cx,pageY:cy});
     const send=(type,touches,changedTouches=[])=>{const event=new Event(type,{bubbles:true,cancelable:true});Object.defineProperties(event,{touches:{value:touches},changedTouches:{value:changedTouches}});target.dispatchEvent(event);};
     send('touchstart',[touch(x,y)]);send('touchmove',[touch(x+dx,y+dy)]);send(cancel?'touchcancel':'touchend',[],[touch(x+dx,y+dy)]);
   },{dx,dy,cancel});
   const selected=()=>fp.locator('[data-guide-tab][aria-selected=true]').getAttribute('data-guide-tab');
   const dayBefore=await fp.locator('#daypill span').textContent();
   await swipe(110);assert.equal(await selected(),'1');await swipe(110);assert.equal(await selected(),'2');await swipe(110);assert.equal(await selected(),'2');
   await swipe(-110);assert.equal(await selected(),'1');await swipe(-110);assert.equal(await selected(),'0');await swipe(-110);assert.equal(await selected(),'0');
   await swipe(15,-100);assert.equal(await selected(),'0');await swipe(110,0,true);assert.equal(await selected(),'0');assert.equal(await fp.locator('#daypill span').textContent(),dayBefore);
   assert.equal(await fp.locator('.ex[data-ex=fri2]').count(),1);
   await fp.locator('[data-m=edit-guide-note]').click();await fp.locator('#m-note').fill('پیش‌نویس مستقل');await fp.locator('[data-guide-tab="1"]').click();await fp.locator('[data-guide-tab="0"]').click();assert.equal(await fp.locator('#m-note').inputValue(),'پیش‌نویس مستقل');await fp.locator('[data-m=cancel-guide-note]').click();
   await fp.locator('[data-guide-tab="0"]').focus();await fp.keyboard.press('ArrowLeft');assert.equal(await selected(),'1');await fp.keyboard.press('End');assert.equal(await selected(),'2');await fp.keyboard.press('Home');assert.equal(await selected(),'0');
   assert.equal(await fp.locator('.guide-panel:not([inert])').count(),1);assert.equal(await fp.locator('.guide-image img').count(),0);
   for(const width of [320,390,430]){
     await fp.setViewportSize({width,height:844});
     const layout=await fp.evaluate(()=>{const g=document.querySelector('.exercise-guide .m-card'),v=g.querySelector('.guide-viewport').getBoundingClientRect(),n=g.querySelector('.guide-nav').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,below:n.top>=v.bottom-1,visible:n.bottom<=innerHeight+1,panelOverflow:g.scrollWidth>g.clientWidth+1};});
     assert.deepEqual(layout,{overflow:false,below:true,visible:true,panelOverflow:false});
   }
   await fp.setViewportSize({width:390,height:844});await fp.locator('#guide-panel-0').evaluate(el=>el.scrollTop=0);await fp.screenshot({path:path.resolve('test-results/'+name+'-guide-execution.png')});
   await fp.locator('[data-guide-tab="1"]').click();await fp.screenshot({path:path.resolve('test-results/'+name+'-guide-weight.png')});
   await fp.locator('[data-guide-tab="2"]').click();await fp.screenshot({path:path.resolve('test-results/'+name+'-guide-comparison.png')});
   await closeGuide();await fp.screenshot({path:path.resolve('test-results/'+name+'-compact-card.png')});
   // The close control is physically on the right, including RTL layout.
   await openGuide(landmine);assert.equal(await fp.locator('.guide-head').evaluate(el=>{const b=el.querySelector('.guide-close').getBoundingClientRect(),r=el.getBoundingClientRect();return b.left>r.left+r.width/2;}),true);
   const pull=async(dy,{header=false,cancel=false,scrolled=false}={})=>fp.locator('#m-card').evaluate((card,{dy,header,cancel,scrolled})=>{
     const panel=card.querySelector('.guide-panel:not([inert])');panel.scrollTop=scrolled?120:0;
     const target=header?card.querySelector('.guide-head h2'):panel.querySelector('.guide-cues');
     const send=(type,touches)=>{const ev=new Event(type,{bubbles:true,cancelable:true});Object.defineProperty(ev,'touches',{value:touches});target.dispatchEvent(ev);};
     send('touchstart',[{clientX:180,clientY:250}]);send('touchmove',[{clientX:181,clientY:250+dy}]);
     const moved=card.style.transform;send(cancel?'touchcancel':'touchend',[]);return moved;
   },{dy,header,cancel,scrolled});
   assert.ok((await pull(180,{scrolled:true})).includes('translateY')===false);assert.equal(await fp.locator('#modal').isVisible(),true);
   assert.ok((await pull(20)).includes('20px'));assert.equal(await fp.locator('#modal').isVisible(),true);
   assert.ok((await pull(180,{cancel:true})).includes('180px'));assert.equal(await fp.locator('#modal').isVisible(),true);
   await pull(180);await fp.waitForSelector('#modal[hidden]',{state:'attached'});assert.equal(await fp.locator('.ex[data-ex=fri2]').count(),1);
   await openGuide(landmine);await pull(180,{header:true,scrolled:true});await fp.waitForSelector('#modal[hidden]',{state:'attached'});
   await openGuide(landmine);assert.equal(await fp.locator('#m-card').evaluate(el=>el.style.transform),'');await closeGuide();
   // Embedded reference video works without external media requests and pauses on exit.
   await openGuide(fp.locator('.ex[data-ex=fri3]'));const video=fp.locator('.guide-media video');assert.equal(await video.count(),1);
   const media=await video.evaluate(async v=>{v.muted=true;v.load();await v.play();return {ready:v.readyState,source:v.currentSrc.startsWith('data:video/mp4;base64,'),paused:v.paused};});assert.equal(media.source,true);assert.equal(media.paused,false);assert.ok(media.ready>=2);
   await fp.locator('[data-guide-tab="1"]').click();assert.equal(await video.evaluate(v=>v.paused),true);await closeGuide();
   // Warmups and cardio alternatives share the same catalog, with no bogus load tabs.
   await fp.locator('details.warm summary').click();await fp.locator('[data-movement-guide="Band External Rotation"]').click();assert.equal(await fp.locator('.guide-tab').count(),1);assert.ok((await fp.locator('#guide-panel-0').textContent()).includes('تحت‌خاری'));await closeGuide();
   await fp.locator('[data-calt]').click();await fp.locator('.cardio [data-movement-guide]').click();assert.equal(await fp.locator('.guide-head .en').textContent(),'Stationary Bike');await closeGuide();await fp.locator('[data-calt]').click();
   assert.equal(await fp.locator('#main .cues, #main .why, #main [data-comparison]').count(),0);
   // Persist, reload and restore a backup that contains notes for absent future movements.
   await fp.reload();if(await fp.locator('#resume-panel').isVisible())await fp.locator('[data-resume-go]').click();await fp.locator('[data-day=mon]').click();assert.ok((await fp.locator('.ex[data-ex=mon4] .my-note').textContent()).includes('تنظیم تازه'));assert.ok((await primary.locator('.my-note').textContent()).includes('نیمکت خودم'));
   await fp.locator('#open-settings').click();await fp.locator('#import-text').fill(JSON.stringify({sessions:{},exNotes:{'n:Future Press':{t:'بماند برای برنامهٔ بعد',upd:2}}}));await fp.locator('#import-btn').click();await fp.locator('[data-m=apply-import]').click();await fp.locator('#sh-settings [data-close]').click();
   const migrated=await fp.evaluate(()=>JSON.parse(localStorage.getItem('daftar-tamrin-v1')));assert.equal(migrated.exNotes['n:Future Press'].t,'بماند برای برنامهٔ بعد');assert.equal(migrated.exNotes['n:Dumbbell Lateral Raise'].t,'تنظیم تازه');assert.equal(migrated.equipment&&Object.keys(migrated.equipment).length||0,0);
   await primary.locator('[data-rir="3"]').click();await openGuide(primary,2);assert.ok((await fp.locator('[data-comparison]').textContent()).includes('فاصله از ناتوانی متفاوت'));await closeGuide();await primary.locator('[data-rir="2"]').click();
   await fp.locator('#finish').click();await fp.locator('[data-k=rpm] [data-rpe="4"]').click();await fp.locator('[data-k=rpe] [data-rpe="5"]').click();await fp.locator('[data-m=save-finish]').click();await fp.locator('[data-m=save-finish]').click();assert.ok((await fp.locator('.session-summary').textContent()).includes('۱ حرکت بهتر'));assert.ok((await fp.locator('.session-summary').textContent()).includes('سختی روانی کمتر'));
   await fp.screenshot({path:path.resolve('test-results/'+name+'-insights.png'),fullPage:true});
   await fx.close();
   assert.deepEqual(errors,[]);console.log(name+': independent guide swipes, bottom tabs, empty image slots, persistent movement notes, legacy migration, Persian layout, '+(name==='webkit'?'server-unavailable fallback':'network-offline reload')+' and update passed');
  }catch(e){await checkPage.screenshot({path:path.resolve('test-results/'+name+'-failure.png'),fullPage:true});throw e;}finally{await browser.close();}
 }
})().then(()=>server.close()).catch(e=>{console.error(e);server.close();process.exitCode=1;});
