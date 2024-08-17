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

function getNodesWithVisibleText(): Text[] {
  let nodesWithVisibleText: Text[] = []

  function collectVisibleTextNodes(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "") {
      if (node.parentElement && isVisible(node.parentElement)) {
        nodesWithVisibleText.push(node as Text)
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach((child) => collectVisibleTextNodes(child))
    }
  }

  collectVisibleTextNodes(document.body)

  return nodesWithVisibleText
}

const nodes: Text[] = getNodesWithVisibleText()
console.log(nodes)
