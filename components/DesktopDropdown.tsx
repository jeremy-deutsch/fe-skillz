import Link from "next/link";
import styles from "./DesktopDropdown.module.css";

interface Props {
  title: string;
  links: Array<{ title: string; route: string; key?: string }>;
}

export default function DesktopDropdown(props: Props) {
  return (
    <div className={styles.navButtonContainer}>
      <div className={styles.navButton}>
        <p tabIndex={0} className={styles.navText}>
          {props.title}
        </p>
      </div>
      <div>
        <nav className={styles.linksContainer}>
          {props.links.map((link, i) => (
            <Link href={link.route} key={link.key ?? i}>
              <a className={styles.link}>{link.title}</a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
