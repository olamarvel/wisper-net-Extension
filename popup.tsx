import { useEffect, useState } from "react"

import "./style.css"

import {
  Route,
  HashRouter as Router,
  Routes,
  useNavigate
} from "react-router-dom"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import Login from "~window/Login"
import MyNavbar from "~window/Navbar"
import Home from "~window/home"

function IndexPopup() {
  const [data, setData] = useState("")
  const [user] = useStorage({
    key: "hailing",
    instance: new Storage({
      area: "local"
    })
  })
  const navigate = useNavigate()
  // useEffect(() => {
  //   console.log(user)
  //   if (!user) navigate("/")
  // }, [user])
 
  return (
    <div className="App h-full py-6 px-6 bg-my-indigo flex flex-col">
      <MyNavbar newTab={false} />
      <div className="relative bg-white w-full h-full shadow-lg rounded flex flex-col">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/login" Component={() => <Login />} />
          <Route index path="/" Component={() => <Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default () => {
  return (
    <Router>
      <IndexPopup />
    </Router>
  )
}
