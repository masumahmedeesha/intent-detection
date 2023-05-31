import React from "react"
import { connect } from "react-redux"
import { css } from "@emotion/react"
import ReactModal from "react-modal"
import DetectionFrom from "../components/detectionFrom"
import { updateDetection } from "../store/actions/detectionActions"
// import RecentlyCreated from "./recentlyCreated"

if (window.innerWidth < 500) {
	ReactModal.defaultStyles = {}
}
const ggStyles = css`
	.ReactModal__Html--open,
	.ReactModal__Body--open {
		overflow: hidden;
	}
	.ReactModal__Overlay {
		position: fixed;
		z-index: 999999;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ReactModal__Content {
		background: white;
		outline: none;
		width: 50rem;
		max-width: calc(100vw - 2rem);
		max-height: calc(100vh - 2rem);
		box-shadow: 0 0 34px 0 rgba(0, 0, 0, 0.24);
		overflow-y: auto;
		position: relative;
	}
`

class UpdateForLoadedData extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sentence: "",
			words: [],
			intent: "",
			error: "",
		}
		this.changeHandler = this.changeHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
		this.changeWordHandler = this.changeWordHandler.bind(this)
		this.changeIntentHandler = this.changeIntentHandler.bind(this)
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
		const { singleLoadedData } = this.props
		if (singleLoadedData.length !== 0) {
			let data = []
			singleLoadedData.words.map((single, index) => {
				let obj = {}
				obj["id"] = index + 1
				obj["value"] = single[0]
				obj["intent"] = single[1]
				data.push(obj)
			})
			this.setState({
				sentence: singleLoadedData.line,
				words: data,
				intent: singleLoadedData.intent,
			})
		}
	}

	changeHandler(event) {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	submitHandler(event) {
		event.preventDefault()

		let data = []
		this.state.words.map((word) => {
			if (word.intent) {
				data.push([word.value, word.intent])
			}
		})
		// console.log(data)
		const { singleLoadedData } = this.props
		if (singleLoadedData.length !== 0) {
			this.props.updateDetection(singleLoadedData._id, {
				line: this.state.sentence,
				words: data,
				intent: this.state.intent,
			})
		}

		this.props.close()
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
		// console.log(window.innerWidth, window.innerHeight)
		let { sentence, words, intent } = this.state
		let intentLen = intent.length * 8 + 20
		let len = sentence.length * 8 + 20
		// if (window.innerWidth >)
		return (
			<ReactModal
				isOpen={this.props.isOpen}
				onRequestClose={this.props.close}
				style={window.innerWidth < 500 && ggStyles}
				className={
					window.innerWidth > 500 && "d-flex justify-content-center p-3 mt-5"
				}
			>
				<div className="p-3 bg-secondary rounded mt-5">
					<div className="row">
						<div className="d-flex p-1">
							<div className="rounded bg-secondary p-1">
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
										{words.length !== 0
											? this.state.words.map((word) => {
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
											  })
											: null}
									</div>

									<button className="btn btn-sm btn-primary">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</ReactModal>
		)
	}
}

function mapStateToProps(state) {
	return {
		detection: state.detection,
	}
}

export default connect(mapStateToProps, { updateDetection })(
	UpdateForLoadedData
)
