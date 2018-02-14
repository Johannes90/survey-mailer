import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../Button/Button";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div key={survey._id}>
          <span>{survey.title}</span>
          <p>{survey.body}</p>
          <p>Sent on {new Date(survey.dateSent).toLocaleDateString()}</p>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
