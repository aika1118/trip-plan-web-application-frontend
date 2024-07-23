import axios from "axios"


const BASE_REST_API_URL = 'http://localhost:8080/api/plans';


export const getAllPlans = () => axios.get(BASE_REST_API_URL);

export const getPlan = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const savePlan = (plan) => axios.post(BASE_REST_API_URL, plan)

export const updatePlan = (id, plan) => axios.put(BASE_REST_API_URL + '/' + id, plan)

export const deletePlan = (id) => axios.delete(BASE_REST_API_URL + '/' + id)