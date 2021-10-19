import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pen from "./components/Workspace/Pen";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/pen/:id" component={Pen} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};
export default App;
