import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./header.module.css";
import Button from "../Button/Button";
import Logo from "../../assets/Logo/Color.svg";
import Payments from "../Payments/Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <Button
            key="1"
            type="secondary"
            renderAs="link"
            target="/auth/google"
          >
            Login
          </Button>,
          <Button
            key="2"
            renderAs="link"
            target="/auth/google"
            format="primary"
          >
            Sign Up
          </Button>
        ];
      default:
        return [
          <span key="2" className={styles.credits}>
            {this.props.auth.credits}
          </span>,
          <Payments key="1" />,
          <Button
            key="3"
            renderAs="link"
            target="/api/logout"
            format="secondary"
          >
            Logout
          </Button>
        ];
    }
  }

  render() {
    return (
      <nav className={styles.header}>
        <Link className={styles.logo} to={this.props.auth ? "/surveys" : "/"}>
          <img src={Logo} alt="founderflow" />
        </Link>
        {this.renderContent()}
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
