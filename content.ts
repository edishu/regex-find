import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://quotes.toscrape.com/*"]
}

function isVisible(element: HTMLElement) {
  const style = window.getComputedStyle(element)
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0" &&
    element.offsetWidth > 0 &&
    element.offsetHeight > 0
  )
}

function getNodesWithVisibleText() {
  let nodesWithVisibleText = []

  function collectVisibleTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
      if (isVisible(node.parentElement)) {
        nodesWithVisibleText.push(node)
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (let child of node.childNodes) {
        collectVisibleTextNodes(child)
      }
    }
  }

  collectVisibleTextNodes(document.body)

  return nodesWithVisibleText
}

const nodes = getNodesWithVisibleText()

console.log(nodes[1])
