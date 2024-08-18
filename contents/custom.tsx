import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoGetRootContainer,
  PlasmoRender
} from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://quotes.toscrape.com/do-not-exisit/*"]
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
  const rootContainer = (await createRootContainer()) as HTMLElement
  rootContainer.style.backgroundColor = "yellow"
}
