// Builds 01-program-current.md from the program data inside app.src.html.
// Usage (from source/tools): node gen-program-md.js ../app.src.html <app-version> ../../01-program-current.md
const fs=require('fs');const src=fs.readFileSync(process.argv[2],'utf8');
const grab=(start,end)=>{const i=src.indexOf(start);const j=src.indexOf(end,i);return src.slice(i,j+end.length);};
const Ptxt=grab('const P = {','\n};');const Wtxt=grab('const WARM = [','\n];');
const P=eval('('+Ptxt.replace('const P = ','').replace(/;\s*$/,'')+')');const WARM=eval(Wtxt.replace('const WARM = ','').replace(/;\s*$/,''));
const fa=v=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]).replace(/\./g,'٫');const L='‎';
const rng=(a,b)=>a===b?fa(a):fa(a)+L+'–'+L+fa(b);
const sec=r=>r[0]===r[1]?(r[0]>=60&&r[0]%60===0?fa(r[0]/60)+' دقیقه':fa(r[0])+' ثانیه'):(r[1]>=120&&r[0]%60===0&&r[1]%60===0?rng(r[0]/60,r[1]/60)+' دقیقه':rng(r[0],r[1])+' ثانیه');
const strip=h=>String(h).replace(/<b>(.*?)<\/b>/g,'**$1**').replace(/&lrm;/g,L).replace(/<[^>]+>/g,'');
const label=ex=>ex.db?'هر دمبل':ex.lm?'صفحه‌های روی میله':ex.tb?'مجموع صفحه‌ها (اپ وزن میله را اضافه می‌کند)':ex.pl?'جمع صفحه‌ها':'عدد دستگاه';
let o='# برنامهٔ فعلی — دقیقاً همان که در اپ اجرا می‌شود\n\nاین فایل خودکار از دادهٔ اپ (نسخهٔ '+process.argv[3]+') ساخته شده و مرجع اصلی برنامهٔ فعلی است.\n\n';
o+='**قواعد عمومی:** هفتهٔ ۱ RIR هر حرکت یک واحد بالاتر (حداکثر ۳)؛ Trap Bar Deadlift در هفته‌های ۱ و ۲ RIR ۳. پیشرفت دوگانه: وقتی همهٔ ست‌ها به سقف بازه با RIR هدف رسید، وزنه بالا می‌رود. دی‌لود: هر ۶ تا ۸ هفته یا بعد از دو جلسهٔ پیاپی افت، یک هفته نصف ست‌ها با RIR ۳ تا ۴.\n\n';
o+='**گرم‌کردن (همهٔ روزها):** '+WARM.map(w=>w[0]+' ('+w[1]+')').join('؛ ')+'؛ در پایان ۱ تا ۲ ست سبک برای حرکت اول.\n\n';
const row=(ex,inSS,ssRest)=>{const r=ex.rir?rng(ex.rir[0],ex.rir[1]):(ex.ctl||'—');
 let t=`| ${ex.no||''} | ${ex.name}${ex.tag?' ('+ex.tag+')':''}${ex.pri?' ★':''} | ${fa(ex.s)}${L} × ${L}${rng(ex.r[0],ex.r[1])}${ex.unit?' '+ex.unit:''} | ${r} | ${inSS?sec(ssRest)+' بعد از هر دور':(ex.rest?sec(ex.rest):'—')}${ex.restLast?' (بعد از ست آخر تا '+sec([ex.restLast[1],ex.restLast[1]])+')':''} | ${ex.pz?ex.pz.replace(/&lrm;/g,L):'—'} | ${ex.alt||'—'} |`;return t;};
let n=0;
for(const d of ['sat','mon','wed','fri']){const D=P[d];o+=`## ${D.name} — ${D.short.replace(/ـ/g,'')} (${D.focus}) · ${D.sub}\n\n| # | حرکت | ست × تکرار | RIR | استراحت | مکث | جایگزین |\n|---|---|---|---|---|---|---|\n`;
 let k=0;const cues=[];
 for(const b of D.items){ if(b.ss){o+=`| | **سوپرست** | | | | | |\n`;b.items.forEach(it=>{it.no=++k;o+=row(it,true,b.rest)+'\n';cues.push(it);});}
  else if(b.cardio){o+=`| | **هوازی تردمیل** (${b.cardio==='treadint'?'۱۴ دقیقه اینتروال: ۳ دقیقه آرام، بعد ۳ بار ۳ دقیقه منطقهٔ ۲ و ۱ دقیقه آرام':'۳ دقیقه آرام، بعد ۱۵ دقیقه پیوسته روی شیب؛ کم‌کم تا ۲۰ دقیقه'}؛ ضربان منطقهٔ ۲ حدود ${L}۱۵۰${L}–${L}۱۶۵${L}) | | | | | Stationary Bike |\n`;}
  else {b.no=++k;o+=row(b,false)+'\n';cues.push(b);} }
 o+='\n**نکته‌های اجرا و ثبت وزنه:**\n\n';
 for(const ex of cues){const notes=Array.isArray(ex.note)?ex.note.map(strip).join(' · '):(ex.note?strip(ex.note):'');o+=`- **${ex.name}** — وزنه: ${label(ex)}.${notes?' '+notes:''}\n`;}
 o+='\n';}
o+='★ = حرکت اولویت‌دار (در اپ با حاشیهٔ سبز سمت راست).\n';
fs.writeFileSync(process.argv[4],o);console.log(o.length);
