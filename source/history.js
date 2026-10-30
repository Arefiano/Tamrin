/* Workout-history queries: pure, testable, and independent of the UI.
   Scan for the latest matching record without sorting all sessions for each
   exercise. Ties follow the original stable descending sort semantics. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object' && module.exports)module.exports=api;
  else root.TamrinHistory=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function recent(sessions){
    return Object.values(sessions).sort((a,b)=>a.date<b.date?1:a.date>b.date?-1:(b.upd||0)-(a.upd||0));
  }
  function latestBefore(sessions,beforeDate,predicate){
    let best=null;
    for(const rec of Object.values(sessions)){
      if(rec.date>=beforeDate || (predicate&&!predicate(rec)))continue;
      if(!best || rec.date>best.date || (rec.date===best.date && (rec.upd||0)>(best.upd||0)))best=rec;
    }
    return best;
  }
  return Object.freeze({recent,latestBefore});
});
