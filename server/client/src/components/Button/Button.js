import React from "react";
import { Link } from "react-router-dom";

import styles from "./button.module.css";

const Button = props => {
  switch (props.renderAs) {
    case "router":
      return (
        <Link
          to={props.target}
          className={[styles.button, styles[props.format]].join(" ")}
        >
          {props.children}
        </Link>
      );
    case "link":
      return (
        <a
          href={props.target}
          className={[styles.button, styles[props.format]].join(" ")}
        >
          {props.children}
        </a>
      );
    case "button":
      return (
        <button
          onClick={props.onClick}
          type={props.type}
          className={[styles.button, styles[props.format]].join(" ")}
        >
          {props.children}
        </button>
      );
    default:
      return (
        <button
          onClick={props.onClick}
          type={props.type}
          className={[styles.button, styles[props.format]].join(" ")}
        >
          {props.children}
        </button>
      );
  }
};

export default Button;
