import React from "react";

class SurveyField extends React.Component {
	render() {
		console.log(this.props);
		const { input, label, meta: { touched, error } } = this.props;
		return (
			<div>
				<label>{label}</label>
				<input {...input} style={{ marginBottom: "5px" }} />
				<div className="red-text" style={{ marginBottom: "20px" }}>
					{touched && error}
				</div>
			</div>
		);
	}
}

export default SurveyField;
