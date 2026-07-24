import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="style-module-scss-module__1eBtna__footerWrapper ">
        <div className="style-module-scss-module__1eBtna__footerInner">
          <div className="style-module-scss-module__1eBtna__footerSticky">
            <div className="style-module-scss-module__1eBtna__background">
              <div className="container">
                <div className="style-module-scss-module__1eBtna__content">
                  <div className="style-module-scss-module__1eBtna__links">
                    <img
                      alt="Logo"
                      loading="lazy"
                      width={60}
                      height={60}
                      decoding="async"
                      data-nimg={1}
                      className="style-module-scss-module__1eBtna__logo"
                      style={{ color: 'transparent' }}
                      src="/images/brand/Logo.svg"
                    />
                    <div className="style-module-scss-module__1eBtna__col style-module-scss-module__1eBtna__colLeft">
                      <div>
                        <div className="style-module-scss-module__jMWBMW__lineMask">
                          <a
                            href="mailto:Bricknsoul@gamil.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="style-module-scss-module__jMWBMW__link "
                          >
                            <span className="style-module-scss-module__jMWBMW__linkText style-module-scss-module__jMWBMW__linkTextWhite style-module-scss-module__jMWBMW__linkTextBottom">
                              Bricknsoul@gamil.com
                            </span>
                          </a>
                        </div>
                      </div>
                      <p className="style-module-scss-module__1eBtna__bottomText">
                        India - <span>:</span>
                      </p>
                    </div>
                    <div className="style-module-scss-module__1eBtna__col style-module-scss-module__1eBtna__colLeft">
                      <div>
                        <div className="style-module-scss-module__jMWBMW__lineMask">
                          <Link className="style-module-scss-module__jMWBMW__link " href="/">
                            <span className="style-module-scss-module__jMWBMW__linkText style-module-scss-module__jMWBMW__linkTextWhite">
                              Overview
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="style-module-scss-module__jMWBMW__lineMask">
                          <Link className="style-module-scss-module__jMWBMW__link " href="/contact">
                            <span className="style-module-scss-module__jMWBMW__linkText style-module-scss-module__jMWBMW__linkTextWhite">
                              Contact
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="style-module-scss-module__jMWBMW__lineMask">
                          <Link
                            className="style-module-scss-module__jMWBMW__link "
                            href="/projects"
                          >
                            <span className="style-module-scss-module__jMWBMW__linkText style-module-scss-module__jMWBMW__linkTextWhite style-module-scss-module__jMWBMW__linkTextBottom">
                              Projects
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="style-module-scss-module__jMWBMW__lineMask">
                          <Link className="style-module-scss-module__jMWBMW__link " href="/about">
                            <span className="style-module-scss-module__jMWBMW__linkText style-module-scss-module__jMWBMW__linkTextWhite">
                              About
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="style-module-scss-module__1eBtna__col style-module-scss-module__1eBtna__colRight">
                      <div>
                        <div className="style-module-scss-module__jMWBMW__lineMask">
                          <a
                            href="https://www.instagram.com/brick_n_soul/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="style-module-scss-module__jMWBMW__link "
                          >
                            <span className="style-module-scss-module__jMWBMW__linkText style-module-scss-module__jMWBMW__linkTextWhite style-module-scss-module__jMWBMW__linkTextBottom">
                              instagram
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="style-module-scss-module__1eBtna__col style-module-scss-module__1eBtna__colRight">
                      <div>
                        <div className="style-module-scss-module__jMWBMW__lineMask">
                          <Link className="style-module-scss-module__jMWBMW__link " href="/privacy">
                            <span className="style-module-scss-module__jMWBMW__linkText style-module-scss-module__jMWBMW__linkTextWhite style-module-scss-module__jMWBMW__linkTextBottom">
                              Privacy Policy
                            </span>
                          </Link>
                        </div>
                      </div>
                      <p className="style-module-scss-module__1eBtna__bottomText">
                        ©2026 All Rights Reserved
                      </p>
                    </div>
                  </div>
                  <div
                    className="style-module-scss-module__1eBtna__horizontalLine"
                    style={{ backgroundColor: '#729e84', transform: 'scaleX(0)' }}
                  />
                  <svg
                    className="style-module-scss-module__1eBtna__boldTextImage"
                    viewBox="0 0 1389 360"
                    width={1389}
                    height={360}
                    preserveAspectRatio="xMidYMid meet"
                    role="img"
                    aria-label="Brick & Soul"
                  >
                    <text
                      x="0"
                      y="300"
                      fill="#FDFDFD"
                      fontFamily="Thunder-LC, sans-serif"
                      fontWeight="600"
                      fontSize="320"
                      letterSpacing="-0.01em"
                      textLength="1389"
                      lengthAdjust="spacing"
                    >
                      BRICK &amp; SOUL
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <div className="style-module-scss-module__1eBtna__explosionContainer" />
            <div className="style-module-scss-module__1eBtna__overlay" />
          </div>
        </div>
      </footer>
    </>
  );
}
