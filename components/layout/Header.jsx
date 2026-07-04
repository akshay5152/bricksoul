import Link from 'next/link';
import { ACCENT_CLASS, ACCENT_COLOR, getMenuItems } from '@/components/layout/navConfig';

function MarqueeParts({ text }) {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="style-module-scss-module__e43Opa__marqueePart"
          style={{ color: '#fdfdfd' }}
        >
          <span className="style-module-scss-module__e43Opa__marqueeText">{text}</span>
          <span className="style-module-scss-module__e43Opa__marqueeArrow">
            <div className="style-module-scss-module__e43Opa__arrowCircle">
              <div className="style-module-scss-module__e43Opa__arrowIcon">
                <img
                  alt="Arrow"
                  loading="lazy"
                  width={42}
                  height={42}
                  decoding="async"
                  data-nimg={1}
                  style={{ color: 'transparent' }}
                  src="/images/arrows/LongArrowWhite.svg"
                />
              </div>
            </div>
          </span>
        </div>
      ))}
    </>
  );
}

function MenuNavItem({ href, label, number, marquee, accentColor, isLast }) {
  return (
    <div className="style-module-scss-module__e43Opa__menuItem">
      <div
        className="style-module-scss-module__e43Opa__borderTop"
        style={{ backgroundColor: '#212121' }}
      />
      {isLast ? (
        <div
          className="style-module-scss-module__e43Opa__borderBottom"
          style={{ backgroundColor: '#212121' }}
        />
      ) : null}
      <div className="style-module-scss-module__e43Opa__textMask">
        <div style={{ transform: 'translateY(100%)' }}>
          <Link
            href={href}
            className="style-module-scss-module__e43Opa__menuItemLink"
            style={{ color: '#212121' }}
          >
            <span className="style-module-scss-module__e43Opa__numberMask">
              <span className="style-module-scss-module__e43Opa__itemNumber" style={{ opacity: 0 }}>
                {number}
              </span>
            </span>
            {label}
          </Link>
        </div>
      </div>
      <div
        className="style-module-scss-module__e43Opa__marquee"
        style={{ backgroundColor: accentColor }}
      >
        <div className="style-module-scss-module__e43Opa__marqueeInnerWrap">
          <div className="style-module-scss-module__e43Opa__marqueeInner" aria-hidden="true">
            <MarqueeParts text={marquee} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header({ pageId = 'overview' }) {
  const accent = ACCENT_CLASS[pageId] ?? '';
  const accentColor = ACCENT_COLOR[pageId] ?? ACCENT_COLOR.overview;
  const menuItems = getMenuItems(pageId);
  const toggleClass = accent
    ? `style-module-scss-module__MjpYSW__menuToggle ${accent}`
    : 'style-module-scss-module__MjpYSW__menuToggle ';
  const menuClass = accent
    ? `style-module-scss-module__MjpYSW__menu ${accent}`
    : 'style-module-scss-module__MjpYSW__menu   ';

  return (
    <header className="container">
      <div className="style-module-scss-module__wVhsRa__header">
        <div>
          <Link href="/">
            <img
              alt="Logo"
              loading="lazy"
              width={40}
              height={40}
              decoding="async"
              data-nimg={1}
              style={{ color: 'transparent' }}
              src="/images/brand/Logo.svg"
            />
          </Link>
        </div>
        <div style={{ position: 'relative', zIndex: 10000 }}>
          <button className={toggleClass} aria-label="Open menu" aria-expanded="false">
            <div className="style-module-scss-module__MjpYSW__menuToggleIcon">
              <div className="style-module-scss-module__MjpYSW__hamburger">
                <div className="style-module-scss-module__MjpYSW__menuBar" data-position="top" />
                <div className="style-module-scss-module__MjpYSW__menuBar" data-position="bottom" />
              </div>
            </div>
            <div className="style-module-scss-module__MjpYSW__menuCopy">
              <p>Menu</p>
            </div>
          </button>
        </div>
        <div className={menuClass}>
          <div className="style-module-scss-module__MjpYSW__backgroundStripes" />
          <div className="style-module-scss-module__MjpYSW__logo">
            <Link href="/">
              <img
                alt="Logo"
                loading="lazy"
                width={40}
                height={40}
                decoding="async"
                data-nimg={1}
                style={{ color: 'transparent' }}
                src="/images/brand/LogoDark.svg"
              />
            </Link>
          </div>
          <div className="style-module-scss-module__MjpYSW__flowingMenuWrapper">
            <div
              className="style-module-scss-module__e43Opa__menuWrap"
              style={{ backgroundColor: '#fdfdfd' }}
            >
              <nav className="style-module-scss-module__e43Opa__menu">
                {menuItems.map((item) => (
                  <MenuNavItem key={item.href} {...item} accentColor={accentColor} />
                ))}
              </nav>
            </div>
          </div>
          <div className="style-module-scss-module__MjpYSW__menuContent">
            <div className="style-module-scss-module__2feYcG__moon3DWrapper">
              <div
                className="style-module-scss-module__2feYcG__moon3DContainer"
                style={{ opacity: 0, transform: 'scale(0.5)' }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    pointerEvents: 'auto',
                  }}
                >
                  <div style={{ width: '100%', height: '100%' }}>
                    <canvas style={{ display: 'block' }} />
                  </div>
                </div>
              </div>
              {['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'].map((corner) => (
                <div key={corner} style={{ opacity: 0 }}>
                  <div className={`style-module-scss-module__2feYcG__icon${corner}`}>
                    <img
                      alt="Plus"
                      loading="lazy"
                      width={20}
                      height={20}
                      decoding="async"
                      data-nimg={1}
                      style={{ color: 'transparent', width: '100%', height: '100%' }}
                      src="/images/icons/PlusDark.svg"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="style-module-scss-module__MjpYSW__top">
              <div className="style-module-scss-module__MjpYSW__description">
                {[
                  'Every space holds a story waiting to be told.',
                  'We design rooms — and the feeling of coming home.',
                  'A decade of architecture and interior design,',
                  'tailored to how you live and work.',
                ].map((line) => (
                  <div key={line} className="style-module-scss-module__MjpYSW__lineMask">
                    <p style={{ transform: 'translateY(106%)' }}>{line}</p>
                  </div>
                ))}
              </div>
              <div className="style-module-scss-module__MjpYSW__socialLinks">
                <div className="style-module-scss-module__MjpYSW__col style-module-scss-module__MjpYSW__colLeft">
                  <div>
                    <div className="style-module-scss-module__jMWBMW__lineMask">
                      <div style={{ transform: 'translateY(106%)' }}>
                        <a
                          href="mailto:Bricknsoul@gamil.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="style-module-scss-module__jMWBMW__link "
                        >
                          <span className="style-module-scss-module__jMWBMW__linkText style-module-scss-module__jMWBMW__linkTextBottom">
                            Bricknsoul@gamil.com
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="style-module-scss-module__MjpYSW__lineMask">
                    <p
                      className="style-module-scss-module__MjpYSW__location"
                      style={{ transform: 'translateY(106%)' }}
                    >
                      India
                    </p>
                  </div>
                </div>
                <div className="style-module-scss-module__MjpYSW__col style-module-scss-module__MjpYSW__colRight">
                  {[
                    ['https://www.instagram.com/brick_n_soul/', 'instagram', true],
                  ].map(([href, label, bottom]) => (
                    <div key={href}>
                      <div className="style-module-scss-module__jMWBMW__lineMask">
                        <div style={{ transform: 'translateY(106%)' }}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="style-module-scss-module__jMWBMW__link "
                          >
                            <span
                              className={`style-module-scss-module__jMWBMW__linkText${
                                bottom
                                  ? ' style-module-scss-module__jMWBMW__linkTextBottom'
                                  : ''
                              }`}
                            >
                              {label}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="style-module-scss-module__MjpYSW__bottom">
              <div className="style-module-scss-module__MjpYSW__lineMask">
                <p style={{ transform: 'translateY(106%)' }}>©2026 All Rights Reserved</p>
              </div>
              <div className="style-module-scss-module__MjpYSW__lineMask">
                <p style={{ transform: 'translateY(106%)' }}>
                  Local time - <span>:</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
