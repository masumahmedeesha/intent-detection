import React from "react"

const TextInput = (props) => {
	return (
		<div>
			<input
				type={props.type}
				name={props.name}
				id={props.name}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	)
}

export default TextInput
