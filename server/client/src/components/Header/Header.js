import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./header.module.css";
import Button from "../Button/Button";
import Logo from "../../assets/Logo/Color.svg";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <Button type="secondary">Login</Button>
            <Button target="/auth/google" type="primary">
              Sign Up
            </Button>
          </li>
        );
      default:
        return (
          <li>
            <Button target="/api/logout" type="secondary">
              Logout
            </Button>
          </li>
        );
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
