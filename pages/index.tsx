import Head from "next/head";
import styles from "./Homepage.module.css";
import DesktopDropdown from "../components/DesktopDropdown";
import DesktopNavLink from "../components/DesktopNavLink";

export default function HomePage() {
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
      <header className={styles.header}>
        <img
          className={styles.logo}
          src="/we_are_wonderful.png"
          alt="Wonderful logo"
        />
        <nav className={styles.navRow}>
          <DesktopDropdown
            title="EIUSMOD"
            links={[
              { title: "PERSPICIATIS", href: "/" },
              { title: "OMNIS ISTE", href: "/" },
              { title: "NATUS ERROR", href: "/" },
              { title: "SIT VOLUPTATEM", href: "/" },
            ]}
          />
          <DesktopDropdown
            title="INCIDIDUNT UT"
            links={[
              {
                title:
                  "PERSPICIATIS THIS ONE HAS A REALLY LONG NAME WOW THAT'S A LOT OF TEXT FOR THE NAME OF A PAGE ON THIS SITE",
                href: "/",
              },
              { title: "OMNIS ISTE", href: "/" },
              { title: "NATUS ERROR", href: "/" },
              { title: "SIT VOLUPTATEM", href: "/" },
            ]}
          />
          <DesktopDropdown
            title="LABORE ET"
            links={[
              { title: "PERSPICIATIS", href: "/" },
              { title: "OMNIS ISTE", href: "/" },
              { title: "NATUS ERROR", href: "/" },
              { title: "SIT VOLUPTATEM", href: "/" },
            ]}
          />
          <DesktopDropdown
            title="DOLORE MAGN"
            links={[
              { title: "PERSPICIATIS", href: "/" },
              { title: "OMNIS ISTE", href: "/" },
              { title: "NATUS ERROR", href: "/" },
              { title: "SIT VOLUPTATEM", href: "/" },
            ]}
          />
          <DesktopNavLink title="ENIM" href="/" />
          <DesktopNavLink title="VENIAM" href="/" />
          <DesktopDropdown
            title="QUIS"
            links={[
              { title: "PERSPICIATIS", href: "/" },
              { title: "OMNIS ISTE", href: "/" },
              { title: "NATUS ERROR", href: "/" },
              { title: "SIT VOLUPTATEM", href: "/" },
            ]}
          />
        </nav>
      </header>
    </div>
  );
}
