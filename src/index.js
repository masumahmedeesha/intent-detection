import React from "react"
import ReactDOM from "react-dom"
import jwtDecode from "jwt-decode"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import store from "./store"
import * as Types from "./store/actions/types"
import SetAuthToken from './utils/setAuthToken'

const token = localStorage.getItem("authToken")
if (token) {
   SetAuthToken(token)
	const decode = jwtDecode(token)
	store.dispatch({
		type: Types.SET_USER,
		payload: {
			user: decode,
		},
	})
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
