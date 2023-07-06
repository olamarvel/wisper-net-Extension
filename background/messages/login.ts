import { error } from "console"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { login, stats } from "~utils/request"

const storage = new Storage({ area: "local" })

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    console.log("loginin", req.body)
    const { token, message, click } = await login({ ...req.body })
    console.log(token, message, click)
    const {totalClicks} = await stats(token)
    // !user && error('not registered')
    
    await storage.set("token", token)
    await storage.set("click", totalClicks)

    res.send({
      message: { token, message, totalClicks }
    })
  } catch (error) {
    await storage.set("token", null)
    await storage.set("click", 0)
    res.send({ error })
    console.log(`error`, error)
  }
}

export default handler
