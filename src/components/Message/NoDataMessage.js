import { toast } from "react-toastify";

export const noDataMessage = (len) => {
    if (len)
        return
    
    toast.info('현재 데이터가 없습니다.', {
        autoClose: false
    })
}