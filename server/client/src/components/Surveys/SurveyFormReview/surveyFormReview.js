import React from "react";

import Button from "../../Button/Button";

const surveyFormReview = ({ onCancel }) => {
  return (
    <div>
      <h3>Review Form</h3>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default surveyFormReview;
