// ═══════════════════════════════════════════════════════════
// script.js — Hatsuki & Van · 25 Months
// Requires: data.js, images.js (loaded before this in index.html)
// ═══════════════════════════════════════════════════════════

// ── CUSTOM CURSOR ───────────────────────────────────────────
(function(){
  var d=document.getElementById('cD'), r=document.getElementById('cR');
  if(!d||!r) return;
  var mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',function(e){
    mx=e.clientX; my=e.clientY;
    d.style.left=mx+'px'; d.style.top=my+'px';
  });
  (function loop(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12; r.style.left=rx+'px'; r.style.top=ry+'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('button,a,.rsn,.tlc,.nc,.prc,.dd-card,.mw-card,.ll-card,.ab-row,.gc,.pw-item-v2').forEach(function(el){
    el.addEventListener('mouseenter',function(){d.classList.add('big');r.classList.add('big');});
    el.addEventListener('mouseleave',function(){d.classList.remove('big');r.classList.remove('big');});
  });
})();

// ── TOAST ──────────────────────────────────────────────────
function showToast(msg,dur){
  var t=document.getElementById('toast');
  var el=document.createElement('div'); el.className='toast-item'; el.textContent=msg;
  t.appendChild(el);
  setTimeout(function(){ el.style.transition='opacity .4s'; el.style.opacity='0'; setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},400); },dur||3000);
}

// ── CONFETTI ───────────────────────────────────────────────
function doConf(){
  var cols=['#c8a84b','#f0d878','#4a9fd4','#9966dd','#5ec2b7','#d4603a','#FFB7C5'];
  for(var i=0;i<90;i++){
    var p=document.createElement('div'); p.className='conf-p';
    p.style.cssText='left:'+Math.random()*100+'vw;top:0;width:'+(4+Math.random()*8)+'px;height:'+(8+Math.random()*12)+'px;background:'+cols[Math.floor(Math.random()*cols.length)]+';animation:confFall '+(1.5+Math.random()*2)+'s '+(Math.random())+'s ease forwards;';
    document.body.appendChild(p);
    setTimeout(function(pp){if(pp.parentNode)pp.parentNode.removeChild(pp);},4000,p);
  }
}

// ── LIKE SPAWN ─────────────────────────────────────────────
function spawnR(e){
  var ems=['❤️','💙','✨','💕','🥰','😍'];
  for(var i=0;i<6;i++){
    var el=document.createElement('div');
    el.style.cssText='position:fixed;left:'+(e.clientX-15+Math.random()*30)+'px;top:'+(e.clientY-10)+'px;font-size:'+(14+Math.random()*12)+'px;pointer-events:none;z-index:999999;animation:confFall 1.2s ease forwards;';
    el.textContent=ems[Math.floor(Math.random()*ems.length)];
    document.body.appendChild(el);
    setTimeout(function(ee){if(ee.parentNode)ee.parentNode.removeChild(ee);},1400,el);
  }
  showToast('❤️ Liked with love!');
}

// ── LETTER TOGGLE ──────────────────────────────────────────
function toggleLtr(){
  var w=document.getElementById('smW'),b=document.getElementById('smBtn');
  if(!w||!b) return;
  w.classList.toggle('open'); b.textContent=w.classList.contains('open')?'See Less':'See More…';
}

// ── LOADER — Genshin Style ─────────────────────────────────
(function(){
  var loader=document.getElementById('loader');
  var canvas=document.getElementById('giCanvas');
  var fillEl=document.getElementById('giFill');
  var pctEl=document.getElementById('giPct');
  var lbl2El=document.getElementById('giLbl2');
  var lblEl=document.getElementById('giLbl');
  var numEl=document.getElementById('giCountNum');
  var visionEl=document.getElementById('giVisionIc');
  var phase1=document.getElementById('giPhase1');
  var phase2=document.getElementById('giPhase2');
  var pressEl=document.getElementById('giPress');
  var barT=document.getElementById('giBarT');
  var barB=document.getElementById('giBarB');
  var fillPct=0, dismissed=false;
  var fillInt,lblInt,sigilInt;

  function startAll(){
    try{initHeroCanvas();}catch(e){}
    try{initParticles();}catch(e){}
    try{initObservers();}catch(e){}
    try{initCountdown();}catch(e){}
    try{initTyping();}catch(e){}
    try{initStarMap();}catch(e){}
    try{initFilmstrip();}catch(e){}
    try{initVault();}catch(e){}
    try{initProgress();}catch(e){}
    try{initNav();}catch(e){}
    try{initArtDots();}catch(e){}
    try{buildGallery();}catch(e){}
    try{buildPhotoWall();}catch(e){}
    try{buildPlaylist();}catch(e){}
    try{initYtMiniPlayer();}catch(e){}
    try{setHeroPortrait();}catch(e){}
    setTimeout(function(){try{showChatPrev();}catch(e){}},6000);
  }

  function dismiss(){
    if(dismissed) return; dismissed=true;
    stopAll();
    if(fillEl){fillEl.style.transition='width .35s ease';fillEl.style.width='100%';}
    if(pctEl) pctEl.textContent='100%';
    if(lbl2El) lbl2El.textContent='Welcome, Traveler 💙';
    setTimeout(function(){
      loader.style.transition='opacity 1.4s ease, visibility 1.4s ease';
      loader.classList.add('hide');
      setTimeout(function(){try{startAll();}catch(e){}},700);
    },2000);
  }

  function stopAll(){
    clearInterval(fillInt); clearInterval(lblInt); clearInterval(sigilInt);
    loader.removeEventListener('click',onSkip);
    document.removeEventListener('keydown',onSkip);
  }
  function onSkip(){ dismiss(); }

  function buildStars(){
    if(!canvas) return;
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    var ctx=canvas.getContext('2d'), stars=[], lineProgress=0;
    for(var i=0;i<200;i++) stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.3+.3,a:Math.random(),s:(Math.random()*.007+.002)*(Math.random()>.5?1:-1)});
    var lines=[[.12,.15,.22,.28],[.22,.28,.35,.22],[.35,.22,.28,.38],[.65,.12,.75,.22],[.75,.22,.82,.15],[.75,.22,.70,.35],[.15,.65,.25,.72],[.25,.72,.20,.82],[.72,.68,.82,.75],[.82,.75,.78,.88],[.45,.08,.50,.16],[.50,.16,.55,.08],[.42,.88,.50,.82],[.50,.82,.58,.88]];
    (function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      stars.forEach(function(s){s.a+=s.s;if(s.a>.95||s.a<.05)s.s*=-1;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle='rgba(200,220,255,'+s.a+')';ctx.fill();});
      lineProgress=Math.min(lineProgress+.0025,1);
      var shown=Math.floor(lineProgress*lines.length), partial=(lineProgress*lines.length)-shown;
      for(var i=0;i<shown;i++){var l=lines[i];ctx.beginPath();ctx.moveTo(l[0]*canvas.width,l[1]*canvas.height);ctx.lineTo(l[2]*canvas.width,l[3]*canvas.height);ctx.strokeStyle='rgba(140,170,255,.2)';ctx.lineWidth=.7;ctx.stroke();}
      if(shown<lines.length&&partial>0){var l=lines[shown];ctx.beginPath();ctx.moveTo(l[0]*canvas.width,l[1]*canvas.height);ctx.lineTo((l[0]+(l[2]-l[0])*partial)*canvas.width,(l[1]+(l[3]-l[1])*partial)*canvas.height);ctx.strokeStyle='rgba(140,170,255,.2)';ctx.lineWidth=.7;ctx.stroke();}
      requestAnimationFrame(draw);
    })();
  }

  var ELEMS=[{c:'rgba(74,159,212,',em:'💧'},{c:'rgba(153,102,221,',em:'⚡'},{c:'rgba(200,168,75,',em:'✦'},{c:'rgba(90,166,74,',em:'·'},{c:'rgba(212,96,58,',em:'🔥'},{c:'rgba(139,200,232,',em:'❄'}];
  function spawnSigil(){
    if(dismissed) return;
    var e=ELEMS[Math.floor(Math.random()*ELEMS.length)];
    var d=document.createElement('div'); d.className='gi-sigil';
    d.textContent=e.em;
    d.style.cssText='left:'+(8+Math.random()*84)+'%;bottom:'+(6+Math.random()*28)+'%;font-size:'+(10+Math.random()*12)+'px;color:'+e.c+'.7);filter:drop-shadow(0 0 5px '+e.c+'.45));animation-duration:'+(5+Math.random()*4)+'s;animation-delay:'+(Math.random()*1.5)+'s';
    loader.appendChild(d);
    setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d);},11000);
  }

  var STATUSES=['Connecting to Teyvat…','Loading constellations…','Summoning memories…','Unlocking your story…','Almost there…'],sIdx=0;
  function startBar(){
    fillInt=setInterval(function(){
      fillPct=Math.min(fillPct+(fillPct<50?1.6:fillPct<82?.9:.2),99.5);
      if(fillEl) fillEl.style.width=fillPct+'%';
      if(pctEl) pctEl.textContent=Math.floor(fillPct)+'%';
      var ni=Math.min(Math.floor(fillPct/22),STATUSES.length-1);
      if(ni!==sIdx){sIdx=ni;if(lbl2El)lbl2El.textContent=STATUSES[sIdx];}
    },65);
  }

  var LBLS=['Entering Teyvat…','Gathering Primogems…','Ascending your story…','Almost unlocked…'],lIdx=0;
  function startLabels(){ lblInt=setInterval(function(){lIdx=(lIdx+1)%LBLS.length;if(lblEl)lblEl.textContent=LBLS[lIdx];},1100); }

  var VISIONS=['✦','💙','⭐','✦','💫','✧'],vIdx=0;
  function cycleVision(){ vIdx=(vIdx+1)%VISIONS.length; if(visionEl)visionEl.textContent=VISIONS[vIdx]; }

  function showNum(n,cb){
    if(!numEl){setTimeout(cb,900);return;}
    numEl.style.cssText='transform:scale(1.6);opacity:0.3;transition:none';
    numEl.textContent=(n===0)?'✦':String(n);
    requestAnimationFrame(function(){requestAnimationFrame(function(){numEl.style.cssText='transform:scale(1);opacity:1;transition:transform .28s cubic-bezier(.34,1.56,.64,1),opacity .22s ease';});});
    cycleVision(); setTimeout(cb,950);
  }

  function showTitle(){
    if(phase1){phase1.style.transition='opacity .6s ease,visibility .6s ease';phase1.classList.add('gi-hidden');}
    setTimeout(function(){if(phase2)phase2.classList.remove('gi-hidden');},620);
    setTimeout(function(){if(pressEl)pressEl.classList.add('show');},2400);
  }

  function run(){
    buildStars(); startBar(); startLabels();
    setTimeout(spawnSigil,400);
    sigilInt=setInterval(spawnSigil,800);
    setTimeout(function(){if(barT)barT.style.height='9%';if(barB)barB.style.height='9%';},100);
    setTimeout(function(){
      showNum(4,function(){showNum(3,function(){showNum(2,function(){showNum(1,function(){showNum(0,function(){showTitle();dismiss();});});});});});
    },650);
    loader.addEventListener('click',onSkip);
    document.addEventListener('keydown',onSkip);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else setTimeout(run,60);
})();

// ── NAV ────────────────────────────────────────────────────
function initNav(){
  var nav=document.getElementById('nav');
  var links=document.querySelectorAll('.nav-link');
  var sections=document.querySelectorAll('section[id]');
  window.addEventListener('scroll',function(){
    if(window.scrollY>60) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    var pos=window.scrollY+100;
    sections.forEach(function(sec){
      if(pos>=sec.offsetTop&&pos<sec.offsetTop+sec.offsetHeight){
        links.forEach(function(l){l.classList.remove('active');});
        var al=document.querySelector('.nav-link[href="#'+sec.id+'"]');
        if(al) al.classList.add('active');
      }
    });
  },{passive:true});
}

// ── PROGRESS BAR ───────────────────────────────────────────
function initProgress(){
  window.addEventListener('scroll',function(){
    var max=document.documentElement.scrollHeight-window.innerHeight;
    document.getElementById('prog').style.width=(window.scrollY/max*100)+'%';
  },{passive:true});
}

// ── HERO CANVAS ────────────────────────────────────────────
function initHeroCanvas(){
  var cvs=document.getElementById('heroCvs'); if(!cvs) return;
  var ctx=cvs.getContext('2d'),W,H,stars=[];
  function resize(){W=cvs.width=cvs.parentElement.offsetWidth;H=cvs.height=cvs.parentElement.offsetHeight;}
  resize(); window.addEventListener('resize',resize,{passive:true});
  for(var i=0;i<180;i++) stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.3,a:Math.random(),s:(Math.random()*.005+.002)*(Math.random()>.5?1:-1)});
  (function draw(){
    ctx.clearRect(0,0,W,H);
    stars.forEach(function(s){s.a+=s.s;if(s.a>.9||s.a<.05)s.s*=-1;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle='rgba(200,220,255,'+s.a+')';ctx.fill();});
    requestAnimationFrame(draw);
  })();
  var PH=['🌸','✦','💫','⭐','·','✧'],PC=['rgba(200,168,75,','rgba(139,200,232,','rgba(74,159,212,','rgba(255,183,197,'];
  function spawnHeroSigil(){
    var el=document.createElement('div'); el.className='hero-sigil';
    el.textContent=PH[Math.floor(Math.random()*PH.length)];
    el.style.cssText='left:'+Math.random()*100+'%;bottom:'+Math.random()*60+'%;font-size:'+(8+Math.random()*14)+'px;color:'+PC[Math.floor(Math.random()*PC.length)]+(Math.random()*.5+.3)+');animation-duration:'+(8+Math.random()*10)+'s;animation-delay:'+(Math.random()*3)+'s';
    document.getElementById('hero').appendChild(el);
    setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},22000);
  }
  for(var j=0;j<18;j++) spawnHeroSigil();
  setInterval(spawnHeroSigil,2000);
}

// ── SET HERO PORTRAIT ───────────────────────────────────────
function setHeroPortrait(){
  var center=document.getElementById('cdCenterImg');
  if(center&&typeof HV_HERO_IMG!=='undefined'&&HV_HERO_IMG){
    center.src=HV_HERO_IMG;
    center.style.cssText='width:100%;height:100%;object-fit:cover;display:block;';
  }
}

// ── PARTICLES ──────────────────────────────────────────────
function initParticles(){
  var cvs=document.getElementById('pCvs'); if(!cvs) return;
  var ctx=cvs.getContext('2d'),W,H,pts=[];
  function resize(){W=cvs.width=window.innerWidth;H=cvs.height=window.innerHeight;}
  resize(); window.addEventListener('resize',resize,{passive:true});
  var PH=['🌸','✦','·','✧','°','*'],PC=['rgba(200,168,75,','rgba(139,200,232,','rgba(74,159,212,','rgba(153,102,221,'];
  for(var i=0;i<55;i++) pts.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,sz:Math.random()*6+4,vy:Math.random()*.45+.15,vx:(Math.random()-.5)*.25,op:Math.random()*.35+.08,ch:PH[Math.floor(Math.random()*PH.length)],cl:PC[Math.floor(Math.random()*PC.length)],ph:Math.random()*Math.PI*2});
  (function dp(){
    ctx.clearRect(0,0,W,H); var t=Date.now()/1000;
    pts.forEach(function(p){
      p.y-=p.vy; p.x+=Math.sin(t+p.ph)*.28+p.vx;
      if(p.y<-15){p.y=H+15;p.x=Math.random()*W;}
      if(p.x<-10) p.x=W+10; if(p.x>W+10) p.x=-10;
      var a=p.op*(0.55+0.45*Math.sin(t*1.8+p.ph));
      ctx.fillStyle=p.cl+a+')'; ctx.font=(p.sz*3)+'px serif'; ctx.fillText(p.ch,p.x,p.y);
    });
    requestAnimationFrame(dp);
  })();
}

// ── ART DOTS ───────────────────────────────────────────────
function initArtDots(){
  var el=document.getElementById('artDts'); if(!el) return;
  var c=['var(--hydro)','var(--cryo)','var(--electro)','var(--gold)','var(--anemo)','var(--pyro)'];
  for(var i=0;i<6;i++){
    var d=document.createElement('div');
    d.style.cssText='position:absolute;width:6px;height:6px;border-radius:50%;top:50%;left:50%;margin:-3px 0 0 -3px;background:'+c[i]+';opacity:'+(0.5+i*.08)+';animation:artRot '+(8+i*2.5)+'s linear '+((-i*2))+'s infinite;transform-origin:-130px 0;';
    el.appendChild(d);
  }
}

// ── SCROLL OBSERVERS ───────────────────────────────────────
function initObservers(){
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.1});
  document.querySelectorAll('.ani').forEach(function(el,i){
    if(!el.style.transitionDelay) el.style.transitionDelay=(i%5)*.07+'s';
    io.observe(el);
  });
  document.querySelectorAll('.tli').forEach(function(el){
    var o=new IntersectionObserver(function(en){if(en[0].isIntersecting){el.classList.add('in');o.unobserve(el);}},{threshold:.12});
    o.observe(el);
  });
  document.querySelectorAll('[data-gc]').forEach(function(el,i){
    el.style.transitionDelay=(i%4)*.09+'s';
    var o=new IntersectionObserver(function(en){if(en[0].isIntersecting){el.classList.add('in');o.unobserve(el);}},{threshold:.08});
    o.observe(el);
  });
  document.querySelectorAll('.nc').forEach(function(el,i){
    el.style.transitionDelay=(i*.1)+'s';
    var o=new IntersectionObserver(function(en){
      if(en[0].isIntersecting){
        el.classList.add('in');
        var v=el.querySelector('[data-target]');
        if(v) countUp(v,parseInt(v.getAttribute('data-target')));
        o.unobserve(el);
      }
    },{threshold:.15});
    o.observe(el);
  });
  var lw=document.querySelector('.ltr-w');
  if(lw){
    var rcIO=new IntersectionObserver(function(en){
      if(en[0].isIntersecting){
        document.querySelectorAll('[data-cnt]').forEach(function(el){
          var t=parseInt(el.getAttribute('data-cnt')),v=0;
          var tm=setInterval(function(){v=Math.min(v+Math.ceil(t/80),t);el.textContent=v.toLocaleString();if(v>=t)clearInterval(tm);},18);
        });
        rcIO.unobserve(en[0].target);
      }
    },{threshold:.2});
    rcIO.observe(lw);
  }
  document.querySelectorAll('.ll-bar').forEach(function(bar){
    var o=new IntersectionObserver(function(en){
      if(en[0].isIntersecting){bar.style.width=bar.getAttribute('data-w');o.unobserve(bar);}
    },{threshold:.3});
    o.observe(bar);
  });
}

function countUp(el,target){
  var cur=parseInt(el.textContent)||0,dir=target>cur?1:-1;
  var steps=Math.abs(target-cur); if(!steps) return;
  var tm=setInterval(function(){cur+=dir;el.textContent=cur.toLocaleString();if(cur===target)clearInterval(tm);},Math.max(1800/steps,8));
}

// ── COUNTDOWN ──────────────────────────────────────────────
function initCountdown(){
  var start=new Date('2023-01-25T00:00:00');
  function pad(n){return String(n).padStart(2,'0');}
  function tick(){
    var now=new Date(), diff=Math.max(now-start,0), totalSec=Math.floor(diff/1000);
    var yrs=Math.floor(totalSec/31536000),rem=totalSec%31536000;
    var mos=Math.floor(rem/2592000); rem=rem%2592000;
    var days=Math.floor(rem/86400); rem=rem%86400;
    var hrs=Math.floor(rem/3600); rem=rem%3600;
    var mins=Math.floor(rem/60), secs=rem%60;
    function set(id,v){var e=document.getElementById(id);if(e)e.textContent=pad(v);}
    set('cdY',yrs);set('cdM',mos);set('cdD',days);set('cdH',hrs);set('cdMin',mins);set('cdS',secs);
  }
  tick(); setInterval(tick,1000);
}

// ── TYPING EFFECT ──────────────────────────────────────────
function initTyping(){
  var el=document.getElementById('tyLn'); if(!el) return;
  var txt='Para sa iyo, Van \u2014 mula sa puso ko...';
  var i=0; el.innerHTML='<span class="bli">|</span>';
  var tm=setInterval(function(){
    i++; el.innerHTML=txt.substring(0,i)+'<span class="bli">|</span>';
    if(i>=txt.length){
      clearInterval(tm);
      setTimeout(function(){el.innerHTML=txt;var lt=document.getElementById('ltrTxt');if(lt)lt.classList.add('show');},500);
    }
  },52);
}

// ── FILMSTRIP ──────────────────────────────────────────────
function initFilmstrip(){
  var track=document.getElementById('fsTrack'); if(!track) return;
  var months=['M01','M03','M06','M09','M12','M15','M18','M21','M25'];
  var icons=['🌸','💙','🌙','⚡','🎂','💪','✨','🌺','🌟'];
  var frames='';
  for(var i=0;i<months.length*3;i++){
    var idx=i%months.length;
    var imgEl='';
    if(typeof HV_GALLERY!=='undefined'&&HV_GALLERY[idx%HV_GALLERY.length]){
      imgEl='<img src="'+HV_GALLERY[idx%HV_GALLERY.length]+'" style="width:100%;height:100%;object-fit:cover;display:block">';
    } else {
      imgEl='<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:28px;flex-direction:column;gap:6px;background:var(--surf)"><span>'+icons[idx]+'</span><span style="font-family:\'Cinzel\',serif;font-size:8px;letter-spacing:2px;color:var(--txt3)">'+months[idx]+'</span></div>';
    }
    var dots='';for(var d=0;d<6;d++) dots+='<div class="fs-dot"></div>';
    frames+='<div class="fs-frame"><div class="fs-perf">'+dots+'</div>'+imgEl+'<div class="fs-perfr">'+dots+'</div></div>';
  }
  track.innerHTML=frames;
  var scrollX=0;
  (function scroll(){
    scrollX+=.6;
    if(scrollX>track.scrollWidth/2) scrollX=0;
    track.style.transform='translateX(-'+scrollX+'px)';
    requestAnimationFrame(scroll);
  })();
}

// ── STAR MAP ───────────────────────────────────────────────
function initStarMap(){
  var cvs=document.getElementById('starMapCvs'); if(!cvs) return;
  var ctx=cvs.getContext('2d');
  var W=cvs.offsetWidth, H=cvs.offsetHeight||360;
  cvs.width=W; cvs.height=H;
  var stars=[];
  for(var i=0;i<280;i++) stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.3,a:Math.random()*.8+.2,s:(Math.random()*.004+.001)*(Math.random()>.5?1:-1)});
  var CONST=[
    {name:'H',pts:[[.15,.2],[.22,.35],[.22,.5],[.30,.35],[.38,.2],[.38,.5]],lines:[[0,1],[1,2],[1,3],[3,4],[4,5]]},
    {name:'V',pts:[[.55,.18],[.62,.42],[.70,.18],[.77,.42],[.85,.18]],lines:[[0,1],[1,2],[2,3],[3,4]]},
    {name:'♡',pts:[[.45,.38],[.50,.32],[.55,.38],[.50,.46]],lines:[[0,1],[1,2],[2,3],[3,0]]}
  ];
  var t=0;
  (function draw(){
    t+=.008; ctx.clearRect(0,0,W,H);
    ctx.fillStyle='rgba(3,6,20,1)'; ctx.fillRect(0,0,W,H);
    stars.forEach(function(s){s.a+=s.s;if(s.a>.95||s.a<.15)s.s*=-1;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle='rgba(200,220,255,'+s.a+')';ctx.fill();});
    CONST.forEach(function(c,ci){
      var oy=Math.sin(t+ci*.8)*.01*H;
      c.lines.forEach(function(l){
        var a=c.pts[l[0]],b=c.pts[l[1]];
        ctx.beginPath();ctx.moveTo(a[0]*W,a[1]*H+oy);ctx.lineTo(b[0]*W,b[1]*H+oy);
        ctx.strokeStyle='rgba(200,168,75,.25)';ctx.lineWidth=1;ctx.stroke();
      });
      c.pts.forEach(function(p,pi){
        var glow=2+Math.sin(t*2+ci+pi)*.8;
        ctx.beginPath();ctx.arc(p[0]*W,p[1]*H+oy,glow,0,Math.PI*2);ctx.fillStyle='rgba(200,168,75,.7)';ctx.fill();
        ctx.shadowBlur=12;ctx.shadowColor='rgba(200,168,75,.6)';
        ctx.beginPath();ctx.arc(p[0]*W,p[1]*H+oy,1,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.shadowBlur=0;
      });
      ctx.fillStyle='rgba(200,168,75,.4)';ctx.font='bold 11px "Cinzel",serif';
      ctx.fillText(c.name,c.pts[0][0]*W-4,c.pts[0][1]*H+oy-12);
    });
    requestAnimationFrame(draw);
  })();
}

// ── VAULT GAME ─────────────────────────────────────────────
var vaultQs=[
  {q:"What is the monthsary date for Hatsuki and Van?",opts:["January 25, 2023","February 14, 2023","March 1, 2023","December 25, 2022"],ans:0},
  {q:"How many months are Hatsuki and Van celebrating on this website?",opts:["20 months","22 months","25 months","30 months"],ans:2},
  {q:"What does Hatsuki say about Van in the Open Letter?",opts:['"Gusto kita"','"Si Van ang tama. Si Van ang gusto ko"','"Ikaw ang pinaka-maganda"','"Lagi kitang pinili"'],ans:1},
  {q:"Which love language has the highest percentage for Hatsuki?",opts:["Words of Affirmation","Physical Touch","Acts of Service","Quality Time"],ans:2},
  {q:"What is Van's full name as mentioned in the website?",opts:["Chelsea Michaela De Asis","Michaela Chelsea E. De Asis","Van Michaela De Asis","Chelsea Van E. De Asis"],ans:1}
];
var vaultIdx=0,vaultLives=3,vaultScore=0;
function initVault(){ vaultShow(); }
function vaultShow(){
  var body=document.getElementById('vaultBody'),vic=document.getElementById('vaultVictory'),go=document.getElementById('vaultGameover');
  if(!body) return;
  if(vaultIdx>=vaultQs.length){
    body.style.display='none';
    if(vic){vic.style.display='block';var fs=document.getElementById('vvFinalScore');if(fs)fs.textContent=vaultScore;}
    return;
  }
  body.style.display='block';if(vic)vic.style.display='none';if(go)go.style.display='none';
  document.getElementById('vaultLives').textContent=vaultLives;
  document.getElementById('vaultScore').textContent=vaultScore;
  document.getElementById('vaultProg').style.width=(vaultIdx/vaultQs.length*100)+'%';
  var q=vaultQs[vaultIdx];
  document.getElementById('vaultQ').textContent=q.q;
  var optsEl=document.getElementById('vaultOpts'); optsEl.innerHTML='';
  q.opts.forEach(function(opt,i){
    var btn=document.createElement('button'); btn.className='vault-opt'; btn.textContent=opt;
    btn.onclick=function(){vaultAnswer(i,btn);};
    optsEl.appendChild(btn);
  });
}
function vaultAnswer(i,btn){
  var q=vaultQs[vaultIdx];
  document.querySelectorAll('.vault-opt').forEach(function(b){b.onclick=null;});
  if(i===q.ans){
    btn.classList.add('correct'); vaultScore+=100;
    document.querySelectorAll('.vault-opt')[q.ans].classList.add('correct');
    showToast('✅ Correct! +100 points');
  } else {
    btn.classList.add('wrong'); vaultLives--;
    document.querySelectorAll('.vault-opt')[q.ans].classList.add('correct');
    showToast('❌ Wrong! Lives left: '+vaultLives);
    if(vaultLives<=0){
      setTimeout(function(){document.getElementById('vaultBody').style.display='none';document.getElementById('vaultGameover').style.display='block';},1000);
      return;
    }
  }
  vaultIdx++;
  setTimeout(vaultShow,1400);
}
function vaultReset(){
  vaultIdx=0;vaultLives=3;vaultScore=0;
  document.getElementById('vaultBody').style.display='block';
  document.getElementById('vaultVictory').style.display='none';
  document.getElementById('vaultGameover').style.display='none';
  vaultShow();
}

// ── GALLERY (built from images.js data) ────────────────────
var gcImgs=[], gcIdx=0;
var gcLabels=['Chapter I','Chapter II','Chapter III','Chapter IV','Chapter V','Chapter VI','Chapter VII','Chapter VIII','Chapter IX','Chapter X','Chapter XI','Chapter XII'];


// ── PHOTO WALL — build from HV_GALLERY ─────────────────────
function buildPhotoWall(){
  var scene = document.querySelector('.pw-scene-v2');
  if(!scene) return;
  if(typeof HV_GALLERY==='undefined'||!HV_GALLERY.length) return;
  // Pick 6 photos spread across the gallery
  var total = HV_GALLERY.length;
  var step = Math.floor(total / 6);
  var picks = [0, step, step*2, step*3, step*4, total-1];
  var rots = ['-4deg','2.5deg','-2deg','3.5deg','-3deg','1.5deg'];
  scene.innerHTML = '';
  picks.forEach(function(pi, i){
    var img = HV_GALLERY[pi];
    if(!img) return;
    var src = (typeof img === 'object') ? (img.src || img) : img;
    var div = document.createElement('div');
    div.className = 'pw-item-v2';
    div.style.setProperty('--rot', rots[i]);
    div.style.animationDuration = (7 + i*1.5) + 's';
    div.style.animationDelay = (-i*1.2) + 's';
    var imgEl = document.createElement('img');
    imgEl.src = src;
    imgEl.alt = 'Memory ' + (i+1);
    imgEl.loading = 'lazy';
    div.appendChild(imgEl);
    div.onclick = function(){ gcLbOpen(pi); };
    scene.appendChild(div);
  });
}

function buildGallery(){
  var grid=document.getElementById('gcGrid'); if(!grid) return;
  if(typeof HV_GALLERY==='undefined'||!HV_GALLERY.length) return;
  var visions=['💧','⚡','✦','🌿','🔥','❄','🌙','💜','💙','🌸','⭐','💫'];
  var dates=['January 2023','March 2023','June 2023','September 2023','January 2024','March 2024','June 2024','September 2024','October 2024','November 2024','December 2024','February 2025'];
  grid.innerHTML='';
  HV_GALLERY.forEach(function(src,i){
    var label=gcLabels[i]||('Photo '+(i+1));
    var v=visions[i%visions.length];
    var dt=dates[i%dates.length];
    var div=document.createElement('div');
    div.className='gc loading';
    div.setAttribute('data-gc',i+1);
    div.innerHTML=
      '<div class="gc-frame"></div>'+
      '<div class="gc-gem tl"></div>'+
      '<div class="gc-gem tr"></div>'+
      '<div class="gc-gem bl"></div>'+
      '<div class="gc-gem br"></div>'+
      '<div class="gc-vision">'+v+'</div>'+
      '<div class="gc-img-wrap">'+
        '<div class="gc-overlay"></div>'+
        '<img src="'+src+'" alt="'+label+'" loading="lazy" onload="this.parentNode.parentNode.classList.remove(\'loading\')">'+
      '</div>'+
      '<div class="gc-cap">'+
        '<div class="gc-cap-el"><span>✦</span><span>✦</span><span>✦</span></div>'+
        '<div class="gc-cap-label">'+label+'</div>'+
        '<div class="gc-cap-sub">'+dt+' · H&V</div>'+
      '</div>';
    div.onclick=function(){gcLbOpen(i);};
    grid.appendChild(div);
  });
}

function gcLbOpen(idx){
  gcImgs=Array.from(document.querySelectorAll('#gcGrid .gc img'));
  if(!gcImgs.length) return;
  gcIdx=idx||0;
  document.getElementById('gcLb').classList.add('open');
  document.body.style.overflow='hidden';
  var dots=document.getElementById('gcLbDots'); dots.innerHTML='';
  gcImgs.forEach(function(_,i){
    var d=document.createElement('div');
    d.className='gcl-dot'+(i===gcIdx?' on':'');
    d.onclick=function(){gcIdx=i;gcLbShow();};
    dots.appendChild(d);
  });
  gcLbShow();
}
function gcLbClose(){
  document.getElementById('gcLb').classList.remove('open');
  document.body.style.overflow='';
}
function gcLbShow(){
  var img=document.getElementById('gcLbImg');
  img.style.animation='none'; void img.offsetWidth; img.style.animation='';
  img.src=gcImgs[gcIdx].src;
  document.getElementById('gcLbCtr').textContent=(gcIdx+1)+' / '+gcImgs.length;
  document.querySelectorAll('.gcl-dot').forEach(function(d,i){d.classList.toggle('on',i===gcIdx);});
  // Show caption from gcAll
  var info = (typeof gcAll!=='undefined' && gcAll[gcIdx]) ? gcAll[gcIdx] : null;
  var captionEl = document.getElementById('gcLbCaption');
  if(captionEl && info){
    captionEl.innerHTML =
      '<div class="gcl-title">'+(info.title||'')+'</div>'+
      (info.caption ? '<div class="gcl-cap">'+info.caption+'</div>' : '')+
      (info.date    ? '<div class="gcl-date">'+info.date+'</div>'    : '');
    captionEl.style.display = (info.title||info.caption||info.date) ? 'block' : 'none';
  }
}
function gcLbNav(dir){
  gcIdx=(gcIdx+dir+gcImgs.length)%gcImgs.length;
  gcLbShow();
}
// Touch swipe
(function(){
  var sx=0;
  document.addEventListener('touchstart',function(e){
    var lb=document.getElementById('gcLb');
    if(lb&&lb.classList.contains('open')) sx=e.touches[0].clientX;
  },{passive:true});
  document.addEventListener('touchend',function(e){
    var lb=document.getElementById('gcLb');
    if(lb&&lb.classList.contains('open')){
      var dx=e.changedTouches[0].clientX-sx;
      if(Math.abs(dx)>50) gcLbNav(dx<0?1:-1);
    }
  },{passive:true});
})();
document.addEventListener('keydown',function(e){
  var lb=document.getElementById('gcLb');
  if(!lb||!lb.classList.contains('open')) return;
  if(e.key==='ArrowRight') gcLbNav(1);
  else if(e.key==='ArrowLeft') gcLbNav(-1);
  else if(e.key==='Escape') gcLbClose();
});

// ── PLAYLIST (built from data.js HV_SONGS) ─────────────────
var curTrack=null;

// ── YOUTUBE OEMBED TITLE FETCHER ──────────────────────────────
function fetchSongTitles(){
  if(typeof HV_SONGS==='undefined') return;
  HV_SONGS.forEach(function(song,i){
    if(song.title.startsWith('Song ') || song.artist==='Loading...'){
      fetch('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v='+song.id+'&format=json')
        .then(function(r){return r.json();})
        .then(function(d){
          if(d&&d.title){
            // Parse "Title - Artist" format from YouTube title
            var parts=d.title.split(' - ');
            var title=parts.length>1?parts.slice(0,-1).join(' - '):d.title;
            var artist=parts.length>1?parts[parts.length-1]:(d.author_name||'');
            HV_SONGS[i].title=title;
            HV_SONGS[i].artist=artist;
            // Update DOM
            var rows=document.querySelectorAll('.pl-tr');
            if(rows[i]){
              var tn=rows[i].querySelector('.pl-tn'),ar=rows[i].querySelector('.pl-ar');
              if(tn) tn.textContent=title;
              if(ar) ar.textContent=artist;
            }
          }
        }).catch(function(){});
    }
  });
}

// ── DRAGGABLE MINI PLAYER ─────────────────────────────────────
var ytPlayerInited=false, ytMiniVisible=false;
var _ytId='', _ytPlaying=false;

function initYtMiniPlayer(){
  var mp=document.getElementById('ytMiniPlayer');
  if(!mp||ytPlayerInited) return;
  ytPlayerInited=true;
  // Make draggable
  var isDrag=false, sx=0, sy=0, ox=0, oy=0;
  var hdr=mp.querySelector('.ytmp-header');
  hdr.addEventListener('mousedown',function(e){
    isDrag=true; sx=e.clientX-mp.offsetLeft; sy=e.clientY-mp.offsetTop;
    document.addEventListener('mousemove',onDrag);
    document.addEventListener('mouseup',function(){isDrag=false;document.removeEventListener('mousemove',onDrag);});
  });
  hdr.addEventListener('touchstart',function(e){
    var t=e.touches[0]; sx=t.clientX-mp.offsetLeft; sy=t.clientY-mp.offsetTop;
    document.addEventListener('touchmove',onDragT,{passive:false});
    document.addEventListener('touchend',function(){document.removeEventListener('touchmove',onDragT);});
  },{passive:true});
  function onDrag(e){
    if(!isDrag) return;
    var nx=e.clientX-sx, ny=e.clientY-sy;
    nx=Math.max(0,Math.min(window.innerWidth-mp.offsetWidth,nx));
    ny=Math.max(0,Math.min(window.innerHeight-mp.offsetHeight,ny));
    mp.style.left=nx+'px'; mp.style.top=ny+'px';
    mp.style.bottom='auto'; mp.style.right='auto';
  }
  function onDragT(e){
    e.preventDefault();
    var t=e.touches[0];
    var nx=t.clientX-sx, ny=t.clientY-sy;
    nx=Math.max(0,Math.min(window.innerWidth-mp.offsetWidth,nx));
    ny=Math.max(0,Math.min(window.innerHeight-mp.offsetHeight,ny));
    mp.style.left=nx+'px'; mp.style.top=ny+'px';
    mp.style.bottom='auto'; mp.style.right='auto';
  }
}

function ytMpCollapse(){
  var mp=document.getElementById('ytMiniPlayer');
  mp.classList.toggle('collapsed');
}

function ytMpClose(){
  var mp=document.getElementById('ytMiniPlayer');
  mp.classList.remove('show');
  ytMiniVisible=false;
  _ytPlaying=false;
  // Stop the iframe
  var fr=document.getElementById('ytMiniFrame');
  if(fr) fr.src='';
}

function buildPlaylist(){
  var list=document.getElementById('plList'); if(!list) return;
  if(typeof HV_SONGS==='undefined'||!HV_SONGS.length) return;
  var colors=['#4a9fd4','#c8a84b','#9966dd','#5ec2b7','#d4603a','#8bc8e8','#c8a84b','#4a9fd4','#8338ec','#fb5607','#4a9fd4','#c8a84b','#9966dd','#d4603a'];
  list.innerHTML='';
  HV_SONGS.forEach(function(song,i){
    var c=colors[i]||'#c8a84b';
    var div=document.createElement('div');
    div.className='pl-tr';
    div.setAttribute('data-ytid',song.id);
    div.innerHTML=
      '<span class="pl-nu">'+(i+1)+'</span>'+
      '<div class="pl-tb" style="background:'+c+'22;border:1px solid '+c+'55">'+song.icon+'</div>'+
      '<div class="pl-nf"><div class="pl-tn">'+song.title+'</div><div class="pl-ar">'+song.artist+'</div></div>'+
      '<div class="pl-bars"><span></span><span></span><span></span><span></span></div>'+
      '<span class="pl-ht">♥️</span>';
    div.onclick=function(){plPlay(div,song.id,song.title,song.icon);};
    list.appendChild(div);
  });
  var sub=document.querySelector('.pl-sub');
  if(sub) sub.textContent=HV_SONGS.length+' Songs · Pure Love';
  setTimeout(fetchSongTitles, 1200);
}

function plPlay(row,ytid,title,icon){
  document.querySelectorAll('.pl-tr').forEach(function(r){r.classList.remove('playing');});
  row.classList.add('playing');
  curTrack=row;
  document.getElementById('plMainBtn').textContent='⏸';
  var tn=row.querySelector('.pl-tn'), ar=row.querySelector('.pl-ar');
  var sTitle=tn?tn.textContent:(title||'');
  var sArtist=ar?ar.textContent:'';
  var sIcon=row.querySelector('.pl-tb')?row.querySelector('.pl-tb').textContent:(icon||'♫');
  // Show mini player
  var mp=document.getElementById('ytMiniPlayer');
  if(mp){
    mp.classList.add('show');
    ytMiniVisible=true;
    initYtMiniPlayer();
    var tEl=mp.querySelector('.ytmp-title'),aEl=mp.querySelector('.ytmp-artist');
    if(tEl) tEl.textContent=sTitle;
    if(aEl) aEl.textContent=sArtist;
    var disc=mp.querySelector('.ytmp-disc');
    if(disc) disc.textContent=sIcon;
    // Load YT iframe with autoplay
    var fr=document.getElementById('ytMiniFrame');
    if(fr){
      fr.src=''; // reset first
      setTimeout(function(){
        fr.src='https://www.youtube.com/embed/'+ytid+'?autoplay=1&rel=0&modestbranding=1&controls=1&enablejsapi=1&playsinline=1';
      }, 50);
      _ytId=ytid; _ytPlaying=true;
    }
    // Remove collapsed if collapsed
    mp.classList.remove('collapsed');
    var disc2=mp.querySelector('.ytmp-disc');
    if(disc2) disc2.classList.remove('paused');
  }
}
function plToggle(){
  if(!curTrack){
    var rows=document.querySelectorAll('.pl-tr');
    if(rows.length){var r=rows[0]; plPlay(r,r.getAttribute('data-ytid'));}
    return;
  }
  // Toggle mini player iframe
  var fr=document.getElementById('ytMiniFrame');
  var btn=document.getElementById('plMainBtn');
  if(!fr) return;
  _ytPlaying=!_ytPlaying;
  if(_ytPlaying){
    fr.src='https://www.youtube.com/embed/'+_ytId+'?autoplay=1&rel=0&modestbranding=1&controls=1';
    btn.textContent='⏸';
    var disc=document.querySelector('#ytMiniPlayer .ytmp-disc');
    if(disc) disc.classList.remove('paused');
  } else {
    fr.src='https://www.youtube.com/embed/'+_ytId+'?autoplay=0&rel=0&modestbranding=1&controls=1';
    btn.textContent='▶';
    var disc=document.querySelector('#ytMiniPlayer .ytmp-disc');
    if(disc) disc.classList.add('paused');
  }
}
function plNext(){
  var rows=document.querySelectorAll('.pl-tr'),idx=0;
  for(var i=0;i<rows.length;i++){if(rows[i]===curTrack){idx=(i+1)%rows.length;break;}}
  plPlay(rows[idx],rows[idx].getAttribute('data-ytid'));
}
function plPrev(){
  var rows=document.querySelectorAll('.pl-tr'),idx=rows.length-1;
  for(var i=0;i<rows.length;i++){if(rows[i]===curTrack){idx=(i-1+rows.length)%rows.length;break;}}
  plPlay(rows[idx],rows[idx].getAttribute('data-ytid'));
}

// ── NOTIFICATIONS ──────────────────────────────────────────
document.getElementById('fxN').addEventListener('click',function(){
  showToast('💙 25 Notifications — All from the heart!');
  doConf();
});

// ── FORCE VISIBILITY ───────────────────────────────────────
(function forceVisible(){
  var SELS='.ani,.tli,.gc,.nc,.prc,.rsn,.bk-i,.mw-card,.ll-card,.dd-card,.mq-card,.ab-row,.cd-unit,.pl-tr,.sc-promise,.ft-b'.split(',');
  function revealAll(){
    SELS.forEach(function(sel){
      try{document.querySelectorAll(sel).forEach(function(el){el.classList.add('in');el.style.opacity='1';el.style.transform='none';el.style.visibility='visible';});}catch(e){}
    });
  }
  setTimeout(revealAll,1200);setTimeout(revealAll,3000);setTimeout(revealAll,6000);
  var st; window.addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(revealAll,80);},{passive:true});
})();


// ── CHAT WIDGET ───────────────────────────────────────────
var chatOpen=false, prevDone=false, chatStep='s0', chatEnded=false;

function showChatPrev(){
  if(prevDone||chatOpen) return;
  var p=document.getElementById('chatPrev'), c=document.getElementById('cpCont');
  p.classList.add('show'); document.getElementById('cfbN').classList.add('show');
  setTimeout(function(){ c.innerHTML='<p class="cp-mg">💙 Hi Van! May gusto akong sabihin sa\'yo...</p>'; },1800);
}
function dismissPrev(){
  prevDone=true;
  document.getElementById('chatPrev').classList.remove('show');
  document.getElementById('cfbN').classList.remove('show');
}
function openChat(){ dismissPrev(); openChatWin(); }
function toggleChat(){ dismissPrev(); if(chatOpen) closeChat(); else openChatWin(); }
function openChatWin(){
  chatOpen=true;
  document.getElementById('chatWin').classList.add('open');
  if(chatStep==='s0'){
    var row=addTy();
    setTimeout(function(){
      row.remove();
      addMsg('h', CS.s0.h);
      setTimeout(function(){ showChoices(CS.s0.vc); },400);
    },1800);
  }
}
function closeChat(){ chatOpen=false; document.getElementById('chatWin').classList.remove('open'); }

function addMsg(who,text){
  var ms=document.getElementById('cwMs');
  var d=document.createElement('div'); d.className='msg '+who;
  d.innerHTML='<div class="m-bb">'+text+'</div><span class="m-ts">'+getTime()+(who==='v'?' · Seen ✓':'')+'</span>';
  ms.appendChild(d); ms.scrollTop=ms.scrollHeight;
}
function addMsg(who, txt, delay){
  var ms = document.getElementById('cwMs');
  if(!ms) return;
  setTimeout(function(){
    // Timestamp every few messages
    var msgs = ms.querySelectorAll('.msg-row').length;
    if(msgs === 0 || msgs % 4 === 0){
      var ts = document.createElement('div'); ts.className='msg-ts';
      ts.textContent = getTime();
      ms.appendChild(ts);
    }
    var row = document.createElement('div');
    row.className = 'msg-row ' + (who==='h' ? 'from-h' : 'from-v');
    if(who==='h'){
      var av = document.createElement('div'); av.className='msg-av-sm'; av.textContent='H';
      row.appendChild(av);
    }
    var bub = document.createElement('div'); bub.className='msg-bubble';
    bub.textContent = txt; row.appendChild(bub);
    ms.appendChild(row);
    ms.scrollTop = ms.scrollHeight;
  }, delay||0);
}

function addTy(){
  var ms=document.getElementById('cwMs'); if(!ms) return;
  var row = document.createElement('div'); row.id='cwTy'; row.className='cw-typing';
  row.innerHTML='<div class="typing-av">H</div><div class="typing-dots"><span></span><span></span><span></span></div>';
  ms.appendChild(row); ms.scrollTop=ms.scrollHeight;
}
function showChoices(choices){
  var rp=document.getElementById('cwRp'), os=document.getElementById('cwOs');
  os.innerHTML='';
  choices.forEach(function(ch){
    var b=document.createElement('button'); b.className='cw-ro'; b.textContent=ch;
    b.onclick=function(){ vanReplied(ch); };
    os.appendChild(b);
  });
  rp.style.display='block';
  document.getElementById('cwHn').textContent='Piliin ang iyong reply 💙';
}
function hideChoices(){
  document.getElementById('cwRp').style.display='none';
  document.getElementById('cwHn').textContent='';
}
function vanReplied(choice){
  hideChoices(); addMsg('v', choice);
  var nextMap={s0:'s1',s1:'s2',s2:'s3',s3:'s4'};
  var nextStep=nextMap[chatStep]||'s4';
  var stepData=CS[nextStep];
  var hReply=stepData.rs?stepData.rs[choice]:null;
  if(!hReply){ var keys=Object.keys(stepData.rs||{}); hReply=stepData.rs?stepData.rs[keys[0]]:'Nandito lang ako para sa iyo. 💙'; }
  var row=addTy();
  var delay=Math.min(900+choice.length*28,2100);
  setTimeout(function(){
    row.remove(); addMsg('h',hReply); chatStep=nextStep;
    if(stepData.end){
      chatEnded=true;
      setTimeout(function(){ document.getElementById('cwHn').textContent='💕 Chapter 26 starts now...'; },400);
    } else {
      var nd=CS[chatStep];
      if(nd&&nd.vc) setTimeout(function(){showChoices(nd.vc);},600);
    }
  },delay);
}
function getTime(){
  return new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true});
}
