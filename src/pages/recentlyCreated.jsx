import React from "react"
import Modal from "react-modal"
import Update from "./update"

class RecentlyCreated extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openModal: false,
			detectionId: "",
		}
	}
	componentDidMount() {
		Modal.setAppElement("body")
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
	render() {
		//dumstart
		// let genjam = [
		// 	{
		// 		createdAt: "2020-11-08T17:06:40.306Z",
		// 		intent: "food",
		// 		line: "'ডিম' কি আমিষ নাকি নিরামিষ? 2_ final",
		// 		message: "Data stored Successfully :)",
		// 		updatedAt: "2020-11-08T17:06:40.306Z",
		// 		userId: "5fa445516a245611818eb212",
		// 		_id: "5fa825a0e5f514144ab88181",
		// 		words: [
		// 			["dim", "hehw"],
		// 			["vim", "pepep"]
		// 		],
		// 	},
		// ]
		//dumyend

		let info
		if (this.props.data) {
			info = this.props.data
			// console.log(this.props.data)
		}

		//dumy
		// info = genjam

		return (
			<div>
				<div>
					Recently Created
					<div>
						{info
							? info.map((one) => {
									return (
										<div
											key={one._id}
											className="bg-warning col-11 rounded p-2 mt-3"
										>
											<div className="row">
												<div className="col-11">
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
																						color:
																							"purple",
																						fontWeight:
																							"bold",
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
												<div className="col-1">
												<button
														className="btn btn-sm btn-danger"
														onClick={() =>
															this.props.removeData(one._id)
														}
													>
														Delete
													</button>
													<button
														onClick={() =>
															this.openModal(one._id)
														}
														className="btn btn-sm btn-primary mt-1"
													>
														UPDATE
													</button>
												</div>
											</div>

											{this.state.detectionId === one._id ? (
												<Update
													isOpen={this.state.openModal}
													close={this.closeModal}
													singleLoadedData={one}
												/>
											) : null}
										</div>
									)
							  })
							: "Nothing Found"}
					</div>
				</div>
			</div>
		)
	}
}

export default RecentlyCreated
