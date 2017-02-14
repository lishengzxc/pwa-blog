const RUNTIME = 'runtime'

const getFixedUrl = (req) => {
  let now = Date.now();
  url = new URL(req.url)

  // add query for caching-busting.
  // Github Pages served with Cache-Control: max-age=600
  // max-age on mutable content is error-prone, with SW life of bugs can even extend.
  // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
  // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
  url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
  return url.href
}

self.addEventListener('install', event => {

})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  console.log(`fetch ${event.request.url}`)

  const cached = caches.match(event.request);
  const fixedUrl = getFixedUrl(event.request);
  const fetched = fetch(fixedUrl, { cache: "no-store" });
  const fetchedCopy = fetched.then(resp => resp.clone());

  // Call respondWith() with whatever we get first.
  // If the fetch fails (e.g disconnected), wait for the cache.
  // If there’s nothing in cache, wait for the fetch. 
  // If neither yields a response, return offline pages.
  event.respondWith(
    Promise.race([fetched.catch(_ => cached), cached])
      .then(resp => resp || fetched)
      .catch(_ => { })
  );

  // Update the cache with the version we fetched (only for ok status)
  event.waitUntil(
    Promise.all([fetchedCopy, caches.open(RUNTIME)])
      .then(([response, cache]) => response.ok && cache.put(event.request, response))
      .catch(_ => {/* eat any errors */ })
  )
})