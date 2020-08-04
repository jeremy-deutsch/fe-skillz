import styles from "./DesktopNavButton.module.css";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { concatClasses } from "../helpers";

interface Props {
  title: string;
  href: string;

  keyboardNavigationId: string;
  keyboardNavigationIndex: number;
}

export default function DesktopNavLink(props: Props) {
  const outerRef = useRef<HTMLDivElement>(null);

  // set up a keyboard listener for changing focus with the arrow keys
  useEffect(() => {
    // when the user presses an arrow key, use this element's keyboard navigation
    // index to determine the next element to focus, and focus that element
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const nextFocusItem = document.querySelector(
          `.${props.keyboardNavigationId}-${props.keyboardNavigationIndex + 1}`
        );
        if (nextFocusItem && nextFocusItem instanceof HTMLElement) {
          nextFocusItem.focus();
        }
      } else if (e.key === "ArrowLeft") {
        const prevFocusItem = document.querySelector(
          `.${props.keyboardNavigationId}-${props.keyboardNavigationIndex - 1}`
        );
        if (prevFocusItem && prevFocusItem instanceof HTMLElement) {
          prevFocusItem.focus();
        }
      }
    };
    outerRef.current?.addEventListener("keydown", onKeyPress);
    return () => {
      outerRef.current?.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  return (
    <div className={styles.navButtonContainer} ref={outerRef}>
      <Link href={props.href}>
        <a
          className={concatClasses(
            styles.navText,
            `${props.keyboardNavigationId}-${props.keyboardNavigationIndex}`
          )}
        >
          {props.title}
        </a>
      </Link>
    </div>
  );
}
