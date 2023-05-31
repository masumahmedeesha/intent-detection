import React from "react"
import axios from "axios"
import { URLS } from "../config/urls"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { refresh } from "../store/actions/detectionActions"

class Dashboard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ids: [],
			bakko: [],
			shobdo: [],
			selectedValue: "food",
			slots: [],
		}
		this.handleChange = this.handleChange.bind(this)
		this.loadSlot = this.loadSlot.bind(this)
	}

	componentDidMount() {
		this.props.refresh()
		let { selectedValue } = this.state
		let sentences = []
		let words = []
		let ids = []
		axios
			.get(URLS.LOAD_DUMY_SENTENCES + selectedValue)
			.then((response) => {
				let mainData = response.data
				if (mainData.message !== "No data found!") {
					mainData.data.map((single) => {
						sentences.push(single.line)
						ids.push(single._id)
						// console.log(ids)
						let splittedWords = single.line.split(" ")
						let middle = []
						splittedWords.map((singleWord, index) => {
							let obj = {}
							obj["id"] = index + 1
							obj["value"] = singleWord
							obj["intent"] = ""
							middle.push(obj)
						})
						words.push(middle)
					})
					this.setState({
						bakko: sentences,
						shobdo: words,
						ids: ids,
					})
				}
				// console.log(sentences)
				// console.log(words)
			})
			.catch((error) => console.log(error))

		this.loadSlot()
	}

	loadSlot() {
		let data = []
		axios
			.get(URLS.LOAD_SLOTS)
			.then((response) => {
				response.data.slots.map((single) => {
					data.push(single.slotName)
					this.setState({
						slots: data,
					})
				})
			})
			.catch((error) => console.log(error))
	}

	handleChange(e) {
		this.setState({
			selectedValue: e.target.value,
		})
	}
	render() {
		let { bakko, shobdo, selectedValue, ids, slots } = this.state
		// console.log(slots)
		// console.log(this.state.selectedValue)
		const { auth } = this.props
		// console.log(auth)
		if (auth.isAuthenticated)
		return (
			<div className="container p-4">
				<div>
					<h3> ড্যাশবোর্ড </h3>
				</div>
				<div className="bg-secondary rounded p-2">
					<div className="row ml-3 mt-2">
						<h6
							className="badge badge-warning mr-1"
							style={{ fontWeight: "bold", fontSize: 15 }}
						>
							আমি :
						</h6>
						{auth.isAuthenticated && auth.user.fullName && (
							<h6 className="text-white">{auth.user.fullName}</h6>
						)}
					</div>
					<div className="row ml-3">
						<h6
							className="badge badge-warning mr-1"
							style={{ fontWeight: "bold", fontSize: 15 }}
						>
							আমার ই-মেইল :
						</h6>
						{auth.isAuthenticated && (
							<h6 className="text-white">{auth.user.userEmail}</h6>
						)}
					</div>
					<div className="row ml-3">
						<h6
							className="badge badge-warning mr-1"
							style={{ fontWeight: "bold", fontSize: 15 }}
						>
							আমার ব্যবহৃত নাম :
						</h6>
						{auth.isAuthenticated && (
							<h6 className="text-white">{auth.user.username}</h6>
						)}
					</div>
					<div className="row ml-3">
						<h6
							className="badge badge-warning mr-1"
							style={{ fontWeight: "bold", fontSize: 15 }}
						>
							উক্ত ওয়েবসাইটে আমার অবদান :
						</h6>
						{auth.isAuthenticated && (
							<h6 className="text-white">{auth.user.role}</h6>
						)}
					</div>
				</div>

				<div style={{ background: "darkturquoise" }} className="d-flex rounded mt-3 p-2">
						<h6 style={{ fontWeight: "bold", fontSize: 15 }}>
							এই পর্যন্ত যতগুলা অ্যানোট্যাঁট করেছি তার সব গুলা দেখা যাবে এইখানে গেলে :
						</h6>
						{auth.isAuthenticated && (
							<h6 className="ml-1">
							<Link to="/select">
							<h6 style={{color: "blue"}}> এইখানে </h6>
							</Link>
							</h6>
						
					)}
				</div>

				<div className="bg-primary rounded mt-4">
					<h5 className="text-white p-2">ওকে, তাহলে শুরু করা যাক</h5>
				</div>
				{auth.user.isApproved ?
				<div className="d-flex mt-2">
					<div className="">
						<select
							className="form-control-sm"
							value={this.state.selectedValue}
							onChange={this.handleChange}
						>
							<option value="food">food</option>
							<option value="travel">travel</option>
							<option value="weather">weather</option>
							<option value="news">news</option>
						</select>
					</div>
					<div className="ml-5">
						<Link
							to={{
								pathname: "/create",
								state: {
									bakko: bakko,
									shobdo: shobdo,
									intent: selectedValue,
									ids: ids,
									slots: slots,
								},
							}}
						>
							<button className="btn btn-sm btn-success">Create</button>
						</Link>
					</div>
				</div>
				:
				<div className="d-flex rounded bg-danger ml-2">
					<h6 className="p-2">
						It looks like you don't have enough permission from <span className="badge badge-dark">Admin</span> to start over. Please Ask <span className="badge badge-dark">Masum/Limon Bhai</span> for permission. 
					</h6>
				</div>}
			</div> 
		)
		else {
			return <div className="container bg-danger rounded mt-5"> <h2 className="text-white"> আগে লগইন করুন ! </h2> </div>
		}
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
		detection: state.detection,
	}
}
export default connect(mapStateToProps, { refresh })(Dashboard)

// this.setState({
// 	bakko: [
// 		"আমার সোনার বাংলা from",
// 		"আমি তোমায় ভালবাসি",
// 		"আমি তোমায় ভালবাসি22",
// 		"আমি তোমায় ভালবাসি33",
// 	],
// 	// intent: "",
// 	shobdo: [
// 		[
// 			{ id: 1, value: "firstone", intent: "" },
// 			{ id: 2, value: "secondOne", intent: "" },
// 		],
// 		[
// 			{ id: 1, value: "সোনার", intent: "" },
// 			{ id: 2, value: "বাংলা", intent: "" },
// 		],
// 		[
// 			{ id: 1, value: "সোনার22", intent: "" },
// 			{ id: 2, value: "বাংলা22", intent: "" },
// 		],
// 		[
// 			{ id: 1, value: "সোনার33", intent: "" },
// 			{ id: 2, value: "বাংলা33", intent: "" },
// 		],
// 	],
// })
