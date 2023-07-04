import { toast } from "react-toastify"

export function error(errorDetails) {
  console.error(errorDetails)
  toast.error(`An error occurred: ${errorDetails.message}. Please try again. If the problem persists, contact the developer.`)

}

export function notify(message, type = "info") {
  if (type === "info") toast.info(message)
  else toast.success(message)
}

export function isToday(dateString) {
  try {
    const date = new Date(dateString)
    if (isNaN(date)) {
      console.error("Invalid date string: ", dateString)
      return false
    }
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  } catch (err) {
    console.error("Error parsing date string: ", err)
    error(err)
    return false
  }
}
