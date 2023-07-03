import cssText from "data-text:~contents/index.css"
import type { PlasmoCSConfig } from "plasmo"
import type { PlasmoWatchOverlayAnchor } from "plasmo"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (
  updatePosition
) => {
  const interval = setInterval(() => {
    updatePosition()
  }, 8472)

  // Clear the interval when unmounted
  return () => {
    clearInterval(interval)
  }
}

function IndexContent() {
  const [click] = useStorage({
    key: "clicks",
    instance: new Storage({ area: "local" })
  })
  console.log(`click`, click)
  return (
    <div
      id="click_container bg"
      style={{
        backgroundColor: "#CC8899",
        height: "2.5rem",
        padding: "0.5rem",
        color: "white",
        borderRadius: "0.25rem",
        boxShadow:
          "0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color),0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
      }}>
      Today's clicks = {click || 0}
      {click > 1 ? "clicks" : "click"}
    </div> 
  )
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default IndexContent
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}
