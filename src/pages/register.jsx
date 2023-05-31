import React from "react"
import FormInput from "../components/formInput"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { registerActions } from "../store/actions/authActions"

class Register extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         username: "",
         fullName: "",
         email: "",
         password: "",
         confirmPassword: "",
         error: {},
      }

      this.changeHandler = this.changeHandler.bind(this)
      this.submitHandler = this.submitHandler.bind(this)
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      if (
         JSON.stringify(nextProps.auth.error) !==
         JSON.stringify(prevState.error)
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
      let { username, fullName, email, password, confirmPassword } = this.state
      this.props.registerActions({
         username,
         fullName,
         email,
         password,
         confirmPassword,
      }, this.props.history)
   }

   render() {
      let {
         username,
         fullName,
         email,
         password,
         confirmPassword,
         error,
      } = this.state
      // console.log(error.message)
      return (
         <div className="row justify-content-center">
            <div className="col-8 p-5">
               <h1 className="text-primary mb-5">Register</h1>
               <div>
               {error.message && <div className="bg-danger p-2 rounded mb-3">
                  <a style={{textDecoration: "none"}} className="text-white">{error.message}</a>
               </div>}
                  <form onSubmit={this.submitHandler}>
                     <FormInput
                        type="text"
                        labelName="Full name"
                        name="fullName"
                        value={fullName}
                        onChange={this.changeHandler}
                     />

                     <FormInput
                        type="text"
                        labelName="User name"
                        name="username"
                        value={username}
                        onChange={this.changeHandler}
                        errorInfo={error.username}
                     />
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
                     <FormInput
                        type="password"
                        labelName="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.changeHandler}
                        errorInfo={error.confirmPassword}
                     />
                     <Link to="/login"> Already registered? Login here </Link>

                     <button className="btn btn-primary btn-sm d-block my-3">
                        Register
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
      auth: state.auth, //full state of authReducers
   }
}

export default connect(mapStateToProps, { registerActions })(Register)
