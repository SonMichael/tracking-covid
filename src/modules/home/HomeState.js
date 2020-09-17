import { Platform } from 'react-native'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import { apiService } from '../../services'

const HOME_STATE_GET_PREMIUM_SUMMARY_REQUEST = 'HOME_STATE_GET_PREMIUM_SUMMARY_REQUEST'
const HOME_STATE_GET_PREMIUM_SUMMARY_SUCCESS = 'HOME_STATE_GET_PREMIUM_SUMMARY_SUCCESS'
const HOME_STATE_GET_PREMIUM_SUMMARY_FAILURE = 'HOME_STATE_GET_PREMIUM_SUMMARY_FAILURE'

const HOME_STATE_GET_COUNTRIES_REQUEST = 'HOME_STATE_GET_COUNTRIES_REQUEST'
const HOME_STATE_GET_COUNTRIES_SUCCESS = 'HOME_STATE_GET_COUNTRIES_SUCCESS'
const HOME_STATE_GET_COUNTRIES_FAILURE = 'HOME_STATE_GET_COUNTRIES_FAILURE'

const API_PREMIUM_SUMMARY = 'premium/summary'
const API_GET_COUNTRIES = 'countries'

export function getPremiumSummary() {

  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: HOME_STATE_GET_PREMIUM_SUMMARY_REQUEST })
    apiService.get(API_PREMIUM_SUMMARY, {}, '').then(
      responseData => {
        if (!responseData.Countries) {
          reject(responseData.Message)
          return dispatch({
            type: HOME_STATE_GET_PREMIUM_SUMMARY_FAILURE,
            error: responseData.Message,
          })
        }
        dispatch({ type: HOME_STATE_GET_PREMIUM_SUMMARY_SUCCESS, data: responseData.Countries })
        return resolve(responseData)
      },
      error => {
        console.log(error.message)
        dispatch({ type: HOME_STATE_GET_PREMIUM_SUMMARY_FAILURE, error })
      },
    )
  })
}

export function getCountries() {

  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: HOME_STATE_GET_COUNTRIES_REQUEST })
    apiService.get(API_GET_COUNTRIES, {}, '').then(
      responseData => {
        if (!responseData) {
          reject(responseData.message)
          return dispatch({
            type: HOME_STATE_GET_COUNTRIES_FAILURE,
            error: responseData.message,
          })
        }
        dispatch({ type: HOME_STATE_GET_COUNTRIES_SUCCESS, data: responseData })
        return resolve(responseData)
      },
      error => {
        console.log(error.message)
        dispatch({ type: HOME_STATE_GET_COUNTRIES_FAILURE, error })
      },
    )
  })
}

const defaultState = {
  countries: [],
  statisticByCountry: [],
};

export default function CalendarStateReducer(state = defaultState, action) {
  switch (action.type) {
    case HOME_STATE_GET_PREMIUM_SUMMARY_SUCCESS:
      return  {
        ...state,
        statisticByCountry: action.data,
      }
      break;
    case HOME_STATE_GET_COUNTRIES_SUCCESS:
      return  {
        ...state,
        countries: action.data,
      }
      break;
    default:
      return state;
  }
}
