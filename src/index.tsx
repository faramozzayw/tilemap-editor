import React from "react";
import ReactDOM from "react-dom";

import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";

import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql";
import { ScrollToTop } from "./common";

ReactDOM.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<AuthProvider>
				<React.StrictMode>
					<ScrollToTop />
					<App />
				</React.StrictMode>
			</AuthProvider>
		</BrowserRouter>
	</ApolloProvider>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
