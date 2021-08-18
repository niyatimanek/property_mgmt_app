import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Users from "../components/Users";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import AdminDashboard from "../components/AdminDashboard";
import NewUser from "../components/NewUser";
import User from "../components/User";
import Admins from "../components/Admins";
import Properties from "../components/Properties";
import NewProperty from "../components/NewProperty";
import Property from "../components/Property";
import Login from "../components/Login";
import MyProperties from "../components/MyProperties";
import AdminPropertyUpdate from "../components/AdminPropertyUpdate";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/header" exact component={Header} />
      <Route path="/users" exact component={Users} />
      <Route path="/superAdminDashboard" exact component={SuperAdminDashboard} />
      <Route path="/adminDashboard" exact component={AdminDashboard} />
      <Route path="/newUser/:role" exact component={NewUser} />
      <Route path="/user/:id" exact component={User} />
      <Route path="/admins" exact component={Admins} />
      <Route path="/properties" exact component={Properties} />
      <Route path="/newProperty" exact component={NewProperty} />
      <Route path="/property/:id" exact component={Property} />
      <Route path="/login" exact component={Login} />
      <Route path="/myProperties" exact component={MyProperties} />
      <Route path="/admin_property/:id" exact component={AdminPropertyUpdate} />
    </Switch>
  </Router>
);