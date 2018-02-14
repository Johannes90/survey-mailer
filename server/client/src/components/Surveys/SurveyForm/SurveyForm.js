import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import SurveyField from "../SurveyField/surveyField";
import validateEmails from "../../../utils/validateEmail";
import Button from "../../Button/Button";
import formFields from "../formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ name, label }) => {
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
          <Button target="/surveys" renderAs="router" format="secondary">
            Cancel
          </Button>
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

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You need to fill in a survey ${name}`;
    }
  });

  errors.recipients = validateEmails(values.recipients || "");

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
