import * as Types from "../actions/types"

const initialState = {
	loadedData: [],
	detectionData: [],
	error: [],
}

function detectionReducer(state = initialState, action) {
	switch (action.type) {
		case Types.LOAD_DETECTION:
			return {
				loadedData: action.payload.data,
				error: [],
				detectionData: [],
			}
		case Types.CREATE_DETECTION: {
			let data = [...state.detectionData]
			data.unshift(action.payload.createdData)
			return {
				detectionData: data,
				error: [],
				loadedData: [],
			}
		}
		case Types.REMOVE_DETECTION: {
			let data = [...state.detectionData]
			data = data.filter(
				(single) => single._id !== action.payload.detectionId
			)
			
			let lData = [...state.loadedData]
			lData = lData.filter((single)=>single._id !== action.payload.detectionId)

			return {
				error: [],
				detectionData: data,
				loadedData: lData,
			}
			// console.log(data)
		}
		case Types.UPDATE_DETECTION: {
			let data = [...state.detectionData]
			data = data.map((single) => {
				if (single._id === action.payload.updatedData._id) {
					return action.payload.updatedData
				}
				return single
			})

			let lData = [...state.loadedData]
			lData = lData.map((single) => {
				if (single._id === action.payload.updatedData._id) {
					return action.payload.updatedData
				}
				return single
			})

			return {
				detectionData: data,
				loadedData: lData,
				error: [],
			}
		}
		case Types.CHANGE_BOOLEAN:
			return { error: [] }
		case Types.REFRESH:
			return {
				loadedData: [],
				detectionData: [],
				error: [],
			}
		case Types.ERROR_DETECTION:
			return {
				...state,
				error: action.payload.error,
			}
		default:
			return state
	}
}

export default detectionReducer
