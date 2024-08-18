import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div>
      <input onChange={(e) => setData(e.target.value)} value={data} />
    </div>
  )
}

export default IndexPopup
