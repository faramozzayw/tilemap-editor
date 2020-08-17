import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";

import { Editor, Main } from "./pages";
import { ProtectedRouter } from "./common";
import { useAuthState } from "./hooks/auth";
import { NotifyLayout } from "./components";

const App = () => {
	const { isAuthenticated } = useAuthState();

	return (
		<>
			<Switch>
				<ProtectedRouter
					isAuth={isAuthenticated}
					path="/editor/:mapID"
					component={Editor}
				/>
				<Route path="/" component={Main} />
			</Switch>
			<NotifyLayout />
		</>
	);
};

export default App;
