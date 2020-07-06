import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";

import { Editor, Main } from "./pages";

const App = () => {
	return (
		<>
			<Switch>
				<Route path="/editor">
					<Editor />
				</Route>
				<Route>
					<Main />
				</Route>
			</Switch>
		</>
	);
};

export default App;
