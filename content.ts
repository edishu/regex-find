import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://quotes.toscrape.com/*"]
}

function isVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element)

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0" &&
    element.offsetWidth > 0 &&
    element.offsetHeight > 0
  )
}

function getElementsWithVisibleText(): HTMLElement[] {
  let elementsWithVisibleText: HTMLElement[] = []

  function collectVisibleTextElements(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "") {
      const parentElement = node.parentElement
      if (
        parentElement &&
        isVisible(parentElement) &&
        !elementsWithVisibleText.includes(parentElement)
      ) {
        elementsWithVisibleText.push(parentElement)
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach((child) => collectVisibleTextElements(child))
    }
  }

  collectVisibleTextElements(document.body)

  return elementsWithVisibleText
}

const elements: HTMLElement[] = getElementsWithVisibleText()
console.log(elements)
console.log(elements.map((e) => e.textContent))
