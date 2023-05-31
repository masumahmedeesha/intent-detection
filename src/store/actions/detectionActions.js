import Axios from "axios"
import * as Types from "./types"
import { URLS } from "../../config/urls"

export const loadDetection = (intent, page) => (dispatch) => {
	Axios.get(URLS.LOAD_DETECTION+intent+`?page=${page}`)
		.then((response) => {
			// console.log(response.data.data)
			dispatch({
				type: Types.LOAD_DETECTION,
				payload: {
					data: response.data.data,
				},
			})
		})
		.catch((error) => {
			dispatch({
				type: Types.ERROR_DETECTION,
				payload: {
					error: error.response.data,
				},
			})
		})
}

export const uploadDetection = (detectionData, history) => (dispatch) => {
	Axios.post(URLS.UPLOAD_DETECTION, detectionData)
		.then((response) => {
			dispatch({
				type: Types.CREATE_DETECTION,
				payload: { createdData: response.data },
			})
		})
		.catch((error) => {
			// console.log(error.response)
			dispatch({
				type: Types.ERROR_DETECTION,
				payload: {
					error: error.response.data,
				},
			})
		})
}

export const removeDetection = (id) => (dispatch) => {
	Axios.delete(URLS.REMOVE_DETECTION + id)
		.then((response) => {
			// console.log(response.data)
			dispatch({
				type: Types.REMOVE_DETECTION,
				payload: { detectionId: response.data._id },
			})
		})
		.catch((error) => {
			console.log(error.response)
			dispatch({
				type: Types.ERROR_DETECTION,
				payload: {
					error: error.response.data,
				},
			})
		})
}

export const updateDetection = (id, detectionData) => (dispatch) => {
	Axios.put(URLS.UPDATE_DETECTION + id, detectionData)
		.then((response) => {
			dispatch({
				type: Types.UPDATE_DETECTION,
				payload: {
					updatedData: response.data,
				},
			})
		})
		.catch((error) => {
			dispatch({
				type: Types.ERROR_DETECTION,
				payload: {
					error: error.response.data,
				},
			})
		})
}

export const changeBooleanDumy = (oneObject) => (dispatch) => {
	Axios.post(URLS.CHANGE_BOOLEAN, oneObject)
		.then((response) => {
			// console.log(response.data)
		})
		.catch((error) => {
			dispatch({
				type: Types.ERROR_DETECTION,
				payload: {
					error: error.response.data,
				},
			})
		})
}

export const redundancyChecker = () => (dispatch) => {
	Axios.post(URLS.REDUNDENCY)
	.then((response) => {
		console.log('here')
		console.log(response.data)
	})
	.catch((error) => {
		console.log(error.response.data)
	})
}

export const refresh = () => (dispatch) => {
	dispatch({
		type: Types.REFRESH,
	})
}
