import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";

import styles from "./Payment.module.css";
import * as actions from "../../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Founders Flow"
        description="$5 for 5 email credits."
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        ComponentClass="div"
      >
        <button className={styles.button}>Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
