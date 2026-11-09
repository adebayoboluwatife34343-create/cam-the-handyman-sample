import {T,stage,initReveal,initMenu,initQuote,addLights,reduced,clamp,lerp,$,$$} from './common.js';
initMenu();initQuote();initReveal();
const rl=$('#ruler');if(rl){for(let i=0;i<30;i++){const s=document.createElement('span');s.dataset.n=i;rl.appendChild(s)}}
setTimeout(()=>document.documentElement.classList.add('tape-skip'),3800);addEventListener('keydown',()=>document.documentElement.classList.add('tape-skip'),{once:true});
const host=$('#fanbox');let speed=0,tgt=0;const rates=[0,2,5.5,11];
$$('.spd button').forEach(b=>b.addEventListener('click',()=>{tgt=+b.dataset.s;$$('.spd button').forEach(x=>x.setAttribute('aria-checked',x===b));if(ctx)ctx.invalidate()}));
const ctx=stage(host,ctx=>{
 const {scene,cam}=ctx;cam.lookAt(0,-.4,0);addLights(ctx,{fill:0xd6e6f7,ground:0x41607f,ki:2.6,hi:1.5});
 const g=new T.Group();scene.add(g);
 const steel=new T.MeshStandardMaterial({color:0xc6d3e0,metalness:.55,roughness:.3}),dark=new T.MeshStandardMaterial({color:0x20406a,metalness:.4,roughness:.4}),blade=new T.MeshStandardMaterial({color:0x2e5588,roughness:.55}),bladeB=new T.MeshStandardMaterial({color:0xdfe8f2,roughness:.6});
 const plate=new T.Mesh(new T.CylinderGeometry(.9,.9,.12,40),dark);plate.position.y=4.1;g.add(plate);const rod=new T.Mesh(new T.CylinderGeometry(.09,.09,2.6,16),steel);rod.position.y=2.8;g.add(rod);
 const motor=new T.Group();motor.position.y=1.35;g.add(motor);const cap=new T.Mesh(new T.CylinderGeometry(.5,.7,.5,40),dark);cap.position.y=.28;motor.add(cap);const hub=new T.Mesh(new T.CylinderGeometry(.75,.75,.34,40),steel);hub.position.y=-.1;motor.add(hub);const blades=new T.Group();blades.position.y=-.1;motor.add(blades);
 for(let i=0;i<5;i++){const arm=new T.Group();arm.rotation.y=i*Math.PI*2/5;const br=new T.Mesh(new T.BoxGeometry(.3,.05,.2),steel);br.position.set(1.0,0,0);arm.add(br);const b=new T.Mesh(new T.BoxGeometry(2.6,.06,.78),i%2?blade:bladeB);b.position.set(2.4,-.02,0);b.rotation.x=.14;arm.add(b);const tip=new T.Mesh(new T.CylinderGeometry(.39,.39,.06,20),i%2?blade:bladeB);tip.position.set(3.7,-.02,0);tip.rotation.x=.14;arm.add(tip);blades.add(arm)}
 const bowl=new T.Mesh(new T.SphereGeometry(.55,28,16,0,Math.PI*2,Math.PI/2,Math.PI/2),new T.MeshStandardMaterial({color:0xffffff,emissive:0x8ec5ff,emissiveIntensity:.35,roughness:.3,transparent:true,opacity:.92}));bowl.position.y=-.27;motor.add(bowl);
 const disc=new T.Mesh(new T.CircleGeometry(4.0,64),new T.MeshBasicMaterial({color:0x8ec5ff,transparent:true,opacity:0,side:T.DoubleSide,depthWrite:false}));disc.rotation.x=-Math.PI/2;disc.position.y=-.1;motor.add(disc);
 let ang=0;g.position.y=-.8;g.scale.setScalar(.7);
 return{tick(c,dt){const S=c.state;speed=lerp(speed,rates[tgt],reduced?1:.04);ang+=speed*(dt||.016);if(reduced&&tgt>0)ang=tgt*.9;
  blades.rotation.y=ang;disc.material.opacity=clamp((speed-3)/14)*.35;blades.children.forEach(a=>a.children[1].material.opacity=1);
  g.rotation.y=S.ry+(reduced?0:S.px*.25);g.rotation.x=.12+S.rx*.5+(reduced?0:S.py*.05);g.rotation.z=(reduced?0:Math.sin(S.t*1.3)*.012*speed*.15);g.position.y=-.8+(reduced?0:S.sy*.6);
  if(reduced&&Math.abs(speed-rates[tgt])>.05)c.invalidate()}}},{fov:36,cam:[0,3.4,13]});
