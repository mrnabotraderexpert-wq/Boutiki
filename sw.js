const C="boutiki-v2";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["/"])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||r.mode!=="navigate")return;
e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(r.url,y));return x}).catch(()=>caches.match(r).then(m=>m||caches.match("/"))))});
