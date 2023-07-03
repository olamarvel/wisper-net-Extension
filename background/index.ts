import "@plasmohq/messaging/background"

import { Storage } from "@plasmohq/storage"

import { engine } from "../utils/Clicks"

export const life = 47
console.log(`WELCOME - ${life}`)

function hasIdQueryParam(url: {
  search: string | string[][] | Record<string, string> | URLSearchParams
}): { isanAd: boolean; id: string } {
  const params = new URLSearchParams(url.search)
  const isanAd = params.has("gclid") || params.has("dclid")
  return {
    isanAd,
    id: isanAd ? params.get("gclid") || params.get("dclid") || "" : ""
  }
}

async function checkUrl(tab: chrome.tabs.Tab) {
  console.log(`tab`, tab)
  const { isanAd, id } = hasIdQueryParam({ search: tab.url })
  if (isanAd) {
    // Track time spent on the tab and record redirects
    console.log(await engine(id))
  }else{
    console.log("not an ads");
    
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
})//verifyUrl

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
