import axios from "axios"
import { getToken } from "./AuthService";
import { loadingMessage } from "../components/Message/LoadingMessage";
import { completeMessage } from "../components/Message/CompleteMessage";
import urlConfig from "../config/RestApiUrlConfig";

/**
 * SubPlanService
 * 
 * Sub Plan에 대해 GET, POST, PUT, DELETE의 REST API를 호출하는 함수를 선언 및 정의합니다.
 * 
 */

// 모든 요청을 가로채서 Authorization 헤더에 JWT를 추가
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken(); // 헤더에 JWT token 담기
    return config;

}, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
});


const BASE_REST_API_URL = 'http://' + urlConfig.IP + ':' + urlConfig.PORT + "/api/sub-plans"


export const getAllSubPlansAPI = async (dailyId) => {
    //const toastId = loadingMessage('데이터 가져오는 중...')
    const response = await axios.get(BASE_REST_API_URL + '/daily-plan/' + dailyId)
    //completeMessage(toastId, '데이터 가져오기 완료')

    return response
}

export const getSubPlanAPI = async (subId) => {
    //const toastId = loadingMessage('데이터 가져오는 중...')
    const response = await axios.get(BASE_REST_API_URL + '/' + subId)
    //completeMessage(toastId, '데이터 가져오기 완료')

    return response
}

export const createSubPlanAPI = async (subPlan) => {
    const toastId = loadingMessage('데이터 추가중...')
    const response = await axios.post(BASE_REST_API_URL, subPlan)
    completeMessage(toastId, '데이터 추가 완료')

    return response
}

export const updateSubPlanAPI = async (subId, subPlan) => {
    const toastId = loadingMessage('데이터 업데이트 중...')
    const response = await axios.put(BASE_REST_API_URL + '/' + subId, subPlan)
    completeMessage(toastId, '데이터 업데이트 완료')

    return response
}

export const deleteSubPlanAPI = async (subId) => {
    const toastId = loadingMessage('데이터 삭제중...')
    const response = await axios.delete(BASE_REST_API_URL + '/' + subId)
    completeMessage(toastId, '데이터 삭제 완료')

    return response
}

//export const completeSubPlanAPI = (subId) => axios.patch(BASE_REST_API_URL + '/' + subId + '/complete')

//export const inCompleteSubPlanAPI = (subId) => axios.patch(BASE_REST_API_URL + '/' + subId + '/in-complete')