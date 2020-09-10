import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";

import { Main, Map, ProfilePage, NotFound, SignUp } from "./pages";
import { NotifyLayout } from "./components";

const App = () => {
	return (
		<>
			<Switch>
				<Route exact path="/" component={Main} />

				<Route exact path="/@:username" component={ProfilePage} />
				<Route exact path="/maps/:mapID" component={Map} />
				<Route path="/signup" component={SignUp} />

				<Route path="*" component={NotFound} />
			</Switch>
			<NotifyLayout />
		</>
	);
};

export default App;
