import axios from "axios";
import urlConfig from "../config/RestApiUrlConfig";

const AUTH_REST_API_BASE_URL = 'http://' + urlConfig.IP + ':' + urlConfig.PORT + '/api/auth'

// register API 호출
export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj)

// login API 호출
export const loginAPICall = (usernameOrEmail, password) => axios.post(AUTH_REST_API_BASE_URL + '/login', {usernameOrEmail, password}) // 서버 측 DTO와 variabel name 일치해야함

// JWT를 localStorage에 저장
export const storeToken = (token) => localStorage.setItem("token", token)

// localStorage에서 JWT 얻기
export const getToken = () => localStorage.getItem("token")

// 로그인 유저의 id (username 또는 email), role을 sessionStorage에 저장
export const saveLoggedInUser = (usernameOrEmail, role) => {
    sessionStorage.setItem("authenticatedUser", usernameOrEmail)
    sessionStorage.setItem("role", role)
}

// sessionStorage 값 기반으로 로그인한 유저인지 체크
export const isUserLoggedIn = () => {
    const usernameOrEmail = sessionStorage.getItem("authenticatedUser") // 세션데이터는 탭을 닫으면 사라짐

    if (!usernameOrEmail){
        logout()
        return false;
    }

    return true;
}

// 로그인한 유저의 username 얻기
export const getLoggedInUser = () => {
    const usernameOrEmail = sessionStorage.getItem("authenticatedUser")

    if (!usernameOrEmail) // sessionStorage에 username 정보가 없으면 logout 처리 (정상적으로 로그인했으면 있어야할 정보기 때문)
        logout()

    return usernameOrEmail
}

// 로그아웃을 위해 localStorage, sessoinStorage 모두 비우기
export const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
}

// Admin 역할을 가진 유저인지 체크
export const isAdminUser = () => {

    let role =  sessionStorage.getItem("role")
    if (role != null && role == "ROLE_ADMIN")
        return true;
    else
        return false;
}