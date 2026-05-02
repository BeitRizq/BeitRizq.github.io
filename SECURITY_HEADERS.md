Security headers for GitHub Pages / Cloudflare

This file contains recommended HTTP response headers you should apply at the CDN or server level to harden the site. Meta tags help but server headers are stronger — GitHub Pages and many CDNs let you set them via _headers (Netlify) or Cloudflare Rules.

1) Minimal strong headers (example)

Content-Security-Policy: default-src 'self' https:; script-src 'self' https://elfsightcdn.com; img-src 'self' data: https:; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; frame-src https://www.google.com;
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: geolocation=(), microphone=(), camera=()

Notes for GitHub Pages:
- GitHub Pages doesn't let you set arbitrary response headers directly. Use Cloudflare in front of GitHub Pages and set the headers there using Transform Rules / Workers or Page Rules.

Cloudflare example (Transform Rules / Workers):
Add response header "Content-Security-Policy" with the CSP value above.
Add response header "Strict-Transport-Security" with value: max-age=63072000; includeSubDomains; preload
Add response header "X-Frame-Options" with value: SAMEORIGIN

Trusted Types (optional advanced XSS mitigation):
- Trusted Types must be enforced via a CSP policy and browser support test. Example policy in a header:
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types default; default-src 'self'; script-src 'self'

If you'd like, I can:
- Generate an exact _headers file for Netlify or a Cloudflare Worker script to set these headers.
- Help configure Cloudflare rules and test them.

Security reminder: Test CSP in report-only mode first to avoid breaking third-party scripts (e.g., Elfsight).