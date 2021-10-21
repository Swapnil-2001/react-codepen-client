import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ReactNotification from "react-notifications-component";

import { reducers } from "./reducers";
import "./index.css";
import App from "./App";

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ReactNotification />
    <App />
  </Provider>,
  document.getElementById("root")
);
