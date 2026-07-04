const CSS_FILES = [
  '/css/e1a9d92d446e2cbd.css',
  '/css/840564badcbdbe5d.css',
  '/css/d55e6773d9ec3d8b.css',
  '/css/80b0597583911fcf.css',
  '/css/bdaafcd410ade57f.css',
  '/css/496e5f483a0c288c.css',
  '/css/bd10f170e509af25.css',
  '/css/0b092717d54c5e40.css',
  '/css/overrides.css',
];

export const metadata = {
  title: 'Brick and Soul',
  description:
    'Architecture and interior design studio creating soulful spaces. We design spaces with soul, where every corner tells a story.',
  metadataBase: new URL('https://brickandsoul.vercel.app'),
  openGraph: {
    title: 'Brick and Soul',
    siteName: 'Brick and Soul',
    description:
      'Architecture and interior design studio creating soulful spaces. We design spaces with soul, where every corner tells a story.',
    images: ['/images/other/MetaLogo.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brick and Soul',
    description:
      'Architecture and interior design studio creating soulful spaces. We design spaces with soul, where every corner tells a story.',
    images: ['/images/other/MetaLogo.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '256x256', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '1058x1058', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '1222x1222', type: 'image/png' }],
  },
  robots: { index: true, follow: true },
};

import SiteScripts from '@/components/SiteScripts';
import SiteChrome from '@/components/layout/SiteChrome';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google" content="notranslate" />
        {CSS_FILES.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        <SiteChrome />
        {children}
        <SiteScripts />
      </body>
    </html>
  );
}
