import { useEffect, useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0]
      const currentTabId = currentTab.id
      const port = chrome.tabs.connect(currentTabId, { name: "user-text" })
      port.postMessage({ text: data })
      port.disconnect()
    })
  }, [data])

  return (
    <div>
      <input onChange={(e) => setData(e.target.value)} value={data} />
    </div>
  )
}

export default IndexPopup
