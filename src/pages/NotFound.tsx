import React from "react";
import { useLocation } from "react-router-dom";
import { Title } from "@faramo.zayw/reabulma";

import { Layout } from "../common";

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
