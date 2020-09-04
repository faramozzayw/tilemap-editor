import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";

import { Editor, Main, Map, ProfilePage } from "./pages";
import { ProtectedRouter } from "./common";
import { useAuthState } from "./hooks/auth";
import { NotifyLayout } from "./components";

const App = () => {
	const { isAuthenticated, isPending } = useAuthState();

	const hasAccess = isAuthenticated || isPending;

	return (
		<>
			<Switch>
				<ProtectedRouter
					isAuth={hasAccess}
					path="/editor/:mapID"
					component={Editor}
				/>
				<Route exact path="/@:username" component={ProfilePage} />
				<Route path="/maps/:mapID" component={Map} />
				<Route exact path="/" component={Main} />
			</Switch>
			<NotifyLayout />
		</>
	);
};

export default App;
