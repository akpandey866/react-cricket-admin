import React from 'react'
import { toast } from 'react-toastify'

const ToastComponent = (message, type) => {
  toast.dismiss()
  switch (type) {
    case 'success':
      return toast.success(<p>{message}</p>, {
        position: 'top-right',
      })
    case 'error':
      return toast.error(<p>{message}</p>, {
        position: 'top-right',
      })
    case 'warning':
      return toast.warning(<p>{message}</p>, {
        position: 'top-right',
      })
    case 'dismiss':
      return toast.dismiss()
    default:
      return toast.warning(<p>{message}</p>, {
        position: 'top-right',
      })
  }
}
export default ToastComponent
