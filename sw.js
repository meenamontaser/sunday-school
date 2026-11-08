const C='ss-v5',PRE=['./','./index.html','./manifest.json','./icon-192.png','https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.2/firebase-app-compat.min.js','https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.2/firebase-firestore-compat.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(PRE.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url);
if(u.origin!=location.origin&&u.hostname!='cdnjs.cloudflare.com'&&u.hostname!='cdn.jsdelivr.net')return;
e.respondWith((u.origin==location.origin?fetch(r.url,{cache:'no-cache'}):fetch(r)).then(res=>{if(res&&(res.ok||res.type=='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreVary:true,ignoreSearch:true}).then(m=>m||caches.match('./index.html'))))});
