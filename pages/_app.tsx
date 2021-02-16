import { StrictMode, useState } from "react";
import { ApolloProvider } from "@apollo/client";

import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

import withApollo from "next-with-apollo";

import "../styles.css";
import "../masonry.css";

import { AuthProvider } from "../hooks/auth";

import { NotifyLayout } from "../components";

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
