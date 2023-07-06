import { error, notify } from "~utils"

// const url = "https://wispernet.onrender.com"
const url = "http://localhost:3000"
// export const logi = async (data) => (await axios.post(url + "/user/login",data)).data
export const login = async (data) => {
  try {
    const response = await fetch(url + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      const data = await response.json()
      // Handle successful login
      return data
    } else {
      const error = await response.json()
      // Handle login error
      console.error(error)
      return error
    }
  } catch (error) {
    // Handle network error
    console.error(error)
  }
}

export const stats = async (token) => {
  try {
    const response = await fetch(url + "/user/fetch-stats/" + token, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.ok) {
      const data = await response.json()
      // Handle successful login
      return data
    } else {
      const error = await response.json()
      // Handle login error
      console.error(error)
      return error
    }
  } catch (error) {
    // Handle network error
    console.error(error)
  }
}

export const increaseAds = async (id, token) => {
  try {
    const response = await fetch(url + "/user/add-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: id, token })
    })
    if (response.ok) {
      const data = await response.json()
      // Handle successful login
      notify(data.message)
      return data
    } else {
      const err = await response.json()
      // Handle login error
      console.error(err)
      error(err)
      return err
    }
  } catch (err) {
    // // Handle network error
    // console.error(error)
    error(err)
  }
}
