import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageSeo, siteName } from '../data/pageSeo';

function syncHeadTag(tag, key, name, attribute, value) {
  const selector = `${tag}[${key}="${name}"]`;
  let element = document.head.querySelector(selector);
  if (!value) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement(tag);
    element.setAttribute(key, name);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

let deployedSettings;

function loadDeployedSettings() {
  if (import.meta.env.DEV) return Promise.resolve({});
  deployedSettings ??= fetch('/page-seo.json')
    .then((response) => response.ok ? response.json() : {})
    .catch(() => {
      deployedSettings = undefined;
      return {};
    });
  return deployedSettings;
}

export default function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    let active = true;
    loadDeployedSettings().then((overrides) => {
      if (!active) return;
      const seo = getPageSeo(pathname, import.meta.env.VITE_SITE_URL || undefined, overrides);
      document.title = seo.title;
      syncHeadTag('link', 'rel', 'canonical', 'href', seo.canonical);
      syncHeadTag('meta', 'name', 'description', 'content', seo.description);
      syncHeadTag('meta', 'name', 'robots', 'content', seo.robots);
      syncHeadTag('meta', 'name', 'twitter:card', 'content', seo.image && 'summary');
      const social = {
        type: seo.canonical && seo.type,
        site_name: seo.canonical && siteName,
        title: seo.canonical && seo.title,
        description: seo.description,
        url: seo.canonical,
        image: seo.image,
      };
      for (const [key, value] of Object.entries(social)) {
        syncHeadTag('meta', 'property', `og:${key}`, 'content', value);
      }
    });
    return () => { active = false; };
  }, [pathname]);

  return null;
}
