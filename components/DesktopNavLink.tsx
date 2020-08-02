import styles from "./DesktopNavButton.module.css";
import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

export default function DesktopNavLink(props: Props) {
  return (
    <div className={styles.navButtonContainer}>
      <Link href={props.href}>
        <a className={styles.navText}>{props.title}</a>
      </Link>
    </div>
  );
}
