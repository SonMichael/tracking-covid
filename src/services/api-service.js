import isEmpty from 'lodash/isEmpty'
import projectConfig from '../../project.config'
import { authHelper } from '../helpers'
import { store } from '../redux/store'

const API_TIMEOUT = 30000

const DEVICE_INFO = {
  app_version: projectConfig.VERSION,
}

function getQueryString () {
  const queryData = {
    ...DEVICE_INFO,
  }
  return Object.entries(queryData).map(([key, value]) => `${key}=${value}`).join('&')
}

export default {
  post,
  get,
  postForm,
}

function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Server did not respond')), ms)
    return promise.then(resolve, reject)
  })
}

async function get(url, data, version = 'v1') {
  let apiPath = url
  if (data && !isEmpty(data)) {
    apiPath += `?${Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`
  }
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHelper.authHeader(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  const apiUrl = `${projectConfig.apiBaseUrl + version + apiPath + (data && !isEmpty(data) ? '&' : '?')}${getQueryString()}`
  console.log(apiUrl)
  return timeout(
    API_TIMEOUT,
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => Promise.reject(error))
        }
        return response.json()
      })
      .then(
        responseJson => {
          return responseJson
        },
        error => {
          if (error.success === false && error.data.status === 401) {
            const { message } = error.data
          }
          return error
        },
      )
      .catch(error => ({ success: false, data: [{ message: error.message }] })),
  )
}

async function postForm(url, formData, version = 'v1') {
  const apiUrl = `${projectConfig.apiBaseUrl + version + url}?${getQueryString()}`
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHelper.authHeader(),
    },
    body: formData,
  }
  return timeout(
    API_TIMEOUT,
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => Promise.reject(error))
        }
        return response.json()
      })
      .then(
        responseJson => responseJson,
        error => {
          if (error.success === false && error.data.status === 401) {
            const { message } = error.data
          }
          return error
        },
      )
      .catch(error => ({ success: false, data: [{ message: error.message }] })),
  )
}

async function post(url, data = {}, version = 'v1') {
  const body = JSON.stringify(data)
  const apiUrl = `${projectConfig.apiBaseUrl + version + url}?${getQueryString()}`
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHelper.authHeader(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  }
  return timeout(
    API_TIMEOUT,
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => Promise.reject(error))
        }
        return response.json()
      })
      .then(
        responseJson => responseJson,
        error => {
          if (error.success === false && error.data.status === 401) {
            const { message } = error.data
          }
          return error
        },
      )
      .catch(error => ({ success: false, data: [{ message: error.message }] })),
  )
}

