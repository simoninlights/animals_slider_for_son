//Cache name
const staticCacheName = 'app-v1';

//Array of assets that can be put into the cache
const assetUrls = [
    'index.html',
    'script.js',
    'style.css'
];


self.addEventListener('install', async (event)=> {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetUrls);
});

self.addEventListener('activate', (event)=> {
    
});

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
};

function promptUserToInstall() {
  if (window.matchMedia('(display-mode: browser)').matches) {
    // This is the default mode
    alert('You can install this app by clicking on the browser menu and selecting "Add to Home Screen."');
  } else if (window.matchMedia('(display-mode: standalone)').matches) {
    // The app is already installed and launched in standalone mode
    alert('This app is already installed!');
  } else {
    // Should handle any other display modes
    alert('Try installing this app by clicking on the browser menu and selecting "Add to Home Screen."');
  }
};
