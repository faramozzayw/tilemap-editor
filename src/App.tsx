import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";

import { Editor, Main } from "./pages";
import { ProtectedRouter } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/auth";

const App = () => {
	return (
		<AuthProvider>
			<Switch>
				<ProtectedRouter path="/editor/:mapID">
					<Editor />
				</ProtectedRouter>
				<Route>
					<Main />
				</Route>
			</Switch>
		</AuthProvider>
	);
};

export default App;
