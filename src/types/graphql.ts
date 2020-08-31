import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** UtcDateTime */
	UtcDateTime: any;
	/** Uuid */
	Uuid: any;
};

export type ReturnUser = {
	__typename?: "ReturnUser";
	id: Scalars["Uuid"];
	username?: Maybe<Scalars["String"]>;
	email?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
};

export type Map = {
	__typename?: "Map";
	id: Scalars["ID"];
	name: Scalars["String"];
	author: Scalars["String"];
	description?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["UtcDateTime"]>;
	createdAt: Scalars["UtcDateTime"];
	size: MapSize;
	tiles?: Maybe<Array<TileConfig>>;
};

export type MutationRoot = {
	__typename?: "MutationRoot";
	/** Creating a new map */
	createMap: Map;
	/** Deleting a map by ID */
	deleteMap: Map;
	updateTile: Scalars["String"];
	/** Updating part of map information by ID */
	updateMapInfo: Scalars["String"];
	createNewUser: User;
	updateUserInfo: ReturnUser;
	loginUser: Jwt;
};

export type MutationRootCreateMapArgs = {
	newMap: NewMap;
};

export type MutationRootDeleteMapArgs = {
	id: Scalars["ID"];
};

export type MutationRootUpdateTileArgs = {
	mapId: Scalars["ID"];
	tileId: Scalars["ID"];
	updateValue: UpdateTileConfig;
};

export type MutationRootUpdateMapInfoArgs = {
	mapId: Scalars["ID"];
	updateValue: UpdateMap;
};

export type MutationRootCreateNewUserArgs = {
	newUser: CreateUser;
};

export type MutationRootUpdateUserInfoArgs = {
	updateValue: UpdateUser;
};

export type MutationRootLoginUserArgs = {
	loginUser: LoginUser;
};

/** JSON Web Token */
export type Jwt = {
	__typename?: "JWT";
	accessToken: Scalars["String"];
	refreshToken: Scalars["Uuid"];
};

export type UpdateMap = {
	name?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
};

export type QueryRoot = {
	__typename?: "QueryRoot";
	/** Get a game map by ID */
	map: Map;
	maps: Array<Map>;
	/** Ok zoomer! */
	boomer: Scalars["String"];
	me: User;
	getUserById: User;
};

export type QueryRootMapArgs = {
	id: Scalars["ID"];
};

export type QueryRootMapsArgs = {
	filter?: Maybe<MapFilter>;
	skip?: Maybe<Scalars["Int"]>;
	limit?: Maybe<Scalars["Int"]>;
	sort?: Maybe<MapSort>;
};

export type QueryRootGetUserByIdArgs = {
	id: Scalars["Uuid"];
};

export type NewMapSize = {
	row: Scalars["Int"];
	column: Scalars["Int"];
};

export type UpdateTileConfig = {
	baseTerrain?: Maybe<BaseTerrain>;
	terrainFeatures?: Maybe<Scalars["String"]>;
	resource?: Maybe<Scalars["String"]>;
	units?: Maybe<Scalars["String"]>;
};

/** not active now */
export type MapSort = {
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
};

/** Formal game tile definition */
export type TileConfig = {
	__typename?: "TileConfig";
	id: Scalars["ID"];
	baseTerrain: BaseTerrain;
	terrainFeatures: Scalars["String"];
	resource: Scalars["String"];
	units: Scalars["String"];
};

/** Map size in 2D(row and column) */
export type MapSize = {
	__typename?: "MapSize";
	row: Scalars["Int"];
	column: Scalars["Int"];
};

/** Describes what data is needed to create a new user */
export type CreateUser = {
	username: Scalars["String"];
	email: Scalars["String"];
	password: Scalars["String"];
};

/** Base terrain variants for a hex */
export enum BaseTerrain {
	Coast = "Coast",
	Desert = "Desert",
	Grassland = "Grassland",
	Ocean = "Ocean",
	Snow = "Snow",
	Forest = "Forest",
	Jungle = "Jungle",
}

export type MapFilter = {
	name?: Maybe<Scalars["String"]>;
	author?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
};

/** Specify the whether the values ​​in the specified column should be sorted in ascending or descending order. */
export enum SortOrder {
	Desc = "DESC",
	Asc = "ASC",
}

export type User = {
	__typename?: "User";
	id: Scalars["Uuid"];
	username: Scalars["String"];
	email: Scalars["String"];
	description?: Maybe<Scalars["String"]>;
};

export type NewMap = {
	name: Scalars["String"];
	author: Scalars["String"];
	description?: Maybe<Scalars["String"]>;
	size: NewMapSize;
};

export type UpdateUser = {
	username?: Maybe<Scalars["String"]>;
	email?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
};

/** Describes the required login information */
export type LoginUser = {
	username: Scalars["String"];
	password: Scalars["String"];
};

export type MapInfoFragment = { __typename?: "Map" } & Pick<
	Map,
	"id" | "name" | "author" | "description" | "createdAt" | "updatedAt"
> & { size: { __typename?: "MapSize" } & Pick<MapSize, "row" | "column"> };

export type MapTilesFragment = { __typename?: "Map" } & {
	tiles?: Maybe<
		Array<
			{ __typename?: "TileConfig" } & Pick<
				TileConfig,
				"id" | "baseTerrain" | "terrainFeatures" | "resource" | "units"
			>
		>
	>;
};

export type CreateMapMutationVariables = Exact<{
	newMap: NewMap;
}>;

export type CreateMapMutation = { __typename?: "MutationRoot" } & {
	createMap: { __typename?: "Map" } & MapInfoFragment & MapTilesFragment;
};

export type DeleteMapMutationVariables = Exact<{
	mapID: Scalars["ID"];
}>;

export type DeleteMapMutation = { __typename?: "MutationRoot" } & {
	deleteMap: { __typename?: "Map" } & Pick<Map, "id">;
};

export type UpdateTileMutationVariables = Exact<{
	mapID: Scalars["ID"];
	tileID: Scalars["ID"];
	updateValue: UpdateTileConfig;
}>;

export type UpdateTileMutation = { __typename?: "MutationRoot" } & Pick<
	MutationRoot,
	"updateTile"
>;

export type UpdateUserMutationVariables = Exact<{
	updateValue: UpdateUser;
}>;

export type UpdateUserMutation = { __typename?: "MutationRoot" } & {
	updateUserInfo: { __typename?: "ReturnUser" } & Pick<
		ReturnUser,
		"id" | "username" | "description" | "email"
	>;
};

export type CreateNewUserMutationVariables = Exact<{
	data: CreateUser;
}>;

export type CreateNewUserMutation = { __typename?: "MutationRoot" } & {
	createNewUser: { __typename?: "User" } & Pick<
		User,
		"id" | "username" | "email" | "description"
	>;
};

export type LoginMutationVariables = Exact<{
	data: LoginUser;
}>;

export type LoginMutation = { __typename?: "MutationRoot" } & {
	loginUser: { __typename?: "JWT" } & Pick<Jwt, "accessToken" | "refreshToken">;
};

export type EditMapQueryVariables = Exact<{
	mapID: Scalars["ID"];
}>;

export type EditMapQuery = { __typename?: "QueryRoot" } & {
	map: { __typename?: "Map" } & MapInfoFragment & MapTilesFragment;
};

export type GetMapsPaginationQueryVariables = Exact<{
	limit?: Maybe<Scalars["Int"]>;
	offset?: Maybe<Scalars["Int"]>;
}>;

export type GetMapsPaginationQuery = { __typename?: "QueryRoot" } & {
	maps: Array<{ __typename?: "Map" } & MapInfoFragment>;
};

export type GetMapsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMapsQuery = { __typename?: "QueryRoot" } & {
	maps: Array<{ __typename?: "Map" } & MapInfoFragment>;
};

export type GetMapsByUserQueryVariables = Exact<{
	username: Scalars["String"];
	limit?: Maybe<Scalars["Int"]>;
	offset?: Maybe<Scalars["Int"]>;
}>;

export type GetMapsByUserQuery = { __typename?: "QueryRoot" } & {
	maps: Array<{ __typename?: "Map" } & MapInfoFragment>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "QueryRoot" } & {
	me: { __typename?: "User" } & Pick<
		User,
		"id" | "username" | "email" | "description"
	>;
};

export const MapInfoFragmentDoc = gql`
	fragment MapInfo on Map {
		id
		name
		author
		description
		createdAt
		updatedAt
		size {
			row
			column
		}
	}
`;
export const MapTilesFragmentDoc = gql`
	fragment MapTiles on Map {
		tiles {
			id
			baseTerrain
			terrainFeatures
			resource
			units
		}
	}
`;
export const CreateMapDocument = gql`
	mutation CreateMap($newMap: NewMap!) {
		createMap(newMap: $newMap) {
			...MapInfo
			...MapTiles
		}
	}
	${MapInfoFragmentDoc}
	${MapTilesFragmentDoc}
`;
export type CreateMapMutationFn = Apollo.MutationFunction<
	CreateMapMutation,
	CreateMapMutationVariables
>;

/**
 * __useCreateMapMutation__
 *
 * To run a mutation, you first call `useCreateMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMapMutation, { data, loading, error }] = useCreateMapMutation({
 *   variables: {
 *      newMap: // value for 'newMap'
 *   },
 * });
 */
export function useCreateMapMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateMapMutation,
		CreateMapMutationVariables
	>,
) {
	return Apollo.useMutation<CreateMapMutation, CreateMapMutationVariables>(
		CreateMapDocument,
		baseOptions,
	);
}
export type CreateMapMutationHookResult = ReturnType<
	typeof useCreateMapMutation
>;
export type CreateMapMutationResult = Apollo.MutationResult<CreateMapMutation>;
export type CreateMapMutationOptions = Apollo.BaseMutationOptions<
	CreateMapMutation,
	CreateMapMutationVariables
>;
export const DeleteMapDocument = gql`
	mutation DeleteMap($mapID: ID!) {
		deleteMap(id: $mapID) {
			id
		}
	}
`;
export type DeleteMapMutationFn = Apollo.MutationFunction<
	DeleteMapMutation,
	DeleteMapMutationVariables
>;

/**
 * __useDeleteMapMutation__
 *
 * To run a mutation, you first call `useDeleteMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMapMutation, { data, loading, error }] = useDeleteMapMutation({
 *   variables: {
 *      mapID: // value for 'mapID'
 *   },
 * });
 */
export function useDeleteMapMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteMapMutation,
		DeleteMapMutationVariables
	>,
) {
	return Apollo.useMutation<DeleteMapMutation, DeleteMapMutationVariables>(
		DeleteMapDocument,
		baseOptions,
	);
}
export type DeleteMapMutationHookResult = ReturnType<
	typeof useDeleteMapMutation
>;
export type DeleteMapMutationResult = Apollo.MutationResult<DeleteMapMutation>;
export type DeleteMapMutationOptions = Apollo.BaseMutationOptions<
	DeleteMapMutation,
	DeleteMapMutationVariables
>;
export const UpdateTileDocument = gql`
	mutation UpdateTile(
		$mapID: ID!
		$tileID: ID!
		$updateValue: UpdateTileConfig!
	) {
		updateTile(mapId: $mapID, tileId: $tileID, updateValue: $updateValue)
	}
`;
export type UpdateTileMutationFn = Apollo.MutationFunction<
	UpdateTileMutation,
	UpdateTileMutationVariables
>;

/**
 * __useUpdateTileMutation__
 *
 * To run a mutation, you first call `useUpdateTileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTileMutation, { data, loading, error }] = useUpdateTileMutation({
 *   variables: {
 *      mapID: // value for 'mapID'
 *      tileID: // value for 'tileID'
 *      updateValue: // value for 'updateValue'
 *   },
 * });
 */
export function useUpdateTileMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateTileMutation,
		UpdateTileMutationVariables
	>,
) {
	return Apollo.useMutation<UpdateTileMutation, UpdateTileMutationVariables>(
		UpdateTileDocument,
		baseOptions,
	);
}
export type UpdateTileMutationHookResult = ReturnType<
	typeof useUpdateTileMutation
>;
export type UpdateTileMutationResult = Apollo.MutationResult<
	UpdateTileMutation
>;
export type UpdateTileMutationOptions = Apollo.BaseMutationOptions<
	UpdateTileMutation,
	UpdateTileMutationVariables
>;
export const UpdateUserDocument = gql`
	mutation UpdateUser($updateValue: UpdateUser!) {
		updateUserInfo(updateValue: $updateValue) {
			id
			username
			description
			email
		}
	}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
	UpdateUserMutation,
	UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateValue: // value for 'updateValue'
 *   },
 * });
 */
export function useUpdateUserMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateUserMutation,
		UpdateUserMutationVariables
	>,
) {
	return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
		UpdateUserDocument,
		baseOptions,
	);
}
export type UpdateUserMutationHookResult = ReturnType<
	typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult = Apollo.MutationResult<
	UpdateUserMutation
>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
	UpdateUserMutation,
	UpdateUserMutationVariables
>;
export const CreateNewUserDocument = gql`
	mutation CreateNewUser($data: CreateUser!) {
		createNewUser(newUser: $data) {
			id
			username
			email
			description
		}
	}
`;
export type CreateNewUserMutationFn = Apollo.MutationFunction<
	CreateNewUserMutation,
	CreateNewUserMutationVariables
>;

/**
 * __useCreateNewUserMutation__
 *
 * To run a mutation, you first call `useCreateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewUserMutation, { data, loading, error }] = useCreateNewUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewUserMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateNewUserMutation,
		CreateNewUserMutationVariables
	>,
) {
	return Apollo.useMutation<
		CreateNewUserMutation,
		CreateNewUserMutationVariables
	>(CreateNewUserDocument, baseOptions);
}
export type CreateNewUserMutationHookResult = ReturnType<
	typeof useCreateNewUserMutation
>;
export type CreateNewUserMutationResult = Apollo.MutationResult<
	CreateNewUserMutation
>;
export type CreateNewUserMutationOptions = Apollo.BaseMutationOptions<
	CreateNewUserMutation,
	CreateNewUserMutationVariables
>;
export const LoginDocument = gql`
	mutation Login($data: LoginUser!) {
		loginUser(loginUser: $data) {
			accessToken
			refreshToken
		}
	}
`;
export type LoginMutationFn = Apollo.MutationFunction<
	LoginMutation,
	LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
	baseOptions?: Apollo.MutationHookOptions<
		LoginMutation,
		LoginMutationVariables
	>,
) {
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
		LoginDocument,
		baseOptions,
	);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
	LoginMutation,
	LoginMutationVariables
>;
export const EditMapDocument = gql`
	query EditMap($mapID: ID!) {
		map(id: $mapID) {
			...MapInfo
			...MapTiles
		}
	}
	${MapInfoFragmentDoc}
	${MapTilesFragmentDoc}
`;

/**
 * __useEditMapQuery__
 *
 * To run a query within a React component, call `useEditMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditMapQuery({
 *   variables: {
 *      mapID: // value for 'mapID'
 *   },
 * });
 */
export function useEditMapQuery(
	baseOptions?: Apollo.QueryHookOptions<EditMapQuery, EditMapQueryVariables>,
) {
	return Apollo.useQuery<EditMapQuery, EditMapQueryVariables>(
		EditMapDocument,
		baseOptions,
	);
}
export function useEditMapLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		EditMapQuery,
		EditMapQueryVariables
	>,
) {
	return Apollo.useLazyQuery<EditMapQuery, EditMapQueryVariables>(
		EditMapDocument,
		baseOptions,
	);
}
export type EditMapQueryHookResult = ReturnType<typeof useEditMapQuery>;
export type EditMapLazyQueryHookResult = ReturnType<typeof useEditMapLazyQuery>;
export type EditMapQueryResult = Apollo.QueryResult<
	EditMapQuery,
	EditMapQueryVariables
>;
export const GetMapsPaginationDocument = gql`
	query GetMapsPagination($limit: Int, $offset: Int) {
		maps(limit: $limit, skip: $offset) {
			...MapInfo
		}
	}
	${MapInfoFragmentDoc}
`;

/**
 * __useGetMapsPaginationQuery__
 *
 * To run a query within a React component, call `useGetMapsPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapsPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapsPaginationQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMapsPaginationQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetMapsPaginationQuery,
		GetMapsPaginationQueryVariables
	>,
) {
	return Apollo.useQuery<
		GetMapsPaginationQuery,
		GetMapsPaginationQueryVariables
	>(GetMapsPaginationDocument, baseOptions);
}
export function useGetMapsPaginationLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetMapsPaginationQuery,
		GetMapsPaginationQueryVariables
	>,
) {
	return Apollo.useLazyQuery<
		GetMapsPaginationQuery,
		GetMapsPaginationQueryVariables
	>(GetMapsPaginationDocument, baseOptions);
}
export type GetMapsPaginationQueryHookResult = ReturnType<
	typeof useGetMapsPaginationQuery
>;
export type GetMapsPaginationLazyQueryHookResult = ReturnType<
	typeof useGetMapsPaginationLazyQuery
>;
export type GetMapsPaginationQueryResult = Apollo.QueryResult<
	GetMapsPaginationQuery,
	GetMapsPaginationQueryVariables
>;
export const GetMapsDocument = gql`
	query GetMaps {
		maps {
			...MapInfo
		}
	}
	${MapInfoFragmentDoc}
`;

/**
 * __useGetMapsQuery__
 *
 * To run a query within a React component, call `useGetMapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMapsQuery(
	baseOptions?: Apollo.QueryHookOptions<GetMapsQuery, GetMapsQueryVariables>,
) {
	return Apollo.useQuery<GetMapsQuery, GetMapsQueryVariables>(
		GetMapsDocument,
		baseOptions,
	);
}
export function useGetMapsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetMapsQuery,
		GetMapsQueryVariables
	>,
) {
	return Apollo.useLazyQuery<GetMapsQuery, GetMapsQueryVariables>(
		GetMapsDocument,
		baseOptions,
	);
}
export type GetMapsQueryHookResult = ReturnType<typeof useGetMapsQuery>;
export type GetMapsLazyQueryHookResult = ReturnType<typeof useGetMapsLazyQuery>;
export type GetMapsQueryResult = Apollo.QueryResult<
	GetMapsQuery,
	GetMapsQueryVariables
>;
export const GetMapsByUserDocument = gql`
	query GetMapsByUser($username: String!, $limit: Int, $offset: Int) {
		maps(filter: { author: $username }, limit: $limit, skip: $offset) {
			...MapInfo
		}
	}
	${MapInfoFragmentDoc}
`;

/**
 * __useGetMapsByUserQuery__
 *
 * To run a query within a React component, call `useGetMapsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapsByUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMapsByUserQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetMapsByUserQuery,
		GetMapsByUserQueryVariables
	>,
) {
	return Apollo.useQuery<GetMapsByUserQuery, GetMapsByUserQueryVariables>(
		GetMapsByUserDocument,
		baseOptions,
	);
}
export function useGetMapsByUserLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetMapsByUserQuery,
		GetMapsByUserQueryVariables
	>,
) {
	return Apollo.useLazyQuery<GetMapsByUserQuery, GetMapsByUserQueryVariables>(
		GetMapsByUserDocument,
		baseOptions,
	);
}
export type GetMapsByUserQueryHookResult = ReturnType<
	typeof useGetMapsByUserQuery
>;
export type GetMapsByUserLazyQueryHookResult = ReturnType<
	typeof useGetMapsByUserLazyQuery
>;
export type GetMapsByUserQueryResult = Apollo.QueryResult<
	GetMapsByUserQuery,
	GetMapsByUserQueryVariables
>;
export const MeDocument = gql`
	query Me {
		me {
			id
			username
			email
			description
		}
	}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
	baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
	return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
	return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
		MeDocument,
		baseOptions,
	);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;

export type IntrospectionResultData = {
	__schema: {
		types: [];
	};
};
const result: IntrospectionResultData = {
	__schema: {
		types: [],
	},
};
export default result;
