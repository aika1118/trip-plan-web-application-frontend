import { toast } from "react-toastify";

/**
 * noDataMessage
 * 
 * 특정 자료를 GET 했을 때 자료가 없음을 알리는 toast
 * 
 */

export const noDataMessage = (len) => {
    if (len)
        return
    
    toast.info('현재 데이터가 없습니다.')
}