import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoGetRootContainer,
  PlasmoRender
} from "plasmo"
import { createRoot } from "react-dom/client"
import convert from "react-from-dom"

export const config: PlasmoCSConfig = {
  matches: ["https://quotes.toscrape.com/*"]
}
export const getRootContainer: PlasmoGetRootContainer = () => {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainer = document.querySelector("a")
      if (rootContainer) {
        clearInterval(checkInterval)
        resolve(rootContainer)
      }
    }, 137)
  })
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  createRootContainer
}) => {
  const rootContainer = await createRootContainer()
  console.log(rootContainer)
  const x = document.createElement("div")
  x.textContent = "hhh"
  console.log(rootContainer.classList)
  rootContainer.style.color = "red"
  // const root = createRoot(rootContainer)
  // root.render(<h1>ss</h1>)
  // root.render(anchor.element)
}

// export default PlasmoOverlay
