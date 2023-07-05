import "@plasmohq/messaging/background"

import { engine } from "../utils/Clicks"

export const life = 47
console.log(`WELCOME - ${life}`)

function hasIdQueryParam(url: {
  search: string | string[][] | Record<string, string> | URLSearchParams
}): { isanAd: boolean; id: string } {
  // Ensure url.search is a string
  if (typeof url.search !== "string") {
    throw new Error("url.search must be a string")
  }

  const params = new URLSearchParams(url.search)
  const gclid = params.get("gclid")
  const dclid = params.get("dclid")

  // Check if either gclid or dclid is present and not empty
  const isanAd = Boolean(gclid || dclid)
  const id = gclid || dclid || ""

  return { isanAd, id }
}

async function checkUrl(tab: chrome.tabs.Tab) {
  console.log(`tab`, tab?.url)
  if(!tab?.url) return
  const { isanAd, id } = hasIdQueryParam({ search: tab.url })
  if (isanAd && id) {
    try {
      const result = await engine(id)
      console.log(result)
    } catch (error) {
      console.error("Error calling engine:", error)
    }
  } else {
    console.log("not an ads")
  }
}

chrome.tabs.onUpdated.addListener(function (_tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    // Check if the URL matches the specified domains
    checkUrl(tab)
  }
})

// Event listener for tab creation
chrome.tabs.onCreated.addListener((tab) => {
  checkUrl(tab)
}) //verifyUrl

// chrome.contextMenus.create({
//   title: "Verify Clcik",
//   contexts: ["page", "selection", "image", "link"],
//   onclick: clickHandler
// })

// chrome.commands.onCommand.addListener(async function (command,tab) {
//   if (command !== "verifyUrl") return
//   await checkUrl(tab)
// })

// async function clickHandler(
//   info: chrome.contextMenus.OnClickData,
//   tab: chrome.tabs.Tab
// ) {
//   await checkUrl(tab)
// }
