import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import SurveyField from "../SurveyField/surveyField";
import validateEmails from "../../../utils/validateEmail";
import Button from "../../Button/Button";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Email Subject", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipients", name: "email" }
];

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(({ name, label }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          name={name}
          label={label}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Button type="submit" format="primary">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You need to fill in a survey ${name}`;
    }
  });

  errors.email = validateEmails(values.email || "");

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm"
})(SurveyForm);
