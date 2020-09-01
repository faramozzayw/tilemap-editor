import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";

import { Editor, Main } from "./pages";
import { ProtectedRouter } from "./common";
import { useAuthState } from "./hooks/auth";
import { NotifyLayout } from "./components";
import { ProfilePage } from "./pages/Profile";

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
				<ProtectedRouter
					isAuth={hasAccess}
					path="/@:username"
					component={ProfilePage}
				/>
				<Route path="/" component={Main} />
			</Switch>
			<NotifyLayout />
		</>
	);
};

export default App;
