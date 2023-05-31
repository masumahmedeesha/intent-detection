import React from "react"
import { Link, NavLink, withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { logoutAction } from "../../store/actions/authActions"

class Navigation extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<NavLink to="/" activeClassName="active">
					<span className="navbar-brand text-decoration-none text-warning">
						Intent Detection & Slot filling
					</span>
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink
								to="/home"
								activeClassName="active"
								className="text-decoration-none"
							>
								<span className="nav-link">Home</span>
							</NavLink>
						</li>

						{this.props.auth.isAuthenticated && (
							<li className="nav-item">
								<NavLink
									to="/dashboard"
									activeClassName="active"
									className="text-decoration-none"
								>
									<span className="nav-link">Dashboard</span>
								</NavLink>
							</li>
						)}
					</ul>
					<ul className="navbar-nav">
						{this.props.auth.isAuthenticated ? (
							<li className="nav-item">
								<button
									onClick={() =>
										this.props.logoutAction(this.props.history)
									}
									className="btn btn-sm btn-warning"
								>
									Logout
								</button>
							</li>
						) : (
							<React.Fragment>
								<li className="nav-item">
									<NavLink to="/login" activeClassName="active">
										<span className="nav-link">Login</span>
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/register" activeClassName="active">
										<span className="nav-link">Register</span>
									</NavLink>
								</li>
							</React.Fragment>
						)}
					</ul>
				</div>
			</nav>
		)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}
export default connect(mapStateToProps, { logoutAction })(
	withRouter(Navigation)
)

{
	/* <form className="form-inline ">
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Search
						</button>
					</form> */
}
