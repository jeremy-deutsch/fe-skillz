import { useState } from "react";
import Link from "next/link";
import styles from "./MobileDropdown.module.css";
import { concatClasses } from "../helpers";

interface Props {
  title: string;
  links: Array<{ title: string; href: string; key?: string }>;
}

export default function MobileDropdown(props: Props) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  return (
    <div>
      <button
        className={concatClasses(
          styles.navButton,
          isSubmenuOpen && styles.navButtonOpen
        )}
        aria-haspopup
        aria-expanded={isSubmenuOpen}
        onClick={() => setIsSubmenuOpen((isOpen) => !isOpen)}
      >
        <p className={styles.title}>{props.title}</p>
        <p className={styles.plusMinusIcon}>{isSubmenuOpen ? "-" : "+"}</p>
      </button>
      <ul
        className={concatClasses(
          styles.linksContainer,
          isSubmenuOpen && styles.linksContainerOpen
        )}
      >
        {props.links.map((link, i) => (
          <li key={link.key ?? i} className={styles.li}>
            <Link href={link.href}>
              <a className={styles.link}>{link.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
