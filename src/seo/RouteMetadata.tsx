import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteMetadata, SITE_URL, SOCIAL_IMAGE } from './routeMetadata';

function setMeta(selector: string, attribute: 'name' | 'property', value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.append(element);
  }
  element.setAttribute(attribute, selector.match(/="([^"]+)/)?.[1] ?? '');
  element.content = value;
  element.dataset.seoManaged = 'true';
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.append(element);
  }
  element.href = href;
  element.dataset.seoManaged = 'true';
}

export function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getRouteMetadata(pathname);
    const canonical = `${SITE_URL}${page.path}`;

    document.title = page.title;
    setMeta('meta[name="description"]', 'name', page.description);
    setMeta('meta[name="robots"]', 'name', page.robots);
    setMeta('meta[property="og:title"]', 'property', page.title);
    setMeta('meta[property="og:description"]', 'property', page.description);
    setMeta('meta[property="og:url"]', 'property', canonical);
    setMeta('meta[property="og:image"]', 'property', SOCIAL_IMAGE);
    setMeta('meta[property="og:type"]', 'property', 'website');
    setMeta('meta[name="twitter:card"]', 'name', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', page.title);
    setMeta('meta[name="twitter:description"]', 'name', page.description);
    setMeta('meta[name="twitter:image"]', 'name', SOCIAL_IMAGE);
    setLink('canonical', canonical);

    document.getElementById('kuvu-structured-data')?.remove();
    if (page.path === '/') {
      const script = document.createElement('script');
      script.id = 'kuvu-structured-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Organization', name: 'Kuvu', url: SITE_URL },
          { '@type': 'WebSite', name: 'Kuvu', url: SITE_URL },
          {
            '@type': 'SoftwareApplication',
            name: 'Kuvu',
            url: SITE_URL,
            applicationCategory: 'BusinessApplication',
            description: page.description,
          },
        ],
      });
      document.head.append(script);
    }
  }, [pathname]);

  return null;
}
