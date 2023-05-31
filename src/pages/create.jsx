import React from "react"
// import axios from "axios"
import Modal from "react-modal"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import { URLS } from "../config/urls"
import DetectionFrom from "../components/detectionFrom"
import {
	uploadDetection,
	removeDetection,
	changeBooleanDumy,
} from "../store/actions/detectionActions"
import RecentlyCreated from "./recentlyCreated"
// import Warning from '../components/warning'

class Create extends React.Component {
	constructor(props) {
		super(props)
		let { bakko, shobdo, intent, ids, slots } = this.props.location.state

		this.state = {
			sentence: bakko[0] ? bakko[0] : "goback",
			sentenceId: ids[0] ? ids[0] : "goback",
			words: shobdo[0]
				? shobdo[0]
				: [{ id: 1, value: "goback", intent: "goback" }],
			intent: intent,
			error: "",
			count: 1,
			slots: slots,
			warningMessage: "",
		}
		this.changeHandler = this.changeHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
		this.changeWordHandler = this.changeWordHandler.bind(this)
		this.changeIntentHandler = this.changeIntentHandler.bind(this)
		this.nextDataHandler = this.nextDataHandler.bind(this)
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

	changeHandler(event) {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	submitHandler(event) {
		event.preventDefault()
		let data = []
		let newSlots = []
		this.state.words.map((word) => {
			if (word.intent) {
				data.push([word.value, word.intent])
				newSlots.push(word.intent)
			}
		})

		let { sentence, intent, sentenceId, slots } = this.state
		for (let i = 0; i < newSlots.length; i++) {
			let notun = ""
			let mileJai = false
			for (let j = 0; j < slots.length; j++) {
				if (newSlots[i].trim() === slots[j].trim()) {
					mileJai = true
					break
				}
			}
			if (!mileJai) {
				notun = newSlots[i].trim()
				slots.push(notun)
			}
		}

		if (newSlots.length === 0 || intent === "no") {
			this.setState({ warningMessage: "someWarning" })
		} else if (intent !== "no") {
			this.props.uploadDetection(
				{
					line: sentence,
					words: data,
					intent: intent,
					sentenceId: sentenceId,
					newSlots: newSlots,
				},
				this.props.history
			)
			let { bakko, shobdo, ids } = this.props.location.state
			if (this.state.count <= bakko.length) {
				bakko = bakko[this.state.count]
				ids = ids[this.state.count]
				shobdo = shobdo[this.state.count]
				this.setState({
					sentence: bakko ? bakko : "goback",
					sentenceId: ids,
					words: shobdo
						? shobdo
						: [
								{
									id: 1,
									value: "submitmethod",
									intent: "",
								},
						  ],
					error: "",
					count: this.state.count + 1,
					slots: slots,
					warningMessage: "",
					// currentSlots: newSlots,
				})
			}
		}
	}

	nextDataHandler() {
		let { sentenceId } = this.state
		this.props.changeBooleanDumy({ sentenceId })
		let { bakko, shobdo, ids } = this.props.location.state
		if (this.state.count <= bakko.length) {
			bakko = bakko[this.state.count]
			ids = ids[this.state.count]
			shobdo = shobdo[this.state.count]
			this.setState({
				sentence: bakko ? bakko : "goback",
				sentenceId: ids,
				words: shobdo
					? shobdo
					: [
							{
								id: 1,
								value: "submitmethod",
								intent: "",
							},
					  ],
				error: "",
				count: this.state.count + 1,
				warningMessage: "",
				// currentSlots: newSlots,
			})
		}
	}

	changeWordHandler(event, object) {
		const updated = [...this.state.words]
		const index = updated.indexOf(object)
		updated[index] = { ...object }
		updated[index].value = event.target.value
		this.setState({ words: updated })
	}
	changeIntentHandler(event, object) {
		const updated = [...this.state.words]
		const index = updated.indexOf(object)
		updated[index] = { ...object }
		updated[index].intent = event.target.value
		this.setState({ words: updated })
	}

	render() {
		let {
			sentence,
			error,
			words,
			intent,
			sentenceId,
			slots,
			warningMessage,
		} = this.state
		let len = sentence.length * 8 + 20
		let intentLen = intent.length * 8 + 20

		let recentlyCreated = this.props.detection.detectionData
		let message

		if (recentlyCreated.length !== 0) {
			for (let i = 0; i < 1; i++) {
				let POSTFIX = " - বাক্যটি সফলভাবে ডাটাবেসে সংগৃহীত হয়েছে :) ধন্যবাদ"
				message = recentlyCreated[i].line + POSTFIX
			}
		}

		// const { bakko, intent } = this.props.location.state
		// console.log(words[0].intent)
		// console.log(this.state)
		// console.log(bakko.length, this.state.count)
		// console.log(words[this.state.count-1].id)
		const { user } = this.props.auth

		if(user.isApproved)
		return (
			<div className="p-4">
				{!warningMessage && error.message && sentence !== "goback" && (
					<div className="bg-danger p-2 rounded mb-3">
						<a style={{ textDecoration: "none" }} className="text-white">
							{error.message}
						</a>
					</div>
				)}
				{!warningMessage &&
					!error.message &&
					sentence !== "goback" &&
					message && (
						<div className="bg-success p-2 rounded mb-3">
							<a
								style={{ textDecoration: "none" }}
								className="text-white"
							>
								{message}
							</a>
						</div>
					)}

				{warningMessage && (
					<div className="bg-danger p-2 rounded mb-3">
						<p className="text-white">
							শব্দগুলোর কোন উদ্দেশ্য/intent না থাকার কারণে বাক্যটি চিরতরে
							মুছে যাবে, আপনি কি রাজি ?
						</p>
						<button
							className="btn btn-sm btn-secondary"
							onClick={this.nextDataHandler}
						>
							হ্যাঁ
						</button>
					</div>
				)}
				{sentence === "goback" ? (
					<div>
						<Link to="/dashboard">
							<button className="btn btn-sm btn-warning">
								Reload Data
							</button>
						</Link>
						{words[0].intent === "goback" ? (
							<div className="bg-primary rounded p-2 mt-3 mb-3">
								<h4 className="text-white">
									"{this.state.intent}" intent এর আরও
									নতুন বাক্য অ্যানোট্যাঁট করার জন্য আবার 'Reload' করুন |
									অন্য কোন সমস্যা থাকলে
									মাসুম ভাইয়ের সাথে যোগাযোগ করুন ! হ্যাপি
									অ্যানোট্যাঁটিং :)
								</h4>
							</div>
						) : (
							""
						)}
					</div>
				) : (
					<div>
						<div
							className="d-flex"
							style={{ paddingLeft: 15, paddingTop: 15 }}
						>
							{slots && (
								<div className="row">
									{slots.map((single, index) => {
										return (
											<span
												key={index}
												className="badge badge-dark m-1"
												style={{ fontSize: 18 }}
											>
												{single}
											</span>
										)
									})}
								</div>
							)}
						</div>
						<div className="p-1 text-danger mt-2">
							<span style={{fontWeight: "bold"}}>বিঃদ্রঃ </span> উদ্দেশ্য/Intent এর নাম ভুল/invalid দিলে পুরো বাক্য টাই waste হবে.. তাই উদ্দেশ্য/Intent এর নামের ক্ষেত্রে সতর্কতা অবলম্বন করতে হবে..
						</div>
						<div className="row">
							<div className="d-flex p-3">
								<div
									className="bg-secondary p-2"
									style={{ borderRadius: 10 }}
								>
									<form onSubmit={this.submitHandler}>
										<div style={{ paddingTop: 5, paddingBottom: 8 }}>
											<input
												style={{
													width: len,
													borderRadius: 8,
													borderWidth: 0,
													padding: 5,
												}}
												type="text"
												name="sentence"
												id="sentence"
												value={sentence}
												onChange={this.changeHandler}
											/>
										</div>
										<div className="row ml-1">
											<div>
												<p
													className="text-warning mt-1"
													style={{ fontWeight: 500 }}
												>
													উপরের বাক্যটির উদ্দেশ্য/intent
												</p>
											</div>
											<div className="ml-2">
												<input
													style={{
														width: intentLen,
														borderRadius: 8,
														borderWidth: 0,
														padding: 5,
													}}
													type="text"
													name="intent"
													id="intent"
													value={intent}
													onChange={this.changeHandler}
												/>
											</div>
										</div>

										<div className="row p-3">
											<div className="column">
												<p
													className="d-block my-1 p-1 text-warning"
													style={{ fontWeight: 500 }}
												>
													শব্দ/Word
												</p>
												<div className="mt-2">
													<p
														className="p-1 text-warning"
														style={{ fontWeight: 500 }}
													>
														স্লট/Slot
													</p>
												</div>
											</div>
											{this.state.words.map((word) => {
												return (
													<DetectionFrom
														key={word.id}
														object={word}
														changeWordHandler={
															this.changeWordHandler
														}
														changeIntentHandler={
															this.changeIntentHandler
														}
													/>
												)
											})}
										</div>

										<button className="btn btn-sm btn-primary">
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				)}
				{recentlyCreated && (
					<RecentlyCreated
						removeData={this.props.removeDetection}
						data={recentlyCreated}
					/>
				)}
			</div>
		)
		else{
			return <div className="bg-danger rounded p-2">
				You are Unauthorized !
			</div>
		}
	}
}

function mapStateToProps(state) {
	return {
		detection: state.detection,
		auth: state.auth,
	}
}

export default connect(mapStateToProps, {
	uploadDetection,
	removeDetection,
	changeBooleanDumy,
})(Create)

// : <h1>hello world</h1>}
// 	)
// } else {
// 	return (
// 		<div>
// 			<h1>নেটওয়ার্কিং ঝামেলা আছে</h1>
// 		</div>
// 	)
// }

// let { slots, currentSlots } = this.state
// 		let newSlots = []
// 		console.log(currentSlots)
// 		for (let i = 0; i < currentSlots.length; i++) {
// 			let notun = ""
// 			for (let j = 0; j < slots.length; j++) {
// 				if (currentSlots[i] === slots[j]) {
// 					break
// 				} else {
// 					// newSlots.push(currentSlots[i])
// 					notun = currentSlots[i]
// 				}
// 			}
// 			if (notun.length !== 0) {
// 				// newSlots.push(notun)
// 				slots.push(notun)
// 			}
// 		}

// 		if (prevState.slots !== slots) {
// 			this.setState({
// 				slots: slots,
// 			})
// 		}
// 		console.log(newSlots.length)
// 		console.log(newSlots)
