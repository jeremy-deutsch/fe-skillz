import Link from "next/link";
import styles from "./DesktopDropdown.module.css";
import { useRef, FocusEvent, useState } from "react";
import { concatClasses } from "../helpers";

interface Props {
  title: string;
  links: Array<{ title: string; href: string; key?: string }>;

  keyboardNavigationId: string;
  keyboardNavigationIndex: number;
}

export default function DesktopDropdown(props: Props) {
  // these refs are some mutable state for driving keyboard interactions
  const outerRef = useRef<HTMLDivElement>(null);
  // the index of the most recently focused item in the dropdown
  const focusedRefIndex = useRef<number | null>(null);
  // refs to each focusable item in the dropdown, keyed by their index
  const focusableRefs = useRef<{ [index: number]: HTMLElement }>({});
  // a function for removing the keyboard navigation listeners on blur
  const cleanupKeyListenersRef = useRef<(() => void) | null>();

  // when we focus anywhere in this dropdown, we set up a keyboard listener
  // for changing focus in response to arrow key presses
  const setUpKeyboardListenersOnFocus = (e: FocusEvent<HTMLDivElement>) => {
    // clean up the last listeners, just in case
    cleanupKeyListenersRef.current?.();
    // find the index of the element that was just focused
    const targetIndex = Object.entries(focusableRefs.current).find(
      ([, el]) => el === e.target
    )?.[0];
    if (targetIndex == null) return;
    // save the index of the focused element
    focusedRefIndex.current = Number(targetIndex);

    // when the user presses an arrow key, use the last focused element's
    // index to determine the next element to focus, and focus that element.
    // note: there's probably a way to do this that uses classes/ids to switch focus
    // instead of needing refs to every element. (no speedup, just maybe cleaner.)
    const onKeyPress = (e: KeyboardEvent) => {
      const lastIndex = focusedRefIndex.current;
      if (lastIndex == null) return;
      if (e.key === "ArrowUp") {
        // for the up and down arrows, we look in our own focusableRefs
        // object for the next element to focus
        if (lastIndex === 0) return;
        focusedRefIndex.current = lastIndex - 1;
        focusableRefs.current[focusedRefIndex.current].focus();
      } else if (e.key === "ArrowDown") {
        if (!focusableRefs.current[lastIndex + 1]) return;
        focusedRefIndex.current = lastIndex + 1;
        focusableRefs.current[focusedRefIndex.current].focus();
      } else if (e.key === "ArrowRight") {
        // for the right and left arrow keys, use this element's keyboard navigation
        // index to figure out the next/previous item to focus
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
      focusedRefIndex.current = null;
      outerRef.current?.removeEventListener("keydown", onKeyPress);
      cleanupKeyListenersRef.current = null;
    };
  };

  // for properly setting aria-expanded
  const [isFocused, setIsFocused] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);
  // we use equivalent CSS logic to determine whether we've expanded, but we're
  // gonna be fine duplicating that a little here
  const ariaExpanded = isFocused || isMouseInside;

  return (
    <div
      className={styles.navButtonContainer}
      ref={outerRef}
      onFocus={(e) => {
        setUpKeyboardListenersOnFocus(e);
        setIsFocused(true);
      }}
      onBlur={() => {
        cleanupKeyListenersRef.current?.();
        setIsFocused(false);
      }}
      onMouseEnter={() => {
        setIsMouseInside(true);
      }}
      onMouseLeave={() => {
        setIsMouseInside(false);
      }}
    >
      <p
        tabIndex={0}
        className={concatClasses(
          styles.navText,
          `${props.keyboardNavigationId}-${props.keyboardNavigationIndex}`
        )}
        aria-haspopup
        aria-expanded={ariaExpanded}
        ref={(r) => {
          if (r) {
            focusableRefs.current[0] = r;
          }
        }}
      >
        {props.title}
      </p>
      {/* this extra wrapper div keeps the absolutely
          positioned links container in place */}
      <div>
        <ul className={styles.linksContainer}>
          {props.links.map((link, i) => (
            <li key={link.key ?? i} className={styles.li}>
              <Link href={link.href}>
                <a
                  className={styles.link}
                  // the links themselves aren't tabbable, since tabbing through them takes
                  // the user forever. users can use the arrow keys to navigate up/down instead
                  tabIndex={-1}
                  ref={(r) => {
                    if (r) {
                      // add one to the index, since the header reserves index 0
                      focusableRefs.current[i + 1] = r;
                    }
                  }}
                >
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
