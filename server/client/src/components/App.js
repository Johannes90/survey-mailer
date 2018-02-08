import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";

import "../styles/base.css";
import "../styles/font.css";
import "../styles/grid.css";

const SurveyNew = () => <h1>SurveyNew</h1>;
const Landing = () => <h1>Landing</h1>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
