'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

function scrollToTop() {
  if (typeof window.__chkstepanScrollToTop === 'function') {
    window.__chkstepanScrollToTop();
    return;
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function pathToPageId(pathname) {
  if (!pathname || pathname === '/') return 'overview';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/privacy')) return 'privacy';
  return 'overview';
}

function waitForPage(pageId, onReady) {
  let tries = 0;
  const maxTries = 90;

  const check = () => {
    const page = document.querySelector(`[data-page="${pageId}"]`);
    if (page) {
      requestAnimationFrame(() => {
        requestAnimationFrame(onReady);
      });
      return;
    }
    tries += 1;
    if (tries < maxTries) requestAnimationFrame(check);
    else onReady();
  };

  check();
}

function closeMenuIfOpen() {
  const btn = document.querySelector('.style-module-scss-module__MjpYSW__menuToggle');
  const menu = document.querySelector('.style-module-scss-module__MjpYSW__menu');
  if (btn) btn.classList.remove('style-module-scss-module__MjpYSW__opened');
  if (menu) {
    menu.classList.remove('style-module-scss-module__MjpYSW__opened');
    menu.style.pointerEvents = 'none';
  }
  document.body.style.overflow = '';
}

export default function SiteScripts() {
  const pathname = usePathname();
  const isFirstRoute = useRef(true);
  const bootToken = useRef(0);

  useEffect(() => {
    scrollToTop();
    closeMenuIfOpen();

    const pageId = pathToPageId(pathname);
    const token = ++bootToken.current;

    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      requestAnimationFrame(scrollToTop);
      return;
    }

    waitForPage(pageId, () => {
      if (token !== bootToken.current) return;
      // Small delay so section children (FAQ/menu items) exist before boot binds
      setTimeout(() => {
        if (token !== bootToken.current) return;
        window.__chkstepanRestart?.(pageId);
        scrollToTop();
        requestAnimationFrame(scrollToTop);
      }, 60);
    });
  }, [pathname]);

  return <Script src="/js/main.js" strategy="afterInteractive" />;
}
