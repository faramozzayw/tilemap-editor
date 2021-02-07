import { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client";
import withApollo from "next-with-apollo";

import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "./styles.css";
import "./masonry.css";

import * as serviceWorker from "../serviceWorker";

import { AuthProvider } from "../hooks/auth";

import { NotifyLayout } from "../components";
import { ProtectedRouter } from "../common";

import { clientWithInitState } from "../graphql";
import { ScrollToTop } from "../common";

const App = ({ Component, pageProps, apollo }) => {
	return (
		<ApolloProvider client={apollo}>
			<AuthProvider>
				<StrictMode>
					<ScrollToTop />
					<NotifyLayout />
					<Component {...pageProps} />
				</StrictMode>
			</AuthProvider>
		</ApolloProvider>
	);
};

export default withApollo(({ initialState }) => {
	return clientWithInitState({ initialState });
})(App);

serviceWorker.unregister();
