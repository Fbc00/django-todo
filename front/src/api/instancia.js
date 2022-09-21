import axios from 'axios';
import url from '@/settings'
import router from "@/route/router";
const instanciaAxios = axios.create({
    baseURL: url.apiBaseUrl,
})

export function beforeRequest(config) {
    const accesToken = window.localStorage.getItem('loggedUser')
    const token = accesToken ? accesToken : null
 if (token) {
       config.headers.Authorization = `Bearer ${token}`
 }
  return config
}

export function requestError(error) {
  return Promise.reject(error)
}

instanciaAxios.interceptors.response.use(beforeRequest, requestError)

export function getSuccessResponse(response) {
  return response
}

export function getResponseError(error) {
  if (error.response && error.response.status === 401) {
    router.push({ name: 'login' })
  }
  return Promise.reject(error)
}
instanciaAxios.interceptors.response.use(getSuccessResponse, getResponseError)
instanciaAxios.defaults.xsrfCookieName = 'csrftoken'
instanciaAxios.defaults.xsrfHeaderName = 'X-CSRFToken'
export default instanciaAxios;