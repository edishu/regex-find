import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoGetRootContainer,
  PlasmoRender
} from "plasmo"
import { createRoot } from "react-dom/client"

export const config: PlasmoCSConfig = {
  matches: ["https://quotes.toscrape.com/*"]
}
export const getRootContainer: PlasmoGetRootContainer = () => {
  console.log("ddd")
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainer = document.querySelector("h1")
      if (rootContainer) {
        clearInterval(checkInterval)
        resolve(rootContainer)
      }
    }, 137)
  })
}
const PlasmoOverlay = () => {
  return (
    <span
      style={{
        borderRadius: 4,
        background: "yellow",
        padding: 4,
        position: "absolute",
        top: 0,
        left: 0,
        transform: "translateY(-24px) translateX(42px)"
      }}>
      CSUI ROOT CONTAINER
    </span>
  )
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  createRootContainer
}) => {
  const rootContainer = await createRootContainer()
  const root = createRoot(rootContainer)
  root.render(<PlasmoOverlay />)
}

export default PlasmoOverlay
