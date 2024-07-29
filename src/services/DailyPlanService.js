import axios from "axios"
import { getToken } from "./AuthService";

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


export const getAllDailyPlansAPI = (planId) => axios.get(BASE_REST_API_URL + '/plan/' + planId);

export const getDailyPlanAPI = (dailyId) => axios.get(BASE_REST_API_URL + '/' + dailyId)

export const createDailyPlanAPI = (dailyPlan) => axios.post(BASE_REST_API_URL, dailyPlan)

export const updateDailyPlanAPI = (dailyId, dailyPlan) => axios.put(BASE_REST_API_URL + '/' + dailyId, dailyPlan)

export const deleteDailyPlanAPI = (dailyId) => axios.delete(BASE_REST_API_URL + '/' + dailyId)