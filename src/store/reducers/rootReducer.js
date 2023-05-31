import { combineReducers } from "redux"
import authReducer from "./authReducer"
import detectionReducer from "./detectionReducer"

const rootReducer = combineReducers({
	auth: authReducer,
	detection: detectionReducer,
})

export default rootReducer