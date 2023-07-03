import client from "~sanity"
import { v4 as uuidv4 } from "uuid"
import { Storage } from "@plasmohq/storage"
const storage = new Storage({ area: "local" })


export async function createUser(username: string ,password: string,admin:string) {
    return await client.create({
      _key: uuidv4(),
      _type: "user",
      username,
      password,
      admin
    })
  }