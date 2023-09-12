import { Collapse, IconButton } from "@material-tailwind/react"
import cssText from "data-text:~contents/index.css"
import type { PlasmoCSConfig } from "plasmo"
import type { PlasmoWatchOverlayAnchor } from "plasmo"
import { useEffect, useState } from "react"
import useAckee from "use-ackee"
import { ThemeProvider } from "@material-tailwind/react";

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

function Content() { 
  const [click] = useStorage({
    key: "click",
    instance: new Storage({ area: "local" })
  })
  // console.log(`click`, click)

  const [openNav, setOpenNav] = useStorage("OpenNav", (v) =>
    v === undefined ? true : v
  )

  const handleClick = () => {
    setOpenNav(!openNav)
  }
  const [contextState, setContextState] = useState(null)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function ({ name, body }) {
      // console.log(name)
      if (name === "notification") setContextState(body)
      return true
    })
  }, [])

  useAckee(
    location.pathname,
    {
      server: "https://wispertracker.onrender.com/",
      domainId: "4a2292a5-8c69-448d-bd6b-6368ead72656"
    },
    {
      detailed: true,
      ignoreLocalhost: true,
      ignoreOwnVisits: false
    }
  )

  return (
    <ThemeProvider>
      
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit bg-my-indigo text-white hover:bg-my-indigo/70 focus:bg-my-indigo/70 active:bg-my-indigo/70"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </IconButton>
    
      <Collapse open={openNav}>
        <div id="click_container" >
          Today's clicks = {click || 0}
          {click > 1 ? "clicks" : "click"}
          The extension state is currently:
          {contextState || "no current state"}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
      </Collapse>
    </ThemeProvider>
  )
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default Content
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}
