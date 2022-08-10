import axios from 'axios';

const token = localStorage.getItem("sessionToken")?.replaceAll('"', '');

export const axiosCommon = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/user',
    headers: {
        Authorization : `Bearer ${token}`
    }
})

export const axiosAdmin = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/admin',
    headers: {
        Authorization : `Bearer ${token}`
    }
})

export const axiosAdvisor = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/advisor',
    headers: {
        Authorization : `Bearer ${token}`
    }
})

export const axiosPanel = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/panel',
    headers: {
        Authorization : `Bearer ${token}`
    }
})

export const axiosStudent = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/student',
    headers: {
        Authorization : `Bearer ${token}`
    }
})