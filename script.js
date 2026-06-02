
// THEME
const themeBtn = document.getElementById('themeBtn');
const themeIcon = themeBtn.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('veedhi-theme') || 'light';
function setTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  themeIcon.textContent = t==='dark' ? '☀' : '☾';
  localStorage.setItem('veedhi-theme',t);
}
setTheme(savedTheme);
themeBtn.addEventListener('click',()=>{
  const now = document.documentElement.getAttribute('data-theme');
  setTheme(now==='dark'?'light':'dark');
});

// AGE TIMER — counts from her birth date
const birthDate = new Date('2008-06-02T00:00:00'); // adjust year if needed
function updateTimer(){
  const now = Date.now();
  const ms = now - birthDate.getTime();
  if(ms<0){document.getElementById('timer').textContent='not yet!';return;}
  const totalSec = Math.floor(ms/1000);
  const y = Math.floor(totalSec/(365.25*24*3600));
  const rem = ms - y*365.25*24*3600*1000;
  const d = Math.floor(rem/(24*3600000));
  const h = Math.floor((rem%(24*3600000))/3600000);
  const m = Math.floor((rem%3600000)/60000);
  const s = Math.floor((rem%60000)/1000);
  document.getElementById('timer').textContent =
    `${y}y ${String(d).padStart(3,'0')}d ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
setInterval(updateTimer,1000);
updateTimer();

// ARC CAROUSEL
const images = [
  "v1.jpg","v4.jpg","v6.jpg","v7.jpg","v9.jpg","v10.jpg",
  "v11.jpg","v12.jpg","v13.jpg","v14.jpg","v15.jpg","v16.jpg","v17.jpg","v18.jpg","v19.jpg","v20.jpg",
  "v21.jpg","v22.jpg","v23.jpg","v24.jpg","v25.jpg","v26.jpg","v27.jpg","v28.jpg","v29.jpg","v30.jpg",
  "v31.jpg","v32.jpg","v33.jpg","v34.jpg"
];
const track = document.getElementById('arcTrack');
const ctr = document.getElementById('arcCounter');
let cur = 0;
const N = images.length;

function buildArc(){
  track.innerHTML='';
  [[-3,'s3 l'],[-2,'s2 l'],[-1,'s1 l'],[0,'c'],[1,'s1 r'],[2,'s2 r'],[3,'s3 r']].forEach(([off,cls])=>{
    const idx=(cur+off+N)%N;
    const el=document.createElement('div');
    el.className='arc-item '+cls;
    const img=document.createElement('img');
    img.src='assets/'+images[idx];
    img.alt=images[idx];
    img.loading='lazy';
    el.appendChild(img);
    track.appendChild(el);
  });
  ctr.textContent=`${cur+1} / ${N}`;
}

function goNext(){cur=(cur+1)%N;buildArc()}
function goPrev(){cur=(cur-1+N)%N;buildArc()}

document.getElementById('arcNext').addEventListener('click',goNext);
document.getElementById('arcPrev').addEventListener('click',goPrev);

let auto=setInterval(goNext,4000);
track.addEventListener('pointerenter',()=>clearInterval(auto));
track.addEventListener('pointerleave',()=>{auto=setInterval(goNext,4000)});

buildArc();

// VIDEO TRIGGER
const vidTrigger=document.getElementById('vidTrigger');
const vidModal=document.getElementById('vidModal');
vidTrigger.addEventListener('click',()=>vidModal.classList.add('show'));
document.getElementById('closeVid').addEventListener('click',()=>{
  vidModal.querySelectorAll('video').forEach(v=>{v.pause();v.closest('.vid-shell')?.classList.remove('playing')});
  vidModal.classList.remove('show');
});
vidModal.addEventListener('click',e=>{
  if(e.target===vidModal){
    vidModal.querySelectorAll('video').forEach(v=>{v.pause();v.closest('.vid-shell')?.classList.remove('playing')});
    vidModal.classList.remove('show');
  }
});

// VID SHELLS inside modal
document.querySelectorAll('.vid-shell').forEach(shell=>{
  const video=shell.querySelector('video');
  shell.addEventListener('click',async()=>{
    if(video.paused){try{await video.play();shell.classList.add('playing')}catch(e){}}
    else{video.pause();shell.classList.remove('playing')}
  });
  video.addEventListener('pause',()=>shell.classList.remove('playing'));
  video.addEventListener('play',()=>shell.classList.add('playing'));
});

// MESSAGE MODAL
const msgModal=document.getElementById('msgModal');
const modalName=document.getElementById('modalName');
const modalTxt=document.getElementById('modalText');
document.querySelectorAll('.read-btn').forEach(btn=>{
  btn.addEventListener('click',e=>{
    e.stopPropagation();
    modalName.textContent=btn.dataset.name;
    modalTxt.textContent=btn.dataset.msg;
    msgModal.classList.add('show');
  });
});
document.getElementById('closeMsgModal').addEventListener('click',()=>msgModal.classList.remove('show'));
msgModal.addEventListener('click',e=>{if(e.target===msgModal)msgModal.classList.remove('show')});

// EGG
const eggModal=document.getElementById('eggModal');
document.getElementById('eggBtn').addEventListener('click',()=>eggModal.classList.add('show'));
document.getElementById('closeEgg').addEventListener('click',()=>eggModal.classList.remove('show'));
eggModal.addEventListener('click',e=>{if(e.target===eggModal)eggModal.classList.remove('show')});

const nav=document.querySelector('.nav');let navT;function showNav(){nav.classList.add('show');clearTimeout(navT);navT=setTimeout(()=>nav.classList.remove('show'),1400)}document.addEventListener('mousemove',e=>{if(e.clientY<72)showNav()});document.addEventListener('touchstart',showNav,{passive:true});
