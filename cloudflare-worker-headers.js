addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const newHeaders = new Headers(response.headers)

  // Security headers
  newHeaders.set('Content-Security-Policy', "default-src 'self' https:; script-src 'self' https://elfsightcdn.com; img-src 'self' data: https:; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; frame-src https://www.google.com;")
  newHeaders.set('X-Frame-Options', 'SAMEORIGIN')
  newHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  newHeaders.set('X-Content-Type-Options', 'nosniff')
  newHeaders.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

  return new Response(await response.arrayBuffer(), {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}