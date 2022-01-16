import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import QuizStartNow from "./tables/QuizStartNow";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages\
import QuestionPage from "./documentation/QuestionPage";
import QuizQuestionPage from "./documentation/QuizQuestionPage";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";


import VM from "../components/Vm";
import { PageTrafficTable } from '../components/Tables';
import QuizOverview from './documentation/QuizOverview';
import BuildProject from './documentation/BuildProject';

//Utility




const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
 return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);

    return () => clearTimeout(timer);

  }, []);

  const localStorageIsSettingsVisible = () => {

    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  if (localStorage.getItem('token')) {
    return (

      <Route {...rest} render={props => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
          </main>
        </>
      )}
      />
    );
  }
  else {
    console.log("else chala")
    return (<Redirect push to={'/'} />)
  }


};

export default () => (





  <Switch>
    {/* <RouteWithLoader exact path={Routes.fullstack.path} component={fullstack} /> */}
    <RouteWithLoader exact path={Routes.VM.path} component={VM} />
    <RouteWithLoader exact path={Routes.Presentation.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    {/* <RouteWithSidebar exact path={Routes.fullstack.path} component={fullstack} /> */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    {/* <PrivateRoute exact path={Routes.DashboardOverview.path}>  </PrivateRoute> */}
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.QuizStartNow.path} component={QuizStartNow} />

    
    {/* documentation */}
    <RouteWithSidebar exact path={Routes.QuizOverview.path} component={QuizOverview} />
    <RouteWithSidebar exact path={Routes.BuildProject.path} component={BuildProject} />
    <RouteWithSidebar exact path={Routes.PageTrafficTable.path} component={PageTrafficTable} />
    <RouteWithSidebar path={Routes.Question.path} component={QuestionPage} />
    <RouteWithSidebar path={Routes.QuizQuestion.path} component={QuizQuestionPage} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
