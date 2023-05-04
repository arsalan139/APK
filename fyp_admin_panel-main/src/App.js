import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@material-ui/core";
import "./App.css";

import Main from "./Components/RightPanel/Main";
import Login from "./Pages/Auth/Login";
import DashBoard from "./Pages/Dashboard/DashBoard";
import NotAuthorized from "./Pages/NotAuthorized";
import NotFound from "./Pages/NotFound";

import Categories from "./Components/RightPanel/Categories";
import ComplaintBox from "./Components/RightPanel/ComplaintBox";
import WorkerDetails from "./Components/RightPanel/WorkerDetails";
import UserDetails from "./Components/RightPanel/UserDetails";
import Language from "./Components/RightPanel/Language";
import CreatePromos from "./Components/RightPanel/CreatePromos";
import Setting from "./Components/RightPanel/Setting";
import PendingRequest from "./Components/RightPanel/PendingRequest";
import AddAdmin from "./Components/RightPanel/AddAdmin";
import Commission from "./Components/RightPanel/Commission";

function App() {
  return (
    <Router>
      <div style={{ flex: 1 }}>
        <CssBaseline />
        <Switch>
          <Route path="/not-found" component={NotFound} />
          <Route path="/not-authorized" component={NotAuthorized} />
          <Route
            path="/dashboard"
            exact
            children={
              <DashBoard content={<Main />} var={{ main: "contained" }} />
            }
          />
          <Route
            path="/dashboard/categories"
            exact
            children={
              <DashBoard
                content={<Categories />}
                var={{ categories: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/complaint-box"
            exact
            children={
              <DashBoard
                content={<ComplaintBox />}
                var={{ complaint_box: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/worker-details"
            exact
            children={
              <DashBoard
                content={<WorkerDetails />}
                var={{ worker_details: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/pending-request"
            exact
            children={
              <DashBoard
                content={<PendingRequest />}
                var={{ pending_request: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/users-details"
            exact
            children={
              <DashBoard
                content={<UserDetails />}
                var={{ users_details: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/language"
            exact
            children={
              <DashBoard
                content={<Language />}
                var={{ language: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/create-promos"
            exact
            children={
              <DashBoard
                content={<CreatePromos />}
                var={{ create_promos: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/add-admin"
            exact
            children={
              <DashBoard
                content={<AddAdmin />}
                var={{ add_admin: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/add-commission"
            exact
            children={
              <DashBoard
                content={<Commission />}
                var={{ add_commission: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/setting"
            exact
            children={
              <DashBoard content={<Setting />} var={{ setting: "contained" }} />
            }
          />
          <Route path="/" exact component={Login} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
