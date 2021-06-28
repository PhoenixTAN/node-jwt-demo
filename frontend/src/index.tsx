import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";

import Layout from "@containers/index";

import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:3000";

const App = (
  <BrowserRouter>
    <Layout></Layout>
  </BrowserRouter>
);

ReactDOM.render(App, document.getElementById("root"));
