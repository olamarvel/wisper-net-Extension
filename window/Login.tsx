// Docs {@link https://tailwindcss.com/docs/text-color}
// import { Button } from '@material-tailwind/react';

import { Input } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { sendToBackground } from "@plasmohq/messaging"

// import { fetchUser } from "../api/user"

export default function Login() {
  const [username, setusername] = useState("")
  const [loading, setLoading] = useState(false)
  // const [password, setPassword] = useState("")
  // const [teamLead, setteamLead] = useState("")
  const Bclass =
    "bg-my-indigo grow text-center rounded-lg p-3 text-lg t cursor-pointer "
  const navigate = useNavigate()
  const handleLogin = async () => {
    setLoading(true)
    const {
      message: { token, click, message }
    } = await sendToBackground({
      name: "login",
      body: { username } //password, teamLead }
    })
    // console.log(token)
    if (token) {
      toast.success(message)
      navigate("/")
    } else if (typeof token == "undefined") {
      toast.error(message)
    } else {
      // crossOriginIsolated.log()
      // console.log(`token`, token)
      toast.error("an error occured, pls try again: ->" + message)
    }
    setLoading(false)

  }
  return (
    <>
      <div
        className="mx-2  bg-my-indigo text-white h-60 rounded-b-lg p-2 text-xl  items-center 
 flex-col relative">
        <div className="mx-2  text-white rounded-b-lg p-2 flex  flex-col relative gap-4">
          <Input
            variant="standard"
            label="Username"
            color="white"
            className="shadow-none w-full"
            id="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            type="text"
          />
          {/* <Input
            variant="standard"
            label="Password"
            color="white"
            className="shadow-none w-full"
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Input
            variant="standard"
            label="Team Lead"
            color="white"
            className="shadow-none w-full"
            id="teamLead"
            value={teamLead}
            onChange={(e) => setteamLead(e.target.value)}
            type="text"
          /> */}
        </div>
        {loading ? (
          <p>wait while we log you in</p>
        ) : (
          <p className="text">Welcome to wisperNet kindly login</p>
        )}
        {/* <p className='text-lg'> </p> */}
      </div>
      <div className="flex  flex-col w-full bg-red grow">
        <div className="absolute w-full bg-red flex gap-2 p-2  bottom-2 left">
          <div
            className={Bclass + "text-white shadow"}
            onClick={() => handleLogin()}>
            LOGIN
          </div>
          {/* <div className={Bclass + ' bg-white text-my-indigo shadow-lg'}
            onClick={() => handleButtonClick('ip')}>Ip</div> */}
        </div>
      </div>
    </>
  )
}
