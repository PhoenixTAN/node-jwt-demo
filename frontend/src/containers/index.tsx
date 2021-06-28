import React from "react";
import { Route, Switch } from "react-router-dom";

import WelcomePage from "@containers/welcome";
import Login from "@containers/login";
import useUser from "@hooks/user";

const Layout = () => {
  const { user } = useUser();

  if (!user) {
    return <Login></Login>;
  }

  return (
    <div className="layout__container">
      <Switch>
        <Route path="/" component={WelcomePage} />
      </Switch>
    </div>
  );
};

export default Layout;
