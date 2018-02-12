import React from "react";

import Button from "../Button/Button";

import styles from "./Dashboard.module.css";

const dashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Hello World</h1>
      <Button renderAs="link" target="/surveys/new" format="secondary">
        Create New Survey
      </Button>
    </div>
  );
};

export default dashboard;
