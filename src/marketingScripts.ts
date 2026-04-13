/**
 * Carga condicional de Meta Pixel y LinkedIn Insight Tag (solo tras consentimiento).
 * No ejecutar hasta que el usuario acepte cookies de análisis/marketing.
 */

export const META_PIXEL_ID = '406711755248824';
export const LINKEDIN_PARTNER_ID = '6699001';

let marketingScriptsLoaded = false;

function injectMetaPixel(): void {
  if (typeof window === 'undefined' || document.querySelector('script[data-kuvu-meta-pixel]')) {
    return;
  }
  const script = document.createElement('script');
  script.setAttribute('data-kuvu-meta-pixel', 'true');
  script.textContent = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.body.appendChild(noscript);
}

function injectLinkedIn(): void {
  if (typeof window === 'undefined' || document.querySelector('script[data-kuvu-linkedin-loader]')) {
    return;
  }

  const init = document.createElement('script');
  init.setAttribute('data-kuvu-linkedin-init', 'true');
  init.textContent = `
    _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
  `;
  document.head.appendChild(init);

  const loader = document.createElement('script');
  loader.setAttribute('data-kuvu-linkedin-loader', 'true');
  loader.type = 'text/javascript';
  loader.async = true;
  loader.textContent = `(function(l){
    if(!l){
      window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
      window.lintrk.q=[]
    }
    var s=document.getElementsByTagName("script")[0];
    var b=document.createElement("script");
    b.type="text/javascript";b.async=true;
    b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b,s);
  })(window.lintrk);`;
  document.head.appendChild(loader);

  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.alt = '';
  img.src = `https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`;
  noscript.appendChild(img);
  document.body.appendChild(noscript);
}

/** Carga Meta Pixel + LinkedIn una sola vez (idempotente). */
export function loadMarketingScripts(): void {
  if (typeof window === 'undefined' || marketingScriptsLoaded) return;
  marketingScriptsLoaded = true;
  injectMetaPixel();
  injectLinkedIn();
}
