import React from "react";
import "./styles.css";

import {
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams,
} from "react-router-dom";

import { Editor } from "./pages";

const App = () => {
	return (
		<>
			<Link to="/editor">to editor</Link>
			<Switch>
				<Route path="/editor">
					<Editor />
				</Route>
			</Switch>
		</>
	);
};

export default App;
