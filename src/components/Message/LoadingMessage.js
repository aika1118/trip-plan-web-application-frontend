import { toast } from "react-toastify"

export const loadingMessage = (message) => {
    return toast.info(message, {
        autoClose: false
    })
}
