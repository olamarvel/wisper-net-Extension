import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import client from "../../sanity"
import { createUser } from "~utils/resgister"

const storage = new Storage({area:"local"})

const handler: PlasmoMessaging.MessageHandler = async (req, res): Promise<void> => {
  try {
const {username,admin,password} = req.body
// console.log('hello');

   const message = await createUser(username,password,admin)
    res.send({
      sucess:true,
      message:message
    })
    console.log(`created`);
  } catch (error) {
    res.send({sucess:false,error})
  }
}

export default handler