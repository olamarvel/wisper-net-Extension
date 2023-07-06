import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography
} from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function MyNavbar({ newTab }) {
  const [openNav, setOpenNav] = useState(false)

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal">
        <Link to="/setting" className="flex items-center">
          Settings
        </Link>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal">
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal">
        <Link to="/credits" className="flex items-center">
          Credits
        </Link>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal">
        {
          // newTab ? (
          //   <Link to={"/signup"} className="flex items-center">
          //     Sign Up
          //   </Link>
          // ) :
          <Link to="/login" className="flex items-center">
            Login
          </Link>
        }
      </Typography>
    </ul>
  )

  return (
    <Navbar
      className="sticky mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 bg-my-indigo rounded-none z-10 inset-0"
      blurred={false}
      shadow={false}>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium">
          Wisper Net
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        {/* <Button
          variant="gradient"
          color="white"
          size="sm"
          
          className="hidden lg:inline-block text-my-indigo">
          <span>Save</span>
        </Button> */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          {/* <Button
            variant="gradient"
            color="white"
            size="sm"
            fullWidth
            className="mb-2 text-my-indigo">
            <span>Save</span>
          </Button> */}
        </div>
      </Collapse>
    </Navbar>
  )
}
