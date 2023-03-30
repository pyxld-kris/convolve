import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./styles.css";

import PromptEditingPage from "./pages/PromptEditingPage";

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
      <Route exact path="/" component={PromptEditingPage} />
    </Switch>
  );
}
