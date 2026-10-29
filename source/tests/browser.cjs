/* Run with Playwright installed. Tests only synthetic data on localhost. */
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
const {chromium,webkit}=require('playwright');
const root=path.resolve(__dirname,'../out/tamrin');
let networkUnavailable=false;
const server=http.createServer((req,res)=>{if(networkUnavailable){res.writeHead(503).end('offline test');return;}const pathname=new URL(req.url,'http://localhost').pathname;const file=path.join(root,pathname==='/'?'index.html':pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(e,b)=>{if(e){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.html')?'text/html':file.endsWith('.png')?'image/png':'application/json');res.end(b);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
 for(const [name,engine] of [['chromium',chromium],['webkit',webkit]]){
  const browser=await engine.launch({headless:true});const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
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
   assert.deepEqual(errors,[]);console.log(name+': browser flows, Persian layout, '+(name==='webkit'?'server-unavailable fallback':'network-offline reload')+' and update passed');
  }catch(e){await page.screenshot({path:path.resolve('test-results/'+name+'-failure.png'),fullPage:true});throw e;}finally{await browser.close();}
 }
})().then(()=>server.close()).catch(e=>{console.error(e);server.close();process.exitCode=1;});
