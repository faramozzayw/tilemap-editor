import { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client";
import withApollo from "next-with-apollo";

import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "./styles.css";
import "./masonry.css";

//import * as serviceWorker from "../serviceWorker";

import { AuthProvider } from "../hooks/auth";

import { NotifyLayout } from "../components";
//import { ProtectedRouter } from "../common";

import { initializeApollo } from "../graphql";
import { ScrollToTop } from "../common";

const App = ({ Component, pageProps, apollo }) => (
	<ApolloProvider client={apollo}>
		<AuthProvider authClient={apollo}>
			<StrictMode>
				<ScrollToTop />
				<NotifyLayout />
				<Component {...pageProps} />
			</StrictMode>
		</AuthProvider>
	</ApolloProvider>
);

export default withApollo(({ initialState }) => {
	return initializeApollo({ initialState });
})(App);

//serviceWorker.unregister();
