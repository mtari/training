import React from "react";

import { reduxForm, Field } from "redux-form";

import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";

import FIELDS from "./formFields";

import validateEmails from "./../../utils/validateEmails";

class SurveyForm extends React.Component {
	renderSurveyFields() {
		return FIELDS.map(({ name, label }) => (
			<Field
				key={name}
				type="text"
				name={name}
				label={label}
				component={SurveyField}
			/>
		));
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onSurveySubmit
					)}
				>
					{this.renderSurveyFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button
						type="submit"
						className="teal btn-flat right white-text"
					>
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || "");

	FIELDS.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide ${name}`;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: "surveyForm",
	destroyOnUnmount: false
})(SurveyForm);
