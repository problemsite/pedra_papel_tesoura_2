/* comum.js — código usado pelo jogo (index.html) e pelo painel (adm.html) */
(function(){
'use strict';

const ANIMS={esmagar:'Esmagar (cai em cima)',embrulhar:'Embrulhar',cortar:'Cortar ao meio',queimar:'Queimar',engolir:'Engolir (espiral)',explodir:'Explodir',desintegrar:'Desintegrar (glitch)',evaporar:'Evaporar (ondas de calor)',empurrar:'Chutar pra longe',fugir:'Fugir de medo',pular:'Pular de susto',ensaboar:'Ensaboar',demolir:'Demolir em pedaços',atolar:'Atolar (afunda na lama)',aleatoria:'Aleatória'};
const RESULTS={ganha:'✅ Ganha',erra:'❌ Erra (passa a vez)',perde:'💀 Perde (fim de jogo)'};

const STEP_BASE={player:'p1',name:'',emoji:'❓',img:'',phrase:'',sub:'',anim:'esmagar',result:'ganha',level:1,audio:''};
const S=(player,name,emoji,phrase,sub,anim,result,level)=>Object.assign({},STEP_BASE,{player,name,emoji,phrase,sub,anim,result,level});

const DEFAULT={
  roteiroVersao:7,
  title:'O que ganha de...?',
  subtitle:'Pedra, papel, tesoura... e muito além.',
  question:'O que ganha de {item}?',
  turnText:'Vez de {jogador}',
  passText:'A vez passou para {jogador}!',
  placeholderMine:'Sua vez! Digite aqui...',
  placeholderOther:'{jogador} está pensando...',
  sendLabel:'Enviar',
  counterLabel:'Sequência',
  loseText:'{perdedor} PERDEU! 💔',
  endTitle:'FIM DE JOGO',
  endText:'{perdedor} tentou vencer {final} e perdeu. {vencedor} venceu com sequência de {n}!',
  typingMode:'roteiro',
  lives:4,
  autoNext:4,
  loseDelay:4,
  sound:true, musicVolume:0.5, showCounter:true, showChain:true,
  players:{p1:{name:'Problems',photo:''},p2:{name:'Convidado',photo:''}},
  levels:[
    {name:'Normal',intro:'',music:''},
    {name:'Esquentando',intro:'🔥 Está esquentando...',music:''},
    {name:'Sério',intro:'⚠️ Agora ficou sério',music:''},
    {name:'Cósmico',intro:'🌌 NÍVEL CÓSMICO',music:''},
    {name:'Divino',intro:'✨ NÍVEL DIVINO ✨',music:''}
  ],
  sfx:{acerto:'',erro:'',perda:'',nivel:''},
  start:{name:'Pedra',emoji:'🪨',img:''},
  steps:[
    S('p1','Papel','📄','Óbvio que ganha 🙄','Papel embrulha a pedra.','embrulhar','ganha',1),
    S('p2','Tesoura','✂️','Clássico ✂️','Tesoura corta o papel.','cortar','ganha',1),
    S('p1','Martelo','🔨','Amassou a tesoura 🔨','Uma martelada e acabou.','esmagar','ganha',1),
    S('p2','Prego','📌','O prego foi martelado 😂','Martelo nasceu pra isso.','esmagar','erra',1),
    S('p1','Almofada','🛋️','Absorveu a martelada 🛋️','Nem fez barulho.','embrulhar','ganha',1),
    S('p2','Gato','🐈','Deitou e ninguém tira mais 😼','A almofada agora é dele.','esmagar','ganha',1),
    S('p1','Pepino','🥒','O gato pulou 2 metros 🥒','Gato tem pavor de pepino, pesquisa aí.','pular','ganha',1),
    S('p2','Coelho','🐇','Comeu o pepino 🐇','Crunch crunch.','engolir','ganha',1),
    S('p1','Mágico','🎩','Sumiu com o coelho na cartola 🎩','Relaxa, ele volta no fim do show.','embrulhar','ganha',1),
    S('p2','Criança','🧒','Descobriu o truque 🧒','Tava na manga o tempo todo.','empurrar','ganha',1),
    S('p1','Brócolis','🥦','A criança fugiu da mesa 🥦','Nenhuma criança encara um brócolis.','fugir','ganha',1),
    S('p2','Ketchup','🍅','Escondeu o gosto do brócolis 🍅','Com ketchup até criança come.','embrulhar','ganha',1),
    S('p1','Guardanapo','🧻','Limpou... e espalhou mais ainda 😭','Guardanapo em mancha de ketchup só piora.','esmagar','erra',1),
    S('p2','Sabão','🧼','Saiu a mancha 🧼','Com sabão, nem ketchup resiste.','ensaboar','ganha',1),
    S('p1','Porco','🐖','Rolou na lama de novo 🐖','Não adianta dar banho.','esmagar','ganha',1),
    S('p2','Lobo Mau','🐺','Assoprou a casa de palha 🐺','O porquinho correu pra casa do irmão.','empurrar','ganha',1),
    S('p1','Casa de Tijolos','🧱','Assoprou, assoprou... e nada 🧱','Os três porquinhos já sabiam.','esmagar','ganha',1),
    S('p2','Trator','🚜','Derrubou a casa 🚜','Obra liberada.','demolir','ganha',1),
    S('p1','Lama','🟫','Atolou o trator 🟫','Não sai nem com reza.','atolar','ganha',1),
    S('p2','Mangueira','🚿','Lavou a lama toda 🚿','Ficou brilhando.','empurrar','ganha',1),
    S('p1','Inverno','❄️','Congelou a mangueira ❄️','Abre a torneira e não sai nada.','embrulhar','ganha',1),
    S('p2','Fogo','🔥','Fogueira no inverno 🔥','Esquentou todo mundo.','queimar','ganha',2),
    S('p1','Água','💧','Apagou a fogueira 💧','Água apaga o fogo.','esmagar','ganha',2),
    S('p2','Gelo','🧊','Congelou 🧊','Água parada no frio vira gelo.','embrulhar','ganha',2),
    S('p1','Chocolate Quente','☕','Derreteu o gelo ☕','Pedra de gelo em chocolate quente dura 3 segundos.','evaporar','ganha',2),
    S('p2','Ventilador','🌬️','Esfriou o chocolate 🌬️','Ninguém toma chocolate quente pelando.','empurrar','ganha',2),
    S('p1','Verão','🏖️','Ventilador no verão só joga vento quente 🥵','Todo brasileiro sabe.','queimar','ganha',2),
    S('p2','Sorvete','🍦','Derreteu em 2 segundos 🍦','Sorvete contra o verão não dura nada.','esmagar','erra',2),
    S('p1','Piscina','🏊','Resolveu o verão 🏊','Tchibum.','engolir','ganha',2),
    S('p2','Raio','⚡','Todo mundo pra fora da piscina ⚡','Com raio não se brinca.','explodir','ganha',2),
    S('p1','Para-raios','🗼','Pegou o raio no ar 🗼','É pra isso que ele existe.','engolir','ganha',2),
    S('p2','Vulcão','🌋','Derreteu o para-raios 🌋','Lava a mil graus.','explodir','ganha',3),
    S('p1','Bombeiro','🧑‍🚒','Nem o bombeiro apaga um vulcão 🧑‍🚒','Precisaria de um oceano.','esmagar','erra',3),
    S('p2','Oceano','🌊','Esfriou a lava 🌊','Lava no mar vira pedra.','esmagar','ganha',3),
    S('p1','Planeta Terra','🌍','O oceano inteiro cabe na Terra 🌍','E ainda sobra lugar pros continentes.','engolir','ganha',3),
    S('p2','Asteroide','☄️','Um asteroide acabou com os dinossauros ☄️','Tinha uns 10 km e caiu no México há 66 milhões de anos.','explodir','ganha',3),
    S('p1','Escudo','🛡️','Virou panqueca 🛡️','Nenhum escudo segura um asteroide.','esmagar','erra',3),
    S('p2','Nave da NASA','🚀','Bateu num asteroide e mudou a rota dele 🚀','Em 2022 a nave DART da NASA acertou o asteroide Dimorphos. Aconteceu de verdade!','empurrar','ganha',4),
    S('p1','Sol','☀️','Nem a nave mais corajosa encosta no Sol ☀️','Em 2024 a sonda Parker da NASA chegou a 6 milhões de km dele... e foi o máximo que deu.','evaporar','ganha',4),
    S('p2','Eclipse','🌑','A Lua tampou o Sol 🌑','Por uns minutinhos, o dia virou noite.','embrulhar','ganha',4),
    S('p1','Betelgeuse','⭐','Nenhuma lua tampa essa aqui ⭐','Betelgeuse é uns 700 vezes maior que o Sol.','esmagar','ganha',4),
    S('p2','Supernova','💥','Betelgeuse explodiu 💥','Um dia isso vai acontecer de verdade.','explodir','ganha',4),
    S('p1','Buraco Negro','🕳️','Sobrou isso aqui 😳','Depois de uma supernova pode sobrar um buraco negro.','engolir','ganha',4),
    S('p2','Luz','💡','A coisa mais rápida... foi engolida 💡','Nem a luz escapa de um buraco negro.','esmagar','erra',4),
    S('p1','Radiação Hawking','✨','O QUÊ?! O buraco negro evapora 🤯','Stephen Hawking descobriu que buracos negros somem aos pouquinhos.','evaporar','ganha',4),
    S('p2','Entropia','🌀','No fim, tudo vira bagunça 🌀','A entropia do universo só aumenta. Nada escapa dela.','desintegrar','ganha',4),
    S('p1','Big Bang','✴️','Começou tudo do zero ✴️','No Big Bang a bagunça ainda nem existia.','explodir','ganha',4),
    S('p2','DEUS','👑','Aí não tem discussão 🙌','Quem você acha que fez o Big Bang?','esmagar','ganha',5),
    S('p1','Criador de Deus','❓','Ninguém criou Deus 🙌','Ele sempre existiu. Não tem como ganhar.','esmagar','perde',5)
  ]
};

const clone=o=>o==null?o:JSON.parse(JSON.stringify(o));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function arr(x){if(Array.isArray(x))return x.filter(v=>v!=null);if(x&&typeof x==='object')return Object.keys(x).sort((a,b)=>a-b).map(k=>x[k]).filter(v=>v!=null);return null;}

function mergeCfg(c){
  const d=clone(DEFAULT);
  if(!c||typeof c!=='object')return d;
  const o=Object.assign(d,c);
  const steps=arr(c.steps);
  o.steps=(steps||DEFAULT.steps).map(s=>Object.assign({},STEP_BASE,s));
  const lv=arr(c.levels)||[];
  o.levels=DEFAULT.levels.map((l,i)=>Object.assign({},l,lv[i]||{}));
  const cp=c.players||{};
  o.players={p1:Object.assign({},DEFAULT.players.p1,cp.p1),p2:Object.assign({},DEFAULT.players.p2,cp.p2)};
  o.sfx=Object.assign({},DEFAULT.sfx,c.sfx||{});
  o.start=Object.assign({},DEFAULT.start,c.start||{});
  return o;
}

/* Estado derivado do roteiro até a rodada "round" (sem incluir ela) */
function derive(cfg,round){
  let cur=cfg.start,streak=0;
  const chain=[Object.assign({},cfg.start,{res:'start'})];
  for(let j=0;j<round&&j<cfg.steps.length;j++){
    const s=cfg.steps[j];
    chain.push(Object.assign({},s,{res:s.result}));
    if(s.result==='ganha'){cur=s;streak++;}
  }
  return {cur,streak,chain};
}
const other=p=>p==='p1'?'p2':'p1';

/* Corações: cada erro tira 1; "perde" tira todos. lives 0 = sem corações. */
function hearts(cfg,upto){
  const L=Math.max(0,Number(cfg.lives)||0),h={p1:L,p2:L};
  for(let j=0;j<upto&&j<cfg.steps.length;j++){const s=cfg.steps[j];
    if(s.result==='erra')h[s.player]=Math.max(0,h[s.player]-1);else if(s.result==='perde')h[s.player]=0;}
  return h;
}
/* resultado real da rodada r: um erro que zera os corações vira derrota */
function outcome(cfg,r){
  const s=cfg.steps[r];if(!s)return null;
  if(s.result==='ganha')return'ganha';if(s.result==='perde')return'perde';
  if(Number(cfg.lives)>0&&hearts(cfg,r+1)[s.player]<=0)return'perde';
  return'erra';
}
/* confere se os corações batem com o roteiro */
function heartsCheck(cfg){
  const L=Number(cfg.lives)||0,err={p1:0,p2:0};let endAt=-1;
  for(let j=0;j<cfg.steps.length;j++){const s=cfg.steps[j];if(s.result!=='ganha')err[s.player]++;if(outcome(cfg,j)==='perde'){endAt=j;break;}}
  return{lives:L,err,endAt,loser:endAt>=0?cfg.steps[endAt].player:null,total:cfg.steps.length};
}

/* ---------------- Conexão: Firebase ou modo local ---------------- */
function firebaseFilled(){const f=window.FIREBASE_CONFIG;return !!(f&&f.apiKey&&!/COLE/i.test(f.apiKey));}

function firebaseBackend(fc){
  if(!firebase.apps.length)firebase.initializeApp(fc);
  const db=firebase.database(),auth=firebase.auth();
  let offset=0;
  db.ref('.info/serverTimeOffset').on('value',s=>{offset=s.val()||0;});
  return{
    mode:'firebase',auth,
    on(path,cb){const r=db.ref(path);const h=s=>cb(s.val());r.on('value',h);return()=>r.off('value',h);},
    get(path){return db.ref(path).get().then(s=>s.val());},
    set(path,v){return db.ref(path).set(clone(v)===undefined?null:clone(v));},
    update(path,v){return db.ref(path).update(clone(v));},
    remove(path){return db.ref(path).remove();},
    tx(path,fn){return db.ref(path).transaction(fn);},
    now(){return Date.now()+offset;},
    ensureAnon(){
      return new Promise(res=>{
        const off=auth.onAuthStateChanged(u=>{
          if(u){res(u);}else{auth.signInAnonymously().catch(e=>console.error(e));}
        });
        // mantém sempre alguém logado (se o ADM sair em outra aba, volta como anônimo)
        void off;
      });
    }
  };
}

function localBackend(){
  const K='oqg-local-db';
  const ch=('BroadcastChannel' in window)?new BroadcastChannel('oqg-local'):null;
  const read=()=>{try{return JSON.parse(localStorage.getItem(K))||{};}catch(e){return{};}};
  let tree=read();const subs=[];
  const parts=p=>p.split('/').filter(Boolean);
  const getP=(t,p)=>{const v=parts(p).reduce((o,k)=>o==null?null:o[k],t);return v===undefined?null:v;};
  function setP(t,p,v){
    const ps=parts(p);let o=t;
    for(let i=0;i<ps.length-1;i++){if(typeof o[ps[i]]!=='object'||o[ps[i]]===null)o[ps[i]]={};o=o[ps[i]];}
    const k=ps[ps.length-1];
    if(v==null)delete o[k];else o[k]=clone(v);
  }
  function fire(){subs.forEach(s=>{const j=JSON.stringify(getP(tree,s.path));if(j!==s.last){s.last=j;s.cb(JSON.parse(j));}});}
  function commit(){
    try{localStorage.setItem(K,JSON.stringify(tree));}
    catch(e){alert('Modo local: sem espaço no navegador. Use arquivos menores.');throw e;}
    if(ch)ch.postMessage(1);fire();
  }
  const refresh=()=>{tree=read();fire();};
  if(ch)ch.onmessage=refresh;
  window.addEventListener('storage',e=>{if(e.key===K)refresh();});
  return{
    mode:'local',auth:null,
    on(path,cb){const s={path,cb,last:undefined};subs.push(s);setTimeout(()=>{s.last=JSON.stringify(getP(tree,path));cb(getP(tree,path));},0);return()=>{const i=subs.indexOf(s);if(i>=0)subs.splice(i,1);};},
    get(path){return Promise.resolve(clone(getP(tree,path)));},
    set(path,v){tree=read();setP(tree,path,v);commit();return Promise.resolve();},
    update(path,obj){tree=read();for(const k in obj)setP(tree,path+'/'+k,obj[k]);commit();return Promise.resolve();},
    remove(path){tree=read();setP(tree,path,null);commit();return Promise.resolve();},
    tx(path,fn){tree=read();const v=fn(clone(getP(tree,path)));if(v!==undefined){setP(tree,path,v);commit();}return Promise.resolve({committed:v!==undefined});},
    now(){return Date.now();},
    ensureAnon(){return Promise.resolve({uid:'local',isAnonymous:true});}
  };
}

function makeBackend(){
  if(firebaseFilled()){
    if(!window.firebase){alert('Não consegui carregar o Firebase. Confira sua internet.');throw new Error('firebase não carregou');}
    return firebaseBackend(window.FIREBASE_CONFIG);
  }
  return localBackend();
}

/* ---------------- Mídias (imagens e áudios) ----------------
   Uma mídia pode ser:  "media:ID"  (arquivo enviado pelo ADM, guardado no banco)
                   ou:  um caminho/link, ex. "audios/musica.mp3"                     */
const cache={};
const isMedia=r=>typeof r==='string'&&r.indexOf('media:')===0;
async function resolve(be,r){
  if(!r)return'';if(!isMedia(r))return r;
  const id=r.slice(6);if(id in cache)return cache[id];
  const v=await be.get('media/'+id);cache[id]=(v&&v.data)||'';return cache[id];
}
const resolved=r=>!r?'':isMedia(r)?(cache[r.slice(6)]||''):r;
function refsOf(cfg){
  const out=[cfg.start.img,cfg.players.p1.photo,cfg.players.p2.photo];
  cfg.steps.forEach(s=>out.push(s.img,s.audio));
  cfg.levels.forEach(l=>out.push(l.music));
  Object.keys(cfg.sfx).forEach(k=>out.push(cfg.sfx[k]));
  return out.filter(isMedia);
}
function preload(be,cfg){return Promise.all(refsOf(cfg).map(r=>resolve(be,r).catch(()=>'')));}
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
function readDataURL(file){return new Promise((res,rej)=>{const fr=new FileReader();fr.onerror=rej;fr.onload=()=>res(fr.result);fr.readAsDataURL(file);});}
async function resizeImage(file,max){
  const src=await readDataURL(file);
  return new Promise((res,rej)=>{const im=new Image();im.onerror=rej;im.onload=()=>{
    const s=Math.min(1,max/Math.max(im.width,im.height));const c=document.createElement('canvas');
    c.width=Math.max(1,Math.round(im.width*s));c.height=Math.max(1,Math.round(im.height*s));
    c.getContext('2d').drawImage(im,0,0,c.width,c.height);
    let u=c.toDataURL('image/webp',.85);if(u.indexOf('data:image/webp')!==0)u=c.toDataURL('image/png');res(u);};im.src=src;});
}

/* Ajusta imagens de itens: (opcional) tira fundo liso, corta as bordas vazias
   e centraliza num quadrado, pra todas ficarem do mesmo tamanho na tela. */
function loadImg(src){return new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=src;});}
async function processImage(src,opt){
  opt=opt||{};const size=opt.size||360,fill=opt.fill||.9,tol=opt.tol||60;
  const im=await loadImg(src);
  const sc=Math.min(1,800/Math.max(im.width,im.height));
  const w=Math.max(1,Math.round(im.width*sc)),h=Math.max(1,Math.round(im.height*sc));
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0,w,h);
  const d=x.getImageData(0,0,w,h),p=d.data;
  if(opt.removeBg){
    const N=w*h,seen=new Uint8Array(N),q=new Int32Array(N);let qh=0,qt=0;
    const nbs=k=>{const xx=k%w,yy=(k/w)|0;return[xx>0?k-1:-1,xx<w-1?k+1:-1,yy>0?k-w:-1,yy<h-1?k+w:-1];};
    /* 1) anda pelas áreas já transparentes a partir da borda e anota a cor do que encosta nelas */
    const edge=[];
    for(let i=0;i<w;i++){[i,(h-1)*w+i].forEach(k=>{if(!seen[k]){seen[k]=1;q[qt++]=k;}});}
    for(let j=0;j<h;j++){[j*w,j*w+w-1].forEach(k=>{if(!seen[k]){seen[k]=1;q[qt++]=k;}});}
    const firstRing=qt;
    for(let i=0;i<firstRing;i++){const k=q[i];if(p[k*4+3]>=20)edge.push(k);}
    while(qh<qt){const k=q[qh++];if(p[k*4+3]>=20)continue;
      for(const n of nbs(k)){if(n<0||seen[n])continue;seen[n]=1;if(p[n*4+3]<20)q[qt++]=n;else edge.push(n);}}
    /* 2) cor de fundo = cor mais comum nessa beirada */
    const cnt={};let best=-1,bn=0;
    edge.forEach(k=>{const i=k*4,key=(p[i]>>4)+','+(p[i+1]>>4)+','+(p[i+2]>>4);cnt[key]=(cnt[key]||0)+1;if(cnt[key]>bn){bn=cnt[key];best=k;}});
    if(best>=0){
      const R=p[best*4],Gc=p[best*4+1],B=p[best*4+2];
      const dist=i=>Math.abs(p[i]-R)+Math.abs(p[i+1]-Gc)+Math.abs(p[i+2]-B);
      /* 3) apaga tudo que tem a cor do fundo e está ligado à beirada */
      const seen2=new Uint8Array(N);qh=0;qt=0;
      edge.forEach(k=>{if(!seen2[k]&&dist(k*4)<tol*1.4){seen2[k]=1;q[qt++]=k;}});
      while(qh<qt){const k=q[qh++],i=k*4,dd=dist(i);
        if(dd<tol){p[i+3]=0;}else{p[i+3]=Math.min(p[i+3],Math.round(255*(dd-tol)/(tol*.4)));continue;}
        for(const n of nbs(k)){if(n<0||seen2[n])continue;const ni=n*4;if(p[ni+3]>=20&&dist(ni)<tol*1.4){seen2[n]=1;q[qt++]=n;}}
      }
      x.putImageData(d,0,0);
    }
  }
  /* corta as bordas transparentes */
  let x0=w,y0=h,x1=-1,y1=-1;
  for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){if(p[(yy*w+xx)*4+3]>16){if(xx<x0)x0=xx;if(xx>x1)x1=xx;if(yy<y0)y0=yy;if(yy>y1)y1=yy;}}
  if(x1<0){x0=0;y0=0;x1=w-1;y1=h-1;}
  const bw=x1-x0+1,bh=y1-y0+1,k=Math.min(size*fill/bw,size*fill/bh);
  const o=document.createElement('canvas');o.width=o.height=size;
  o.getContext('2d').drawImage(c,x0,y0,bw,bh,(size-bw*k)/2,(size-bh*k)/2,bw*k,bh*k);
  let u=o.toDataURL('image/webp',.9);if(u.indexOf('data:image/webp')!==0)u=o.toDataURL('image/png');return u;
}

/* ---------------- Controle do jogo (usado por jogadores e ADM) ---------------- */
function startGame(be,round){
  round=round||0;
  return be.tx('game',g=>({status:'playing',round,phase:'ask',typed:'',revealAt:0,seq:((g&&g.seq)||0)+1}));
}
function toLobby(be){return be.tx('game',g=>({status:'lobby',round:0,phase:'ask',typed:'',revealAt:0,seq:((g&&g.seq)||0)+1}));}
/* Avança um passo. expect = {round, phase} evita avançar duas vezes. */
function advance(be,cfg,expect){
  const now=be.now();
  return be.tx('game',g=>{
    if(g===null)return null;
    if(!g||g.status!=='playing')return;
    if(expect&&(g.round!==expect.round||g.phase!==expect.phase))return;
    const st=cfg.steps[g.round];const seq=(g.seq||0)+1;
    if(!st)return Object.assign({},g,{status:'end',seq});
    if(g.phase==='ask')return Object.assign({},g,{phase:'reveal',typed:st.name,revealAt:now,seq});
    if(outcome(cfg,g.round)==='perde'||g.round>=cfg.steps.length-1)return Object.assign({},g,{status:'end',seq});
    return Object.assign({},g,{round:g.round+1,phase:'ask',typed:'',revealAt:0,seq});
  });
}
function redoRound(be){
  return be.tx('game',g=>{if(g===null)return null;if(!g)return;return Object.assign({},g,{status:'playing',phase:'ask',typed:'',revealAt:0,seq:(g.seq||0)+1});});
}

window.OQG={processImage,hearts,outcome,heartsCheck,DEFAULT,ANIMS,RESULTS,STEP_BASE,clone,esc,mergeCfg,derive,other,makeBackend,firebaseFilled,
  media:{cache,isMedia,resolve,resolved,refsOf,preload},newId,readDataURL,resizeImage,
  startGame,toLobby,advance,redoRound};
})();
