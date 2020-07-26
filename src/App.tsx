import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";

import { Editor, Main } from "./pages";
import { ProtectedRouter } from "./components/ProtectedRoute";
import { AuthProvider, useAuthState } from "./hooks/auth";

const App = () => {
	const { isAuthenticated } = useAuthState();

	return (
		<AuthProvider>
			<Switch>
				<ProtectedRouter
					isAuth={isAuthenticated}
					path="/editor/:mapID"
					component={Editor}
				/>
				<Route path="/" component={Main} />
			</Switch>
		</AuthProvider>
	);
};

export default App;
