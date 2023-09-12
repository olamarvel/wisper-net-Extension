import { v4 as uuidv4 } from "uuid"

import { Storage } from "@plasmohq/storage"

import { increaseAds } from "./request"

const storage = new Storage({ area: "local" })

export async function engine(id: string) {
  try {
    const token = await storage.get("token")
    // console.log(`user`, token)

    if (!token) throw new Error("No token in local storage")
    return await setClick({ token, adsId: id })
  } catch (error) {
    console.error(`error`, error)
    throw error
  }
}

export const setClick = async (details: { token: string; adsId: string }) => {
  const { token, adsId } = details
  return await updateStat(adsId, token)
}

async function updateStat(adsId: string, token: string) {
  const response = await increaseAds(adsId,token)
  await storage.set("click", response?.click||0)
  const today = new Date().toISOString().replace('"', '')
  // console.log(`today`, today);
  await storage.set("clickDate", today)
  return response
} 