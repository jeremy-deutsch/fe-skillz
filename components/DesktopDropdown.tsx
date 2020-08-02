import Link from "next/link";
import styles from "./DesktopDropdown.module.css";

interface Props {
  title: string;
  links: Array<{ title: string; href: string; key?: string }>;
}

export default function DesktopDropdown(props: Props) {
  return (
    <div className={styles.navButtonContainer}>
      <p tabIndex={0} className={styles.navText}>
        {props.title}
      </p>
      {/* this extra wrapper div keeps the absolutely
          positioned links container in place */}
      <div>
        <ul className={styles.linksContainer}>
          {props.links.map((link, i) => (
            <li key={link.key ?? i} className={styles.li}>
              <Link href={link.href}>
                <a className={styles.link}>{link.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
