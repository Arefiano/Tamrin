const {test}=require('node:test');
const a=require('node:assert/strict');
const H=require('../history.js');
test('latestBefore chooses most recent eligible session without sorting or mutating history',()=>{
  const sessions={
    first:{date:'2026-10-21',upd:10,day:'sat',done:true},
    later:{date:'2026-10-28',upd:4,day:'mon',done:true},
    newest:{date:'2026-10-28',upd:12,day:'sat',done:true},
    same:{date:'2026-10-28',upd:12,day:'sat',done:true},
    future:{date:'2026-11-01',upd:20,day:'sat',done:true},
  };
  const original=Object.keys(sessions);
  a.equal(H.latestBefore(sessions,'2026-10-30',r=>r.day==='sat'),sessions.newest);
  a.equal(H.latestBefore(sessions,'2026-10-28',r=>r.day==='sat'),sessions.first);
  a.equal(H.latestBefore(sessions,'2026-10-20'),null);
  a.deepEqual(Object.keys(sessions),original);
});
test('latestBefore agrees with stable sorted history on representative session fixtures',()=>{
  const sessions={};
  for(let i=0;i<130;i++)sessions['s'+i]={
    date:'2026-10-'+String(1+i%30).padStart(2,'0'),
    upd:(i*17)%23,day:i%2?'mon':'sat',done:i%3!==0,
    ex:{x:{sets:[{w:String(i),r:'8'}]}}
  };
  for(const cutoff of ['2026-10-01','2026-10-12','2026-10-30','2026-11-02']){
    for(const pred of [()=>true,r=>r.day==='mon',r=>r.done&&r.day==='sat']){
      const old=H.recent(sessions).find(r=>r.date<cutoff&&pred(r))||null;
      a.equal(H.latestBefore(sessions,cutoff,pred),old);
    }
  }
});
test('recent returns a sorted copy and preserves stable ties',()=>{
 const sessions={a:{date:'2026-10-25',upd:2},b:{date:'2026-10-25',upd:2},c:{date:'2026-10-27',upd:1}};
 a.deepEqual(H.recent(sessions),[sessions.c,sessions.a,sessions.b]);
 a.deepEqual(Object.keys(sessions),['a','b','c']);
});
