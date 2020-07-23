import React, { useRef } from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { uuid } from "uuidv4";

import { Button, Control, Label, Box } from "./../../bulma";

export const SignUp = () => {
	const submitHandler = () => {};

	return (
		<Button isOutlined isColor="success">
			<strong>Sign up</strong>
		</Button>
	);
};
