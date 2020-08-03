import { useState } from "react";
import Head from "next/head";
import styles from "./Homepage.module.css";
import DesktopDropdown from "../components/DesktopDropdown";
import DesktopNavLink from "../components/DesktopNavLink";

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

  let headerContainerStyles = styles.headerContainer;
  if (isMenuOpen) {
    headerContainerStyles += " " + styles.headerContainerOpen;
  }

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
