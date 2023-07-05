import { v4 as uuidv4 } from "uuid"

import { Storage } from "@plasmohq/storage"

import client from "~sanity"
import { isToday } from "~utils/index"

const storage = new Storage({ area: "local" })

storage.get("ids").then((value) => {
  !value && storage.set("ids", [])
})

export async function engine(id: string): Promise<boolean> {
  try {
    const user = await storage.get("user")
    console.log(`user`, user)

    if (!user) throw new Error("No user in local storage"); 
    return await getClicks({ id: user._id, adsId: id })
  } catch (error) {
    console.error(`error`, error)
    throw error
  }
}

export const getClicks = async (details: { id: any; adsId: string }) => {
  const { id, adsId } = details
  const query = `*[_type == "user" && _id==$userId].userStat[]->|order(_createdAt desc)[0]`
  const params = { userId: id }
  const response = await client.fetch(query, params)
  console.log(`response`, response)

  if (!response) throw new Error("No response from database")
  if (response && isToday(response._createdAt))
    return await updateStat(response._id, adsId, id)
  else return await createStat(adsId, id)
}

async function createStat(adsId: string, id: any) {
  const stat = await client.create({
    _key: uuidv4(),
    _type: "stats",
    ids: [adsId]
  })
  await client
    .patch(id)
    .setIfMissing({ userStat: [] })
    .insert("after", "userStat[-1]", [{ _type: "reference", _ref: stat._id }])
    .commit()
  const [user] = await client.fetch(`*[_type == "user" && _id == "${id}"]{
      _id,
      teamlead -> ,
      userStat[0] ->
    }`)
  console.log(`user`, user)
  console.log(`stat.ids`, stat.ids)
  updateUserInStorage(user)
}

async function updateStat(response_id: string, adsId: string, id: string) {
  // Retrieve array of IDs from local storage
  const IDS = await storage.get("ids")
  if (!IDS) throw new Error("No IDs in local storage")
  if (IDS.includes(adsId)) {
    console.log(`ids include`)
    // sendToContentScript({name:"adsError",body:"id already registerd"})
    return
  }
  const stat = await client
    .patch(response_id)
    .setIfMissing({ ids: [] })
    .append("ids", [adsId])
    .commit()
  console.log(`stat`, stat)
  const [user] = await client.fetch(`*[_type == "user" && _id == "${id}"]{
           _id,
           teamlead -> , 
           userStat[0] ->
   
       }`)
  console.log(`user`, user)
  console.log(`stat.ids`, stat.ids)
  updateUserInStorage(user)
}

// Function to update user in local storage
async function updateUserInStorage(user) {
  await storage.set("user", user)
  await storage.set("ids", user?.userStat?.ids)
  await storage.set("clicks", user?.userStat?.ids?.length || 0)
}
