import React, { useState, useEffect } from "react";
import { Checkbox } from "@faramo.zayw/reabulma";
import queryString from "query-string";

import { useAuthState } from "../hooks/auth";
import { MapFeed } from "../components/MapPreviewCard";
import { Layout } from "../common";
import { useMapsPaginationQuery } from "../types/graphql";
import { InputField } from "../components/Profile";

export const Main = () => {
	const { isAuthenticated: isAuth } = useAuthState();

	const [searchValue, setSearchValue] = useState(() => ({
		name: (queryString.parse(window.location.search).name as any) ?? "",
	}));
	const [searching, setSearching] = useState(false);

	const handlerSearchStatus = () => {
		setSearching((p) => {
			const value = !p;

			if (!value) {
				setSearchValue({ name: "" });
				window.history.replaceState(null, "", `/`);
			}

			return value;
		});
	};

	const searchValueHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value, name },
		} = e;

		window.history.replaceState(null, "", `/?name=${value}`);

		setSearchValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const { loading, error, data, fetchMore, refetch } = useMapsPaginationQuery({
		variables: {
			first: 5,
			filter: { ...searchValue },
		},
		onError: console.error,
	});

	useEffect(() => {
		refetch({
			filter: { ...searchValue },
		}).catch(console.error);
	}, [searchValue.name]);

	const nodes = data?.mapsPagination?.edges?.map((edge) => edge.node);

	return (
		<Layout style={{ flexFlow: "column" }}>
			<div className="searchBox">
				{searching && (
					<InputField
						name="name"
						placeholder="map name"
						value={searchValue.name}
						onChange={searchValueHandler}
					/>
				)}
				<Checkbox onClick={handlerSearchStatus}> Go to search?</Checkbox>
			</div>
			<MapFeed
				loading={loading}
				error={error}
				isAuth={isAuth}
				maps={nodes}
				refetch={refetch}
				onLoadMore={() => {
					fetchMore({
						variables: {
							after: data?.mapsPagination.pageInfo?.endCursor,
						},
					});
				}}
			/>
		</Layout>
	);
};
