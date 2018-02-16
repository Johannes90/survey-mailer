import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSurveys } from "../../actions";
import styles from "./SurveyList.module.css";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className={styles.surveyCard} key={survey._id}>
          <h3>{survey.title}</h3>
          <p>{survey.body}</p>
          <p>Sent on {new Date(survey.dateSent).toLocaleDateString()}</p>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={styles.surveyCardContainer}>{this.renderSurveys()}</div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
