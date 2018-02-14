import React from "react";

import Button from "../Button/Button";
import SurveyList from "../SurveyList/SurveyList";

import styles from "./Dashboard.module.css";

const dashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Hello World</h1>
      <Button renderAs="router" target="/surveys/new" format="secondary">
        Create New Survey
      </Button>
      <SurveyList />
    </div>
  );
};

export default dashboard;
