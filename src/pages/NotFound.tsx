import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../common";
import { Title } from "../bulma";

export const NotFound = () => {
	let location = useLocation();

	return (
		<Layout>
			<Title tag="h2" isSize="5">
				No match for <code>{location.pathname}</code>
			</Title>
		</Layout>
	);
};
