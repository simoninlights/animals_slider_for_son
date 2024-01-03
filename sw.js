//Cache name
const staticCacheName = 'app-v1';

//Array of assets that can be put into the cache
const assetUrls = [
    'index.html',
    'script.js',
    'style.css'
];


self.addEventListener('install', (event)=> {
   event.waitUntil(
    caches.open(staticCacheName).then(cache => cache.addAll(assetUrls))
   );
});

self.addEventListener('activate', ()=> {
    
});