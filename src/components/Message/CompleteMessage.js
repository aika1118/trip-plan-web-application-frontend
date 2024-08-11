import { toast } from "react-toastify";

export const completeMessage = (toastId, message) => {
        toast.update(toastId, {
        render: message,
        type: 'success',
        autoClose: 3000
    });
}