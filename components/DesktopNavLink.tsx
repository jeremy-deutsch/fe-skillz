import styles from "./DesktopNavButton.module.css";
import Link from "next/link";
import { useRef } from "react";
import { concatClasses } from "../helpers";

interface Props {
  title: string;
  href: string;

  keyboardNavigationId: string;
  keyboardNavigationIndex: number;
}

export default function DesktopNavLink(props: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  // a function for removing the keyboard navigation listeners on blur
  const cleanupKeyListenersRef = useRef<(() => void) | null>();

  // when we focus anywhere in this dropdown, we set up a keyboard listener
  // for changing focus in response to arrow key presses
  const setUpKeyboardListenersOnFocus = () => {
    // clean up the last listeners, just in case
    cleanupKeyListenersRef.current?.();

    // when the user presses an arrow key, use the last focused element's
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
    // save a callback for cleaning up all the things we set in this function.
    // we call this on blur, or if this function somehow runs again first
    cleanupKeyListenersRef.current = () => {
      outerRef.current?.removeEventListener("keydown", onKeyPress);
      cleanupKeyListenersRef.current = null;
    };
  };
  return (
    <div
      className={styles.navButtonContainer}
      ref={outerRef}
      onFocus={setUpKeyboardListenersOnFocus}
      onBlur={() => {
        cleanupKeyListenersRef.current?.();
      }}
    >
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
