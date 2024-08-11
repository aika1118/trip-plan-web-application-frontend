import { toast } from "react-toastify";

export const handlingError = (error, navigator) => {
    if (!error.response){
        toast.error('알 수 없는 오류 발생')
        throw error
    }

    const { status, data } = error.response;

    switch (status){
        case 400: // BAD_REQUEST
            switch (data.errorType){
                case 'DUPLICATE_USERNAME':
                    toast.error('중복된 username')
                    break
                case 'DUPLICATE_EMAIL':
                    toast.error('중복된 email')
                    break
                case 'INVALID_USERNAME':
                    toast.error('올바르지 않은 Username')
                    break
                case 'INVALID_EMAIL':
                    toast.error('올바르지 않은 email')
                    break
                case 'INVALID_ID':
                    toast.error('올바르지 않은 Id')
                    break
                case 'BAD_ACCESS':
                    toast.error('다른 유저 정보에 접근불가')
                    break
                case 'NULL_VIOLATION':
                    toast.error('빈 값 삽입 오류')
                default:
                    toast.error('Bad Request with status 400')
            }
            break
        case 401: // Unauthorized
            toast.error('Authorization Failed')
            break
        case 404: // NOT_FOUND
            navigator('/not-found')
            break
        case 500: // Internal Server Error
            toast.error('Internal Server Error')
            break
        default:
            toast.error('알 수 없는 오류 발생')
    }
}