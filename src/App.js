import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Detection from "./pages/detection"
import Create from "./pages/create"
import RecentlyCreated from "./pages/recentlyCreated"
import Dashboard from './pages/dashboard'
import Navigation from './components/navigation/Navigation'
import SelectMultiple from './pages/selectMultiple'
import FourOFour from './components/fourOfour'

function App() {
	return (
		<BrowserRouter>
			<div>
			<Navigation/>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/detection" component={Detection} />
					<Route path="/create" component={Create} />
					<Route path="/recentlyCreated" component={RecentlyCreated} />
					<Route path="/dashboard" component={Dashboard}/>
					<Route path="/select" component={SelectMultiple}/>
					<Route component={FourOFour}/>
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App

/* <Route
path="/create"
render={(props) => <Create {...props} bakko={bakko} />}
/> 
console.log(this.props.bakko) dilei chole ashbe
*/
