import Head from "next/head";
import styles from "./Homepage.module.css";
import DesktopDropdown from "../components/DesktopDropdown";

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
        <div className={styles.navRow}>
          <DesktopDropdown
            title="EIUSMOD"
            links={[
              { title: "PERSPICIATIS", route: "/" },
              { title: "OMNIS ISTE", route: "/" },
              { title: "NATUS ERROR", route: "/" },
              { title: "SIT VOLUPTATEM", route: "/" },
            ]}
          />
          <DesktopDropdown
            title="INCIDIDUNT UT"
            links={[
              {
                title:
                  "PERSPICIATIS THIS ONE HAS A REALLY LONG NAME WOW THAT'S A LOT OF TEXT FOR THE NAME OF A PAGE ON THIS SITE",
                route: "/",
              },
              { title: "OMNIS ISTE", route: "/" },
              { title: "NATUS ERROR", route: "/" },
              { title: "SIT VOLUPTATEM", route: "/" },
            ]}
          />
          <DesktopDropdown
            title="LABORE ET"
            links={[
              { title: "PERSPICIATIS", route: "/" },
              { title: "OMNIS ISTE", route: "/" },
              { title: "NATUS ERROR", route: "/" },
              { title: "SIT VOLUPTATEM", route: "/" },
            ]}
          />
          <DesktopDropdown
            title="DOLORE MAGN"
            links={[
              { title: "PERSPICIATIS", route: "/" },
              { title: "OMNIS ISTE", route: "/" },
              { title: "NATUS ERROR", route: "/" },
              { title: "SIT VOLUPTATEM", route: "/" },
            ]}
          />
        </div>
      </header>
    </div>
  );
}
