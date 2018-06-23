let CACHE_NAME = 'mws-restaurant-reviews-v1';
const urlsToCache = [
    '/'
];

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                let fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    let responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            console.log('Opened cache');
                            return cache.put(event.request, responseToCache);
                        });
                    return response;

                });
            }
            )
    );
});