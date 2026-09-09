import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pages, SITE_URL, SOCIAL_IMAGE } from '../src/seo/routeMetadata.js';

const distDirectory = resolve('dist');
const indexPath = resolve(distDirectory, 'index.html');
const routes = ['/', '/aviso-legal', '/politica-privacidad', '/gracias'];

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function replaceTag(html, selector, replacement) {
  const result = html.replace(selector, replacement);
  if (result === html) {
    throw new Error(`Expected metadata tag was not found: ${selector}`);
  }
  return result;
}

function metaTag(attribute, name, content) {
  return `<meta ${attribute}="${name}" content="${escapeHtml(content)}">`;
}

function withRouteMetadata(html, page) {
  const canonical = `${SITE_URL}${page.path}`;
  let output = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);

  output = replaceTag(output, /<meta\b(?=[^>]*\bname="description")[^>]*>/i, metaTag('name', 'description', page.description));
  output = replaceTag(output, /<meta\b(?=[^>]*\bname="robots")[^>]*>/i, metaTag('name', 'robots', page.robots));
  output = replaceTag(output, /<link\b(?=[^>]*\brel="canonical")[^>]*>/i, `<link rel="canonical" href="${canonical}">`);
  output = replaceTag(output, /<meta\b(?=[^>]*\bproperty="og:title")[^>]*>/i, metaTag('property', 'og:title', page.title));
  output = replaceTag(output, /<meta\b(?=[^>]*\bproperty="og:description")[^>]*>/i, metaTag('property', 'og:description', page.description));
  output = replaceTag(output, /<meta\b(?=[^>]*\bproperty="og:url")[^>]*>/i, metaTag('property', 'og:url', canonical));
  output = replaceTag(output, /<meta\b(?=[^>]*\bproperty="og:image")[^>]*>/i, metaTag('property', 'og:image', SOCIAL_IMAGE));
  output = replaceTag(output, /<meta\b(?=[^>]*\bname="twitter:card")[^>]*>/i, metaTag('name', 'twitter:card', 'summary_large_image'));
  output = replaceTag(output, /<meta\b(?=[^>]*\bname="twitter:title")[^>]*>/i, metaTag('name', 'twitter:title', page.title));
  output = replaceTag(output, /<meta\b(?=[^>]*\bname="twitter:description")[^>]*>/i, metaTag('name', 'twitter:description', page.description));
  output = replaceTag(output, /<meta\b(?=[^>]*\bname="twitter:image")[^>]*>/i, metaTag('name', 'twitter:image', SOCIAL_IMAGE));

  return output;
}

const homeHtml = await readFile(indexPath, 'utf8');

for (const route of routes) {
  const page = pages[route];
  let html = withRouteMetadata(homeHtml, page);

  if (route !== '/') {
    html = html.replace(/<script id="kuvu-structured-data"[^>]*>[\s\S]*?<\/script>\s*/i, '');
  }

  const outputPath =
    route === '/' ? indexPath : resolve(distDirectory, route.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}
