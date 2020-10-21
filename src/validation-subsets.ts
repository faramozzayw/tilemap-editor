import * as Yup from "yup";

export const username = Yup.string()
	.min(2, "Too Short!")
	.max(25, "Too Long!")
	.required("Required");

export const password = Yup.string()
	.min(10, "Too Short!")
	.max(50, "Too Long!")
	.required("Required");

export const email = Yup.string().email("Invalid email").required("Required");
