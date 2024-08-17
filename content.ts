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

function getVisibleTextFromDOM() {
  let visibleText = []

  function extractVisibleText(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
      if (isVisible(node.parentElement)) {
        visibleText.push(node.textContent.trim())
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (let child of node.childNodes) {
        extractVisibleText(child)
      }
    }
  }

  extractVisibleText(document.body)

  return visibleText.join(" ")
}

console.log(getVisibleTextFromDOM())
