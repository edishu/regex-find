import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchorList
} from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://quotes.toscrape.com/*"]
}

let ALL_TEXT_ELEMENTS = []

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => {
  if (ALL_TEXT_ELEMENTS.length === 0) {
    ALL_TEXT_ELEMENTS = getElementsWithVisibleText()
  }
  return ALL_TEXT_ELEMENTS
}

const PlasmoPricingExtra = (props: PlasmoCSUIProps) => {
  const anchorElement = props.anchor.element
  const anchorText = anchorElement.textContent
  const split = anchorText.split(/(a)/)
  const imputed = split.map((sp) => {
    if (sp === "a") {
      const span = document.createElement("span")
      span.style.backgroundColor = "yellow"
      span.textContent = "a"
      return span
    }
    return sp
  })
  anchorElement.replaceChildren(...imputed)
  return null
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
