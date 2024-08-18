import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchor,
  PlasmoGetInlineAnchorList
} from "plasmo"
import { useEffect, useState } from "react"

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
  const [userText, setUserText] = useState("")
  useEffect(() => {
    chrome.runtime.onConnect.addListener((port) => {
      if (port.name === "knockknock") {
        port.onMessage.addListener((msg) => {
          setUserText(msg.text)
        })
      }
    })
  }, [])

  const anchorElement = props.anchor.element
  const anchorText = anchorElement.textContent
  if (userText) {
    const re = new RegExp(`(${userText})`)
    const split = anchorText.split(re)
    const imputed = split.map((splitText) => {
      console.log(splitText)
      if (re.test(splitText)) {
        const span = document.createElement("span")
        span.style.backgroundColor = "yellow"
        span.textContent = splitText
        return span
      }
      return splitText
    })
    anchorElement.replaceChildren(...imputed)
  } else {
    anchorElement.replaceChildren(anchorText)
  }

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
