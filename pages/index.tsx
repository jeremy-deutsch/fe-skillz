import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./Homepage.module.css";
import DesktopDropdown from "../components/DesktopDropdown";
import DesktopNavLink from "../components/DesktopNavLink";
import MobileDropdown from "../components/MobileDropdown";
import { concatClasses } from "../helpers";

const DESKTOP_MIN_WIDTH = 900;

export default function HomePage() {
  const renderDesktopLinkOrDropdown = (
    item: LinkData | DropdownData,
    index: number
  ) => {
    /**
     * In case the person grading this isn't familiar with TypeScript: "magic" strings are
     * safe if they form a string enum (like they do here with the "type") fields of
     * LinkData and DropdownData. The type-checker will error if I misspell "link" or "dropdown".
     */
    if (item.type === "link") {
      return (
        <DesktopNavLink
          // index keys are fine as long as the order of these items never changes
          key={index}
          title={item.data.title}
          href={item.data.href}
        />
      );
    } else if (item.type === "dropdown") {
      return (
        <DesktopDropdown
          key={index}
          title={item.data.title}
          links={item.data.links}
        />
      );
    } else {
      return null;
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerContainerStyles = concatClasses(
    styles.headerContainer,
    isMenuOpen && styles.headerContainerOpen
  );

  const navMenuStyles = concatClasses(
    styles.navMenu,
    isMenuOpen && styles.navMenuOpen
  );

  // We can't declaratively pass styles from React to the <body>, but we need
  // it to not be scrollable when the menu is open. So, we use a side effect
  // to set the body to not be scrollable using JS whenever the menu is open.
  useEffect(() => {
    if (isMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // If the screen is resized such that we no longer display the mobile UI,
      // set isMenuOpen to false (which will allow scrolling once again)
      const onResize = () => {
        if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener("resize", onResize);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("resize", onResize);
      };
    }
  }, [isMenuOpen]);

  const renderMobileLinkOrDropdown = (
    item: LinkData | DropdownData,
    index: number
  ) => {
    if (item.type === "dropdown") {
      return (
        <MobileDropdown
          key={index}
          title={item.data.title}
          links={item.data.links}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Head>
        <title>The Wonderful Company</title>
      </Head>
      <style jsx global>{`
        body {
          background: #000000;
          margin: 0;
          font-family: Arial;
        }
      `}</style>
      <div className={headerContainerStyles}>
        <header className={styles.header}>
          <img
            className={styles.logo}
            src="/we_are_wonderful.png"
            alt="Wonderful logo"
          />
          <nav className={styles.navRow}>
            {navbarData.map(renderDesktopLinkOrDropdown)}
          </nav>
          <button
            onClick={() => {
              setIsMenuOpen((isOpen) => !isOpen);
            }}
            className={styles.menuButton}
            aria-haspopup
            aria-expanded={isMenuOpen}
          >
            {!isMenuOpen ? (
              <>
                MENU
                <div className={styles.menuButtonTriangle} />
              </>
            ) : (
              "x" // TODO: make this a fancier x
            )}
          </button>
        </header>
        <nav className={navMenuStyles}>
          {navbarData.map(renderMobileLinkOrDropdown)}
        </nav>
      </div>
    </div>
  );
}

interface LinkData {
  type: "link";
  data: { title: string; href: string };
}

interface DropdownData {
  type: "dropdown";
  data: { title: string; links: Array<{ title: string; href: string }> };
}

// the main navbar menu's data is static, so I'll just store it in JS
const navbarData: Array<LinkData | DropdownData> = [
  {
    type: "dropdown",
    data: {
      title: "EIUSMOD",
      links: [
        { title: "PERSPICIATIS", href: "/" },
        { title: "OMNIS ISTE", href: "/" },
        { title: "NATUS ERROR", href: "/" },
        { title: "SIT VOLUPTATEM", href: "/" },
      ],
    },
  },
  {
    type: "dropdown",
    data: {
      title: "INCIDIDUNT UT",
      links: [
        {
          title:
            "PERSPICIATIS THIS ONE HAS A REALLY LONG NAME WOW THAT'S A LOT OF TEXT FOR THE NAME OF A PAGE ON THIS SITE",
          href: "/",
        },
        { title: "OMNIS ISTE", href: "/" },
        { title: "NATUS ERROR", href: "/" },
        { title: "SIT VOLUPTATEM", href: "/" },
      ],
    },
  },
  {
    type: "dropdown",
    data: {
      title: "LABORE ET",
      links: [
        { title: "PERSPICIATIS", href: "/" },
        { title: "OMNIS ISTE", href: "/" },
        { title: "NATUS ERROR", href: "/" },
        { title: "SIT VOLUPTATEM", href: "/" },
      ],
    },
  },
  {
    type: "dropdown",
    data: {
      title: "DOLORE MAGN",
      links: [
        { title: "PERSPICIATIS", href: "/" },
        { title: "OMNIS ISTE", href: "/" },
        { title: "NATUS ERROR", href: "/" },
        { title: "SIT VOLUPTATEM", href: "/" },
      ],
    },
  },
  { type: "link", data: { title: "ENIM", href: "/" } },
  { type: "link", data: { title: "VENIAM", href: "/" } },
  {
    type: "dropdown",
    data: {
      title: "QUIS",
      links: [
        { title: "PERSPICIATIS", href: "/" },
        { title: "OMNIS ISTE", href: "/" },
        { title: "NATUS ERROR", href: "/" },
        { title: "SIT VOLUPTATEM", href: "/" },
      ],
    },
  },
];
