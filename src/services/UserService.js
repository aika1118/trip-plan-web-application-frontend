import axios from "axios"
import { getToken } from "./AuthService";

/**
 * UserService
 * 
 * User 관련한 REST API 구현
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


const BASE_REST_API_URL = 'http://localhost:8080/api/users';


export const getUserIdAPI = (username) => axios.get(BASE_REST_API_URL + '/' + username);