import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./styles.css";

import ModuleCollectionPage from "./pages/ModuleCollectionPage";
import ModulePage from "./pages/ModulePage";
import WelcomePage from "./pages/WelcomePage";

export default function App() {
  const location = useLocation();
  const history = useHistory();

  const [currentLocation, setCurrentLocation] = React.useState(location);

  React.useEffect(() => {
    //console.log("*", location.pathname);
    //props.setPathname(location.pathname)
    //window.location.reload();

    if (location.pathname != currentLocation.pathname) {
      window.location.reload();
    } else {
      //history.push(location.pathname);
      console.log(location.pathname);
    }
  }, [location]);

  return (
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route
        exact
        path="/modules/:path1?/:path2?/:path3?/:path4?/:path5?/:path6?/:path7?/:path8?"
        component={ModuleCollectionPage}
        //key={Date.now()}
      />
      <Route
        exact
        path="/module/:moduleName"
        component={ModulePage}
        //key={Date.now()}
      />
    </Switch>
  );
}
