import styles from "./MobileNavButton.module.css";
import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

export default function MobileNavLink(props: Props) {
  return (
    <Link href={props.href}>
      <a className={styles.navButton}>{props.title}</a>
    </Link>
  );
}
