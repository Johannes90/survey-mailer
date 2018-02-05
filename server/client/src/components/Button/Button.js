import React from "react";

import styles from "./button.module.css";

const Button = props => (
  <a
    href={props.target}
    className={[styles.button, styles[props.type]].join(" ")}
  >
    {props.children}
  </a>
);

export default Button;
