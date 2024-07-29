import axios from "axios"
import { getToken } from "./AuthService";

/**
 * UserService
 * 
 * User 관련한 REST API 구현
 * 
 */

// 모든 REST_API 요청 이전에 인터셉트 후 헤더에 JWT를 담아 preflight 요청을 서버에 보내 인증을 먼저 수행
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken(); // 헤더에 JWT token 담기
    return config;

}, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
});


const BASE_REST_API_URL = 'http://localhost:8080/api/users';


export const getUserIdAPI = (username) => axios.get(BASE_REST_API_URL + '/' + username);