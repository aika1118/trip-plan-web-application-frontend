import { toast } from "react-toastify"

/**
 * loadingMessage
 * 
 * 로딩중을 알리는 toast
 * 
 */

export const loadingMessage = (message) => {
    return toast.info(message, {
        autoClose: false
    })
}
