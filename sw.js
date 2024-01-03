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

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();

  // Store the event to use it later
  deferredPrompt = event;

  // Show your custom installation prompt immediately
  showInstallPrompt();
});

// Function to show your custom installation prompt
function showInstallPrompt() {
  // Trigger the installation prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation prompt');
    } else {
      console.log('User dismissed the installation prompt');
    }

    // Reset the deferredPrompt variable
    deferredPrompt = null;
  });
}

// Example: Show the installation prompt after a specific user action
document.getElementById('someElement').addEventListener('click', () => {
  // You can trigger the installation prompt when the user clicks on a specific element
  showInstallPrompt();
});