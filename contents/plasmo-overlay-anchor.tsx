import type { PlasmoCSConfig, PlasmoGetOverlayAnchorList } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://quotes.toscrape.com/*"]
}

// @ts-ignore: TODO improve return type of getElementsWithVisibleText
export const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async () => {
  // return document.q
  return getElementsWithVisibleText()
}

const PlasmoPricingExtra = () => {
  // return null
  return (
    <span
      style={{
        borderRadius: 4,
        background: "transparent",
        padding: 4
      }}>
      CSUI OVERLAY ANCHOR
    </span>
  )
}

export default PlasmoPricingExtra

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
  let elementsWithVisibleText: Set<HTMLElement> = new Set()

  function collectVisibleTextElements(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "") {
      const parentElement = node.parentElement
      if (
        parentElement &&
        isVisible(parentElement) &&
        !elementsWithVisibleText.has(parentElement)
      ) {
        elementsWithVisibleText.add(parentElement)
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Traverse the child nodes
      let childHasVisibleText = false
      node.childNodes.forEach((child) => {
        collectVisibleTextElements(child)
        if (elementsWithVisibleText.has(child as HTMLElement)) {
          childHasVisibleText = true
        }
      })

      // If a child element contains visible text, remove the current node (parent) from the set
      if (childHasVisibleText) {
        elementsWithVisibleText.delete(node as HTMLElement)
      }
    }
  }

  collectVisibleTextElements(document.body)

  return Array.from(elementsWithVisibleText)
}
