import { toast } from 'react-toastify'

export function error(error) {
 console.error(error)
 toast.error('an error occured pls try agian. If persist contact developer')
}

export function notify(mas, type = 'info') {
 if (type === 'info') toast.info(mas)
 else toast.success(mas)
}
export function isToday(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
