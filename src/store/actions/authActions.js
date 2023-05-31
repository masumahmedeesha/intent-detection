import Axios from "axios" //asynchronous
import jwtDecode from "jwt-decode"
import * as Types from "./types"

import { URLS } from "../../config/urls"
import SetAuthToken from "../../utils/setAuthToken"

//synchronous
//that's why thunk comes in which returns a extra argument named "dispatch"
export const registerActions = (user, history) => (dispatch) => {
	Axios.post(URLS.REGISTER, user)
		.then((response) => {
			dispatch({
				type: Types.USER_ERROR,
				payload: {
					error: {},
				},
			})
			//  console.log(response)
			history.push("/login")
		})
		.catch((error) => {
			// console.log(error.response.data)
			dispatch({
				type: Types.USER_ERROR,
				payload: {
					error: error.response.data,
				},
			})
		})
}

export const loginAction = (user, history) => (dispatch) => {
	Axios.post(URLS.LOGIN, user)
		.then((response) => {
			// console.log(response)
			let token = response.data.token
			localStorage.setItem("authToken", token)
			SetAuthToken(token)
			let decode = jwtDecode(token)
			// console.log(decode)
			dispatch({
				type: Types.SET_USER,
				payload: {
					user: decode,
				},
			})
			history.push("/")
		})
		.catch((error) => {
			dispatch({
				type: Types.USER_ERROR,
				payload: {
					error: error.response.data,
				},
			})
		})
}

export const logoutAction = (history) => {
	localStorage.removeItem("authToken")
	history.push("/login")
	return {
		type: Types.SET_USER,
		payload: {
			user: {},
		},
	}
}
