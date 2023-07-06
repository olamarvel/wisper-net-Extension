import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import "~newtab/index.css"
import Login from "~window/Login"

import MyNavbar from "~window/Navbar"
import SignUp from "~window/Signup"
import Home from "~window/home"

import "react-toastify/dist/ReactToastify.css"

function IndexNewtab() {
  const [data, setData] = useState("")

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          Component={() => (
            <div className="App h-full py-6 px-6 bg-my-indigo flex flex-col">
              <MyNavbar newTab={true}/>
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
                  <Route index path="*" Component={() => <Home />} />
                </Routes>
              </div>
            </div>
          )}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default IndexNewtab
