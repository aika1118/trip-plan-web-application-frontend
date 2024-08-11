import axios from "axios"
import { getToken } from "./AuthService";
import { loadingMessage } from "../components/Message/LoadingMessage";
import { completeMessage } from "../components/Message/CompleteMessage";

/**
 * DailyPlanService
 * 
 * Daily Plan에 대해 GET, POST, PUT, DELETE의 REST API를 호출하는 함수를 선언 및 정의합니다.
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

const BASE_REST_API_URL = 'http://localhost:8080/api/daily-plans';


export const getAllDailyPlansAPI = async (planId) => {
    const toastId = loadingMessage('데이터 가져오는 중...')
    const response = await axios.get(BASE_REST_API_URL + '/plan/' + planId);
    completeMessage(toastId, '데이터 가져오기 완료')

    return response
}

export const getDailyPlanAPI = async (dailyId, isShowing = true) => { // isShowing : 메세지 출력 여부 (기본값 : true)
    if (!isShowing) return axios.get(BASE_REST_API_URL + '/' + dailyId)

    const toastId = loadingMessage('데이터 가져오는 중...')
    const response = await axios.get(BASE_REST_API_URL + '/' + dailyId)
    completeMessage(toastId, '데이터 가져오기 완료')

    return response
}

export const createDailyPlanAPI = async (dailyPlan) => {
    const toastId = loadingMessage('데이터 추가중...')
    const response = await axios.post(BASE_REST_API_URL, dailyPlan)
    completeMessage(toastId, '데이터 추가 완료')

    return response
}

export const updateDailyPlanAPI = async (dailyId, dailyPlan) => {
    const toastId = loadingMessage('데이터 업데이트 중...')
    const response = await axios.put(BASE_REST_API_URL + '/' + dailyId, dailyPlan)
    completeMessage(toastId, '데이터 업데이트 완료')

    return response
}

export const deleteDailyPlanAPI = async (dailyId) => {
    const toastId = loadingMessage('데이터 삭제중...')
    const response = await axios.delete(BASE_REST_API_URL + '/' + dailyId)
    completeMessage(toastId, '데이터 삭제 완료')

    return response
}