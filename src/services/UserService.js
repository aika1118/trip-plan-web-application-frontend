import axios from "axios"

/**
 * UserService
 * 
 * User 관련한 REST API 구현
 * 
 */


const BASE_REST_API_URL = 'http://localhost:8080/api/users';


export const getUserIdAPI = (username) => axios.get(BASE_REST_API_URL + '/' + username);