import { toast } from "react-toastify";

/**
 * completeMessage
 * 
 * 작업이 완료되었음을 알리는 toast
 * 
 */

export const completeMessage = (toastId, message) => {
        toast.update(toastId, {
        render: message,
        type: 'success',
        autoClose: 2000
    });
}