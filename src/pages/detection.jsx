import React from "react"
import Modal from "react-modal"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
	loadDetection,
	removeDetection
} from "../store/actions/detectionActions"
import UpdateForLoadedData from "./updateForLoad"

class Detection extends React.Component {
	constructor(props) {
		super(props)
		let { intent } = this.props.location.state
		this.state = {
			error: "",
			openModal: false,
			detectionId: "",
			pageNumber: 1
		}
		
		this.props.loadDetection(intent, this.state.pageNumber)
		this.handlePageNumber = this.handlePageNumber.bind(this)
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			JSON.stringify(
				nextProps.detection.error !== JSON.stringify(prevState.error)
			)
		) {
			return {
				error: nextProps.detection.error,
			}
		}
		return null
	}

	componentDidMount() {
		Modal.setAppElement("body")
	}

	componentDidUpdate(prevProps, prevState){
		let {pageNumber} = this.state
		if (prevState.pageNumber !== pageNumber){
			let { intent } = this.props.location.state
			this.props.loadDetection(intent, pageNumber)
		}
	}

	openModal = (detectionId) => {
		this.setState({
			openModal: true,
			detectionId: detectionId,
		})
	}
	closeModal = () => {
		this.setState({
			openModal: false,
			detectionId: "",
		})
	}
	handlePageNumber(event){
		this.setState({pageNumber: event.target.value})
	}
	renderPaginate(dataCount){
		let limit = 30
		let mapSize = parseInt(Math.ceil(dataCount/limit))
		let mapData = []
		for (var i=1; i<=mapSize; i++){
			mapData.push(i)
		}
		return mapData.map((single)=>{
			let classStyle = this.state.pageNumber === single ? "btn btn-sm btn-dark ml-1 mt-1" : "btn btn-sm btn-primary ml-1 mt-1" 
			return <li key={single} value={single} onClick={this.handlePageNumber} className={classStyle}>{single}</li>
		})
	}
	render() {
		let { intent, dataCount } = this.props.location.state
		// console.log(typeof(this.state.pageNumber))
		// console.log(dataCount)
		const data = this.props.detection.loadedData

		const { error } = this.state

		if (data) {
			return (
				<div className="container mb-5">
					<div className="mt-3 d-flex">
						<Link to="/select">
							<button className="btn btn-sm btn-primary">Back</button>
						</Link>
					</div>
					<div className="mt-3 d-flex">
						<div>
							<h5 style={{ color: "green", fontWeight: "bold" }}>
								উদ্দেশ্য/intent
							</h5>
						</div>
						<div>
							<span
								className="badge badge-dark ml-3"
								style={{ fontSize: 17 }}
							>
								{intent}
							</span>
						</div>
					</div>
					<div className="mt-3">
						<h4>মোট অ্যানোট্যাঁটেট বাক্যের সংখ্যা {dataCount} </h4>
					</div>
					{error.message && (
						<div className="bg-danger p-2 mt-2 rounded mb-3">
							<a
								style={{ textDecoration: "none" }}
								className="text-white"
							>
								{error.message}
							</a>
						</div>
					)}
					
					{ this.renderPaginate(dataCount) }
					
					{data.map((one) => {
						return (
							<div key={one._id} className="bg-warning rounded p-2 mt-3">
								<div className="d-flex">
									<div className="col-10">
										<div className="ml-1 p-1">
											<div>
												<span
													style={{ fontSize: 16 }}
													className="badge badge-pill badge-dark mr-1"
												>
													বাক্য
												</span>
												<span>{one.line}</span>
											</div>
											<div>
												<span
													style={{ fontSize: 14 }}
													className="badge badge-pill badge-dark mr-1 mt-2"
												>
													Intent/উদ্দেশ্য
												</span>
												<span>{one.intent}</span>
											</div>
											<div>
												<div className="row ml-1">
													<div className="mt-2 mr-2">
														<span
															style={{ fontSize: 14 }}
															className="badge badge-pill badge-dark"
														>
															শব্দগুলোর উদ্দেশ্য
														</span>
													</div>
													{one.words.map((ss, index) => {
														return (
															<span key={index} className="mt-2">
																<span>{ss[0]}</span>
																<span
																	style={{
																		fontSize: 14,
																	}}
																	className="badge badge-success ml-1"
																>
																	{ss[1]}
																</span>
																{one.words.length >
																	index + 1 && (
																	<span
																		className="mr-1 ml-1"
																		style={{
																			color: "purple",
																			fontWeight: "bold",
																		}}
																	>
																		এবং
																	</span>
																)}
															</span>
														)
													})}
												</div>
											</div>
										</div>
									</div>
									{this.state.detectionId === one._id ? (
										<UpdateForLoadedData
											isOpen={this.state.openModal}
											close={this.closeModal}
											singleLoadedData={one}
										/>
									) : null}
									<div className="col-2">
										<button
											className="btn btn-sm btn-danger"
											onClick={() =>
												this.props.removeDetection(one._id)
											}
										>
											Delete
										</button>
										<button
											onClick={() => this.openModal(one._id)}
											className="btn btn-sm btn-primary ml-1"
										>
											UPDATE
										</button>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			)
		} else {
			return (
				<div className="col-10">
					<div className="row">
						<div className="p-5">
						<Link to="/select"><button className="btn btn-sm btn-primary mb-3">Back</button></Link>
						<div className="bg-secondary p-3 rounded">
						<h3 style={{color: "white"}}>
							আপনি <span style={{fontWeight:"bold", color:"blue"}}>{intent}</span> উদ্দেশ্য/intent এ কোন বাক্য অ্যানোট্যাঁট করেননি এখন
							পর্যন্ত :( শুরু করতে <Link to="/dashboard" style={{color: "yellowgreen"}}>এই</Link> লিঙ্কে যেতে হবে :)
						</h3>
						</div>
						</div>
					</div>
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		detection: state.detection,
	}
}

export default connect(mapStateToProps, { removeDetection, loadDetection })(Detection)
