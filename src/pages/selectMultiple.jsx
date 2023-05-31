import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { loadDetection } from "../store/actions/detectionActions"
import { URLS } from "../config/urls"

class SelectMultiple extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedValue: "food",
			data: [],
			currentPage: 1,
			dataCount: 0
		}
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		let {selectedValue, currentPage } = this.state
		this.props.loadDetection(selectedValue,currentPage)

		axios.get(URLS.COUNT_DATA+selectedValue)
			.then(response=>{
				this.setState({dataCount: response.data.number})
			})
			.catch(error=>{console.log(error)})
		
	}

	componentDidUpdate(prevProps, prevState) {
		let {selectedValue, currentPage } = this.state
		if (prevState.selectedValue !== this.state.selectedValue) {
			this.props.loadDetection(selectedValue,currentPage)

			axios.get(URLS.COUNT_DATA+this.state.selectedValue)
			.then(response=>{
				this.setState({dataCount: response.data.number})
			})
			.catch(error=>{console.log(error)})
		}
	}

	handleChange(e) {
		this.setState({
			selectedValue: e.target.value,
		})
	}

	render() {
		// const data = this.props.detection.loadedData
		let { selectedValue, dataCount } = this.state
		// console.log(dataCount)
		return (
			<div className="container">
				<div className="p-5">
					<h5>
						যত গুলা উদ্দেশ্য/intent আছে, এগুলার মধ্যে যতগুলা বাক্য
						<span style={{ fontWeight: "bold" }} className="mr-1 ml-1">
							স্লট ফিলিং (Slot Filling)
						</span>
						করেছিলে, নিচে
						<span style={{ fontWeight: "bold" }} className="mr-1 ml-1">উদ্দেশ্য/intent</span>
						সিলেক্ট করলে অন্য পেইজে সেগুলার বিস্তারিত দেখা যাবে এবং
						প্রয়োজন অনুযায়ী
						<span style={{ fontWeight: "bold", color: "green" }} className="mr-1 ml-1">
							ইডিট/Edit
						</span>
						ও করা যাবে :)
					</h5>
				</div>
				<div className="col-10 mb-5">
					<div className="row">
						<div className="justify-content-center">
							<div className="d-flex ml-5">
								<div>
									<select
										className="form-control-sm"
										value={selectedValue}
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
											pathname: "/detection",
											state: {
												intent: selectedValue,
												dataCount: dataCount
											},
										}}
									>
										<button className="btn btn-sm btn-success">
											Go Now and SEE what you've done
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		detection: state.detection,
	}
}

export default connect(mapStateToProps, { loadDetection })(SelectMultiple)
