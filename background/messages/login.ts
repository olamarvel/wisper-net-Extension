import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import client from "../../sanity"
import { notify } from "~utils"
import { error } from "console"

const storage = new Storage({ area: "local" })

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    const [user] =
      await client.fetch(`*[_type == "user" && username=="${req.body.username}" && password=="${req.body.Password}" && teamlead->id == "${req.body.teamLead}"]{
        _id,
        teamlead -> ,
        userStat[0] ->,
        admin,
        username
    }`)
    // !user && error('not registered')
    await storage.set("user", user)
    console.log(`user.userStat.ids`, user?.userStat?.ids)
    await storage.set("ids", user?.userStat?.ids)
    res.send({
      message: user
    })
  } catch (error) {
    await storage.set("user", null)
    await storage.set("ids", null)
    res.send({ error })
    console.log(`error`, error);
  }
}

export default handler
