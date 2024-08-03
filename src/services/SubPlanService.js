import axios from "axios"
import { getToken } from "./AuthService";

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

const BASE_REST_API_URL = 'http://localhost:8080/api/sub-plans';


export const getAllSubPlansAPI = (dailyId) => axios.get(BASE_REST_API_URL + '/daily-plan/' + dailyId);

export const getSubPlanAPI = (subId) => axios.get(BASE_REST_API_URL + '/' + subId)

export const createSubPlanAPI = (subPlan) => axios.post(BASE_REST_API_URL, subPlan)

export const updateSubPlanAPI = (subId, subPlan) => axios.put(BASE_REST_API_URL + '/' + subId, subPlan)

export const deleteSubPlanAPI = (subId) => axios.delete(BASE_REST_API_URL + '/' + subId)

export const completeSubPlanAPI = (subId) => axios.patch(BASE_REST_API_URL + '/' + subId + '/complete')

export const inCompleteSubPlanAPI = (subId) => axios.patch(BASE_REST_API_URL + '/' + subId + '/in-complete')