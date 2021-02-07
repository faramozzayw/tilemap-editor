import { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import "./masonry.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

import App from "../src/App";
import * as serviceWorker from "../src/serviceWorker";

import { AuthProvider } from "../src/hooks/auth";

import { client } from "../src/graphql";
import { ScrollToTop } from "../src/common";

const Index = () => (
	<ApolloProvider client={client}>
		<BrowserRouter>
			<AuthProvider>
				<StrictMode>
					<ScrollToTop />
					<App />
				</StrictMode>
			</AuthProvider>
		</BrowserRouter>
	</ApolloProvider>
);

export default Index;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
