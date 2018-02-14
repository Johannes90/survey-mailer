import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Button from "../../Button/Button";
import formFields from "../formFields";
import * as actions from "../../../actions";

const surveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <p>{formValues[name]}</p>
      </div>
    );
  });
  return (
    <div>
      <h3>Review Form</h3>
      {reviewFields}
      <Button format="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button
        onClick={() => submitSurvey(formValues, history)}
        format="primary"
      >
        Send Survey
      </Button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(surveyFormReview));
