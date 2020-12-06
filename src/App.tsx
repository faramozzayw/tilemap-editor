import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";

import {
	Main,
	Map,
	ProfilePage,
	NotFound,
	SignUp,
	Login,
	Posts,
	Setting as UserSetting,
	MapSetting,
} from "./pages";
import { NotifyLayout } from "./components";
import { ProtectedRouter } from "./common";
import { useAuthState } from "./hooks/auth";

const App = () => {
	const { isAuthenticated } = useAuthState();
	return (
		<>
			<Switch>
				<Route exact path="/" component={Main} />

				<Route exact path="/@:username" component={ProfilePage} />
				<Route sensitive path="/maps/:mapID" component={Map} />
				<ProtectedRouter
					path="/me/setting"
					component={UserSetting}
					isAuth={isAuthenticated}
				/>
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/posts" component={Posts} />

				<Route path="*" component={NotFound} />
			</Switch>
			<NotifyLayout />
		</>
	);
};

export default App;
