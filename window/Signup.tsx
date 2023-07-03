// Docs {@link https://tailwindcss.com/docs/text-color}
// import { Button } from '@material-tailwind/react';

import { Input } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

// import { fetchUser } from "../api/user"

export default function SignUp() {
  const Bclass =
    "bg-my-indigo grow text-center rounded-lg p-3 text-lg t cursor-pointer "
  const [username, setusername] = useState("")
  const [password, setPassword] = useState("")
  
  const [user] = useStorage({
    key: "user",
    instance: new Storage({
      area: "local"
    })
  })
  const navigate = useNavigate()
  const handleSignup = async () => {
    
    if(!user?.admin){
      toast.error("user is not an admin")
      return
    }
    console.log('creatng');
    const { message,sucess } = await sendToBackground({
      name: "signup",
      body: { username, password,admin:user.username  }
    })
    console.log(message)
    if (message && sucess) {
      toast.success("The user is created")
      navigate('/')
    } else {
      toast.error("an error occured, pls try again")
    }
  }
  return (
    <>
      <div
        className="mx-2  bg-my-indigo text-white h-60 rounded-b-lg p-2 text-xl  items-center 
 flex-col relative">
        {user ? (
          <>
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
              <Input
                variant="standard"
                label="Password"
                color="white"
                className="shadow-none w-full"
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <p className="text">
              Welcome to wisperNet{" "}
              <span>Note you must be an Admin to create a user </span>
            </p>
          </>
        ) : (
          <>you are not logged , pls login</>
        )}
        {/* <p className='text-lg'> </p> */}
      </div>
      <div className="flex  flex-col w-full bg-red grow">
        <div className="absolute w-full bg-red flex gap-2 p-2  bottom-2 left">
          <div
            className={Bclass + "text-white shadow"}
            onClick={() => handleSignup()}>
            SignUp
          </div>
          {/* <div className={Bclass + ' bg-white text-my-indigo shadow-lg'}
            onClick={() => handleButtonClick('ip')}>Ip</div> */}
        </div>
      </div>
    </>
  )
}
