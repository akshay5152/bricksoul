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

export default function SiteScripts() {
  const pathname = usePathname();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    scrollToTop();

    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.__chkstepanRestart?.();
        scrollToTop();
        requestAnimationFrame(scrollToTop);
      });
    });
  }, [pathname]);

  return <Script src="/js/main.js" strategy="afterInteractive" />;
}
