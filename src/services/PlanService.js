import axios from "axios"


const BASE_REST_API_URL = 'http://localhost:8080/api/plans';


export const getAllPlansAPI = () => axios.get(BASE_REST_API_URL);

export const getPlanAPI = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const createPlanAPI = (plan) => axios.post(BASE_REST_API_URL, plan)

export const updatePlanAPI = (id, plan) => axios.put(BASE_REST_API_URL + '/' + id, plan)

export const deletePlanAPI = (id) => axios.delete(BASE_REST_API_URL + '/' + id)