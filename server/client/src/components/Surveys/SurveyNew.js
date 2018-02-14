import React, { Component } from "react";
import { reduxForm } from "redux-form";

import SurveyForm from "./SurveyForm/SurveyForm";
import SurveyFormReview from "./SurveyFormReview/surveyFormReview";
import styles from "./SurveyNew.module.css";

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return <div className={styles.container}>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
