import React from "react";
import { Button } from "@faramo.zayw/reabulma";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CoolBox } from "../../common";
import { Textarea, InputField } from "../../components/InputField";

import type { MapParams } from "./Map";
import {
	useGetMapByIdQuery,
	Map,
	useUpdateMapInfoMutation,
} from "../../types/graphql";
import { mapName, mapDescription } from "../../validation-subsets";
import { addNotification } from "../../store/notificationStore";

const Schema = Yup.object().shape({
	name: mapName,
	description: mapDescription,
});

export const InfoSetting = () => {
	const { mapID } = useParams<MapParams>();
	const { loading, data: mapData, refetch } = useGetMapByIdQuery({
		variables: { mapID },
	});

	const currentMap = {
		...mapData?.map,
	} as Map;

	const [updateMapInfo] = useUpdateMapInfoMutation({
		onCompleted: () => {
			addNotification({
				type: "success",
				message: "The update was successful",
			});
			refetch();
		},
		onError: (err) =>
			addNotification({
				type: "danger",
				message: err.message,
			}),
	});

	const formik = useFormik({
		initialValues: {
			name: currentMap.name,
			description: currentMap.description ?? "",
		},
		validationSchema: Schema,
		validateOnChange: true,
		validateOnMount: true,
		onSubmit: (values) => {
			if (
				values.name !== formik.initialValues.name ||
				values.description !== formik.initialValues.description
			) {
				updateMapInfo({
					variables: {
						id: currentMap.id,
						data: { ...values },
					},
				});
			} else {
				addNotification({
					type: "info",
					message: "nothing has changed, bro...",
				});
			}
		},
	});

	return (
		<CoolBox title="info">
			<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
				<fieldset disabled={loading}>
					<InputField
						name="name"
						description="map name"
						hepler={formik.errors.name}
						value={formik.values.name}
						onChange={formik.handleChange}
						min="3"
						max="30"
					/>
					<Textarea
						name="description"
						description="map description"
						hepler={formik.errors.description}
						value={formik.values.description}
						onChange={formik.handleChange}
						max="300"
					/>
					<Button type="submit" isOutlined isColor="info">
						update info
					</Button>
				</fieldset>
			</form>
		</CoolBox>
	);
};
