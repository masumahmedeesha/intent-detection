import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import FormInput from "../components/formInput"
import { loginAction } from "../store/actions/authActions"

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			password: "",
			error: "",
		}

		this.changeHandler = this.changeHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			JSON.stringify(
				nextProps.auth.error !== JSON.stringify(prevState.error)
			)
		) {
			return {
				error: nextProps.auth.error,
			}
		}
		return null
	}

	changeHandler(event) {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	submitHandler(event) {
		event.preventDefault()
		let { email, password } = this.state
		this.props.loginAction(
			{
				email,
				password,
			},
			this.props.history
		)
	}

	render() {
		let { email, password, error } = this.state
		//   console.log(error)
		return (
			<div className="row justify-content-center">
				<div className="col-8 p-5">
					<h1 className="text-primary mb-5">Login</h1>
					<div>
						{error.message && (
							<div className="bg-danger p-2 rounded mb-3">
								<a
									style={{ textDecoration: "none" }}
									className="text-white"
								>
									{error.message}
								</a>
							</div>
						)}
						<form onSubmit={this.submitHandler}>
							<FormInput
								type="text"
								labelName="Email"
								name="email"
								value={email}
								onChange={this.changeHandler}
								errorInfo={error.email}
							/>
							<FormInput
								type="password"
								labelName="Password"
								name="password"
								value={password}
								onChange={this.changeHandler}
								errorInfo={error.password}
							/>
							<Link to="/register"> Don't have an account ? </Link>
							<button className="btn btn-primary btn-sm my-3 d-block">
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps, { loginAction })(Login)
