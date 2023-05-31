import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logoutAction } from "../store/actions/authActions"
import { redundancyChecker } from "../store/actions/detectionActions"

class Home extends React.Component {
	render() {
		const { user } = this.props.auth
		return (
			<div className="row">
				<div className="col-1"></div>
				<div className="col-10 mb-5">
					<div className="row justify-content-center">
						<div className="p-3">
							<div>
								<span
									className="badge badge-primary mb-3 mt-3"
									style={{ fontSize: 18, padding: 10 }}
								>
									উদ্দেশ্য শনাক্তকরণ ও স্লট পূরণ
								</span>
								<div className="bg-warning rounded">
									<h5 className="p-2">
										অনেকটা
										<span className="badge badge-dark mb-1 ml-1 mr-1">
											ATIS (Airline Travel Information System)
										</span>
										এবং
										<span className="badge badge-dark ml-1 mr-1">
											SNIPS
										</span>
										কে স্ট্যান্ডার্ড ধরে আমি
										<span className="badge badge-primary mr-1 ml-1">
											Intent Detection and Slot Filling
										</span>
										এর উপর বাংলায় একটা সমৃদ্ধ ডাটাসেট বানানোর চেষ্টা
										করছি । এরই অংশ হিসেবে আসলে এই ওয়েবসাইটটা বানানো ।
									</h5>
								</div>
								{user.username && (
									<div
										className="rounded mt-3 mb-2"
										style={{ background: "coral" }}
									>
										<h5 className="p-2">
											হ্যালো,
											<span className="badge badge-secondary ml-1 mr-1">
												{user.fullName}
											</span>
											তোমাকে আমাদের এই Campaign এ স্বাগতম :)
										</h5>
									</div>
								)}
								<div
									className="rounded mt-5"
									style={{ background: "lightgreen" }}
								>
									<h5 className="p-2">এটা কিভাবে কাজ করে?</h5>
								</div>
								<div
									className="rounded mt-2 mb-2 ml-4"
									style={{ background: "lightgreen" }}
								>
									<h5 className="p-2">
										প্রথমেই অ্যানোট্যাঁটরকে{" "}
										<Link to="register">রেজিস্ট্রেশন</Link> করে{" "}
										<Link to="login">লগইন</Link> করতে হবে ।
									</h5>
								</div>
								<div
									className="rounded mt-2 mb-2 ml-4"
									style={{ background: "lightgreen" }}
								>
									<h5 className="p-2">
										এরপর, অ্যানোট্যাঁটর তার{" "}
										{this.props.auth.isAuthenticated ? (
											<Link to="/dashboard">ড্যাশবোর্ডে</Link>
										) : (
											"ড্যাশবোর্ডে"
										)}{" "}
										গিয়ে ইচ্ছামতো{" "}
										<span className="badge badge-dark mb-1 ml-1 mr-1">
											intent
										</span>
										বাছাই করে{" "}
										<span className="badge badge-dark mb-1 ml-1 mr-1">
											create
										</span>{" "}
										বাটনে ক্লিক করে অ্যানোট্যাঁশন শুরু করতে পারবে।
										প্রত্যেকবারে সে ৩০ টা করে বাক্য অ্যানোট্যাঁট করতে
										পারবে। এরপর সে চাইলে আবার নতুন করে ডাটা লোড করতে
										পারবে । এভাবে সে তার সাধ্য অনুযায়ী ডাটা
										অ্যানোট্যাঁট করতে পারবে।
									</h5>
								</div>
								<div
									className="rounded mt-2 mb-2 ml-4"
									style={{ background: "lightgreen" }}
								>
									<h5 className="p-2">
										যদি সে তার কৃত কার্য দেখতে চায়, তবে তাকে{" "}
										{this.props.auth.isAuthenticated ? (
											<Link to="/dashboard">ড্যাশবোর্ডে</Link>
										) : (
											"ড্যাশবোর্ডে"
										)}{" "}
										গিয়ে{" "}
										<span className="badge badge-primary mb-1 ml-1 mr-1">
											'এইখানে'
										</span>{" "}
										লিঙ্কে ক্লিক করতে হবে ।
									</h5>
								</div>
								<div
									className="rounded mt-2 mb-2 ml-4"
									style={{ background: "lightgreen" }}
								>
									<h5 className="p-2">শেষ, চিল :)</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.props.auth.isAuthenticated ? (
					<div className="p-3">
						<button className="btn btn-primary btn-sm" onClick={() => this.props.redundancyChecker()}>
							When needed :)
						</button>
					</div>
				) : (
					<div></div>
				)}

				<div className="col-1"></div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}
export default connect(mapStateToProps, { logoutAction, redundancyChecker })(
	Home
)
