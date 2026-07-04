export const PAGE_PATHS = {
  overview: '/',
  about: '/about',
  projects: '/projects',
  contact: '/contact',
};

export const NAV_ITEMS = [
  { href: '/', label: 'Overview', marquee: 'Start Fresh' },
  { href: '/about', label: 'About', marquee: 'My Journey' },
  { href: '/projects', label: 'Projects', marquee: 'Recent Work' },
  { href: '/contact', label: 'Contact', marquee: "Let's Talk" },
];

export const ACCENT_CLASS = {
  overview: '',
  about: 'style-module-scss-module__MjpYSW__aboutAccent',
  projects: 'style-module-scss-module__MjpYSW__projectsAccent',
  contact: 'style-module-scss-module__MjpYSW__contactAccent',
};

export const ACCENT_COLOR = {
  overview: '#729e84',
  about: '#f27ca3',
  projects: '#608fba',
  contact: '#b69178',
};

export function getMenuItems(pageId) {
  const current = PAGE_PATHS[pageId] ?? '/';
  const items = NAV_ITEMS.filter((item) => item.href !== current);
  return items.map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, '0'),
    isLast: index === items.length - 1,
  }));
}
