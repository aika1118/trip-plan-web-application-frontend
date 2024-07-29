import axios from "axios"
import { getToken } from "./AuthService";

/**
 * PlanService
 * 
 * Plan에 대해 GET, POST, PUT, DELETE의 REST API를 호출하는 함수를 선언 및 정의합니다.
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


const BASE_REST_API_URL = 'http://localhost:8080/api/plans';


export const getAllPlansAPI = (username) => axios.get(BASE_REST_API_URL + '/user/' + username);

export const getPlanAPI = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const createPlanAPI = (plan) => axios.post(BASE_REST_API_URL, plan)

export const updatePlanAPI = (id, plan) => axios.put(BASE_REST_API_URL + '/' + id, plan)

export const deletePlanAPI = (id) => axios.delete(BASE_REST_API_URL + '/' + id)