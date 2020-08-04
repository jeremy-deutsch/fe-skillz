import { render, fireEvent, act, screen } from "@testing-library/react";
import HomePage from "./index";

describe("Dropdown keyboard navigation", () => {
  it("Moves focus down and up", async () => {
    render(<HomePage />);

    const dropdownText = document.querySelector("p.navText");
    if (!dropdownText || !(dropdownText instanceof HTMLElement)) {
      throw new Error("Could not find dropdown text!");
    }
    expect(dropdownText.getAttribute("aria-expanded")).toBe("false");
    dropdownText.focus();
    expect(dropdownText.getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement === dropdownText).toBe(true);

    const firstDropdownItem = document.querySelector("a.link[tabindex=-1]");
    if (!firstDropdownItem || !(firstDropdownItem instanceof HTMLElement)) {
      throw new Error("Could not find first dropdown item!");
    }
    expect(firstDropdownItem.style.display).not.toBe("none");

    fireEvent.keyDown(dropdownText, { key: "ArrowDown", code: "ArrowDown" });
    expect(document.activeElement === firstDropdownItem).toBe(true);

    fireEvent.keyDown(dropdownText, { key: "ArrowUp", code: "ArrowUp" });
    expect(document.activeElement === dropdownText).toBe(true);
  });

  it("Moves focus right and left", async () => {
    render(<HomePage />);

    const dropdownTexts = document.querySelectorAll("p.navText");
    const leftDropdownText = dropdownTexts[0];
    const rightDropdownText = dropdownTexts[1];

    if (
      !(leftDropdownText instanceof HTMLElement) ||
      !(rightDropdownText instanceof HTMLElement)
    ) {
      throw new Error("Could not find dropdown text!");
    }
    expect(leftDropdownText.getAttribute("aria-expanded")).toBe("false");
    leftDropdownText.focus();
    expect(leftDropdownText.getAttribute("aria-expanded")).toBe("true");
    expect(rightDropdownText.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement === leftDropdownText).toBe(true);

    const firstDropdownItem = document.querySelector("a.link[tabindex=-1]");
    if (!firstDropdownItem || !(firstDropdownItem instanceof HTMLElement)) {
      throw new Error("Could not find first dropdown item!");
    }
    expect(firstDropdownItem.style.display).not.toBe("none");

    fireEvent.keyDown(leftDropdownText, {
      key: "ArrowDown",
      code: "ArrowDown",
    });
    expect(document.activeElement === firstDropdownItem).toBe(true);

    fireEvent.keyDown(leftDropdownText, {
      key: "ArrowRight",
      code: "ArrowRight",
    });
    expect(document.activeElement === rightDropdownText).toBe(true);
    expect(rightDropdownText.getAttribute("aria-expanded")).toBe("true");
    expect(leftDropdownText.getAttribute("aria-expanded")).toBe("false");
  });
});
