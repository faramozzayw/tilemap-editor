import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";

import { Main, Map, ProfilePage } from "./pages";
import { NotifyLayout } from "./components";

const App = () => {
	return (
		<>
			<Switch>
				<Route exact path="/@:username" component={ProfilePage} />
				<Route path="/maps/:mapID" component={Map} />
				<Route exact path="/" component={Main} />
			</Switch>
			<NotifyLayout />
		</>
	);
};

export default App;
