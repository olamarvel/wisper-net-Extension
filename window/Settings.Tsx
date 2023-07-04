// import PropTypes from 'prop-types';

import { Button, Input } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { save } from "../api/parameter"

const Settings = () => {
  const [clicksWeight, setClicksWeight] = useState(1)
  const [ipWeight, setIpWeight] = useState(6)
  const [target, setTarget] = useState(80)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.User)
  const setting = useSelector((state) =>
    state.User.user ? state.User.user.userStat : null
  )
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(user)
    if (!user) navigate("/")
  }, [user, navigate])

  useEffect(() => {
    if (setting === null) {
      // Handle the case where setting is null
    } else {
      navigate("/home")
      // It's safe to use setting here
    }
  }, [navigate, setting])

  const handleSubmit = () => {
    dispatch(
      save({
        clicksWeight: parseInt(clicksWeight),
        ipWeight: parseInt(ipWeight),
        target: parseInt(target),
        id: user._id
      })
    )
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="mx-2  bg-my-indigo text-white h-60 rounded-b-lg p-2 flex justify-center items-center flex-col relative gap-4">
          <Input
            variants="standard"
            label="value of Clicks"
            color="white"
            className="shadow-none"
            id="button1Weight"
            value={clicksWeight}
            onChange={(e) => setClicksWeight(e.target.value)}
          />
          <Input
            variants="standard"
            label="value of IPs"
            color="white"
            className="shadow-none"
            id="button2Weight"
            value={ipWeight}
            onChange={(e) => setIpWeight(e.target.value)}
          />
          <Input
            variants="standard"
            label="Target to Reach"
            color="white"
            className="shadow-none"
            id="numTClicks"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <Button
            variant="gradient"
            color="white"
            size="sm"
            fullWidth
            className="mb-2 text-my-indigo"
            onClick={handleSubmit}>
            <span>start</span>
          </Button>
        </div>
      </div>
    </>
  )
}

// Settings.propTypes = { setSettings: PropTypes.func.isRequired }

export default Settings
