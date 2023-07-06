// Docs {@link https://tailwindcss.com/docs/text-color}

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

export default function Home() {
  const Bclass =
    "bg-my-indigo grow text-center rounded-lg p-3 text-lg t cursor-pointer "
  const [click] = useStorage({
    key: "click",
    instance: new Storage({ area: "local" })
  })
  const [token] = useStorage({
    key: "token",
    instance: new Storage({
      area: "local"
    })
  })

  return (
    <>
      <div
        className="mx-2  bg-my-indigo text-white h-60 rounded-b-lg p-2 text-xl flex 
 justify-center items-center 
 flex-col relative">
        {click ? (
          <>
            <span>Total clicks of</span>
            <span className="text-6xl"> {click}</span>
          </>
        ) : token ? (
          <span className="text-6xl">no Clicks yet</span>
        ) : (
          <span className="text-6xl">Pls login</span>
        )}

        <div
          className="text-xs absolute 
 top-0 right-2 ">
          <p>Rem:</p>
          <p>
            {0}ip <span className="text-lg">/</span>
            {0}click
          </p>
        </div>
      </div>
      <div className="flex items-center flex-col justify-center w-full bg-red grow">
        <p className="text-3xl">Time tracker</p>
        <p className="text-lg">Coming Soon ...</p>
      </div>
    </>
  )
}

// Home.propTypes = { setting?.clicksWeight: PropTypes.number.isRequired, setting?.ipWeight: PropTypes.number.isRequired, setting?.totalStat: PropTypes.number.isRequired }
