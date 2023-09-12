import { error } from "console"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { login, stats } from "~utils/request"
import { decode } from "jsonwebtoken";

const storage = new Storage({ area: "local" })

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    // console.log("loginin", req.body)
    const { token, message, click } = await login({ username:req.body.username,password:req.body.username })
    // console.log(token, message, click)
    const {totalClicks} = await stats(token)
    // !user && error('not registered')
    const username = decode(token).username
    
    await storage.set("token", token)
    await storage.set("username",username)
    await storage.set("click", totalClicks)
    await storage.set("clickDate", new Date().toISOString().replace('"', ''))

    res.send({     
      message: { token, message, totalClicks }
    })
  } catch (error) {
    await storage.set("token", null)
    await storage.set("username",null)
    // await storage.set("click", 0)
    res.send({ error })
    console.log(`error`, error)
  }
}

export default handler
