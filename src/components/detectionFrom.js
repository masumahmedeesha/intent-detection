import React from "react"

const DetectionFrom = (props) => {
	let object = props.object
	return (
		<div className="mt-2">
			<div className="mr-1">
				<input
					className="p-1"
					style={{borderRadius: 4, borderWidth: 0}}
					type="text"
					name="intentDetection"
					value={object.value}
					onChange={(event) => props.changeWordHandler(event, object)}
				/>
			</div>
			<div className="mt-2">
				<input
					className="p-1"
					style={{borderRadius: 4, borderWidth: 0}}
					type="text"
					name="intentDetection"
					value={object.intent}
					onChange={(e) => props.changeIntentHandler(e, object)}
				/>
			</div>
		</div>
	)
}

export default DetectionFrom
