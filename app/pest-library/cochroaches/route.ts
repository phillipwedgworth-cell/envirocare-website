// A legacy/misspelled URL has appeared in Search Console. Keep the correction
// isolated from the large legacy redirect table so existing migration redirects
// are untouched.
export function GET(request: Request) {
  const destination = new URL('/pest-library/cockroaches', request.url);
  destination.hostname = 'www.envirocarellc.com';
  destination.protocol = 'https:';
  return Response.redirect(destination, 301);
}
