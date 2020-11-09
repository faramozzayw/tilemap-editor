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
	Cursor: any;
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
	id: Scalars["Uuid"];
	name: Scalars["String"];
	author: Author;
	coAuthor?: Maybe<Array<Author>>;
	description?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["UtcDateTime"]>;
	createdAt: Scalars["UtcDateTime"];
	size: MapSize;
	tiles?: Maybe<Array<TileConfig>>;
};

export type Author = {
	__typename?: "Author";
	id: Scalars["Uuid"];
	username: Scalars["String"];
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
	updateUserInfo: ReturnUser;
	signUp: Jwt;
	login: Jwt;
	loginByGoolge: Jwt;
	refreshAccessToken: Jwt;
	deleteUser: Scalars["String"];
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

export type MutationRootUpdateUserInfoArgs = {
	updateValue: UpdateUser;
};

export type MutationRootSignUpArgs = {
	newUser: CreateUser;
};

export type MutationRootLoginArgs = {
	loginUser: LoginUser;
};

export type MutationRootLoginByGoolgeArgs = {
	googleLogin: GoogleInput;
};

export type MutationRootRefreshAccessTokenArgs = {
	refreshToken: Scalars["Uuid"];
};

export type MutationRootDeleteUserArgs = {
	id: Scalars["Uuid"];
};

/** JSON Web Token */
export type Jwt = {
	__typename?: "JWT";
	accessToken: Scalars["String"];
	refreshToken: Scalars["Uuid"];
};

export type MapPage = {
	__typename?: "MapPage";
	edges?: Maybe<Array<MapEdge>>;
	pageInfo?: Maybe<PageInfo>;
};

export type UpdateMap = {
	name?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
};

export type QueryRoot = {
	__typename?: "QueryRoot";
	mapsPagination: MapPage;
	/** Get a game map by ID */
	map: Map;
	maps: Array<Map>;
	/** Ok zoomer! */
	boomer: Scalars["String"];
	me: User;
	getUserById: User;
	getUserByUsername: User;
};

export type QueryRootMapsPaginationArgs = {
	filter?: Maybe<MapFilter>;
	first?: Maybe<Scalars["Int"]>;
	after?: Maybe<Scalars["Cursor"]>;
	sort?: Maybe<MapSort>;
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

export type QueryRootGetUserByUsernameArgs = {
	username: Scalars["String"];
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

export type GoogleInput = {
	gooogleId: Scalars["String"];
	email: Scalars["String"];
	username: Scalars["String"];
	imageUrl?: Maybe<Scalars["String"]>;
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

export type MapEdge = {
	__typename?: "MapEdge";
	node: Map;
	cursor: Scalars["Cursor"];
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
	imageUrl?: Maybe<Scalars["String"]>;
	googleId?: Maybe<Scalars["String"]>;
};

export type NewMap = {
	name: Scalars["String"];
	/** `author` is no longer needed to create a map */
	author?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
	size: NewMapSize;
};

export type PageInfo = {
	__typename?: "PageInfo";
	hasNextPage: Scalars["Boolean"];
	hasPreviousPage: Scalars["Boolean"];
	startCursor?: Maybe<Scalars["Cursor"]>;
	endCursor?: Maybe<Scalars["Cursor"]>;
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
	"id" | "name" | "description" | "createdAt" | "updatedAt"
> & {
		author: { __typename?: "Author" } & Pick<Author, "id" | "username">;
		size: { __typename?: "MapSize" } & Pick<MapSize, "row" | "column">;
	};

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

export type UserInfoFragment = { __typename?: "User" } & Pick<
	User,
	"id" | "username" | "email" | "description" | "imageUrl"
>;

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
	data: UpdateUser;
}>;

export type UpdateUserMutation = { __typename?: "MutationRoot" } & {
	updateUserInfo: { __typename?: "ReturnUser" } & Pick<
		ReturnUser,
		"id" | "username" | "description" | "email"
	>;
};

export type DeleteUserMutationVariables = Exact<{
	id: Scalars["Uuid"];
}>;

export type DeleteUserMutation = { __typename?: "MutationRoot" } & Pick<
	MutationRoot,
	"deleteUser"
>;

export type SignUpMutationVariables = Exact<{
	data: CreateUser;
}>;

export type SignUpMutation = { __typename?: "MutationRoot" } & {
	signUp: { __typename?: "JWT" } & Pick<Jwt, "accessToken" | "refreshToken">;
};

export type LoginMutationVariables = Exact<{
	data: LoginUser;
}>;

export type LoginMutation = { __typename?: "MutationRoot" } & {
	login: { __typename?: "JWT" } & Pick<Jwt, "accessToken" | "refreshToken">;
};

export type RefreshAccessTokenMutationVariables = Exact<{
	refreshToken: Scalars["Uuid"];
}>;

export type RefreshAccessTokenMutation = { __typename?: "MutationRoot" } & {
	refreshAccessToken: { __typename?: "JWT" } & Pick<
		Jwt,
		"accessToken" | "refreshToken"
	>;
};

export type LoginByGoolgeMutationVariables = Exact<{
	loginData: GoogleInput;
}>;

export type LoginByGoolgeMutation = { __typename?: "MutationRoot" } & {
	loginByGoolge: { __typename?: "JWT" } & Pick<
		Jwt,
		"accessToken" | "refreshToken"
	>;
};

export type GetMapByIdQueryVariables = Exact<{
	mapID: Scalars["ID"];
}>;

export type GetMapByIdQuery = { __typename?: "QueryRoot" } & {
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

export type MapsPaginationQueryVariables = Exact<{
	first?: Maybe<Scalars["Int"]>;
	after?: Maybe<Scalars["Cursor"]>;
	filter?: Maybe<MapFilter>;
}>;

export type MapsPaginationQuery = { __typename?: "QueryRoot" } & {
	mapsPagination: { __typename?: "MapPage" } & {
		edges?: Maybe<
			Array<
				{ __typename?: "MapEdge" } & Pick<MapEdge, "cursor"> & {
						node: { __typename?: "Map" } & MapInfoFragment;
					}
			>
		>;
		pageInfo?: Maybe<
			{ __typename?: "PageInfo" } & Pick<
				PageInfo,
				"startCursor" | "endCursor" | "hasNextPage" | "hasPreviousPage"
			>
		>;
	};
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
	me: { __typename?: "User" } & UserInfoFragment;
};

export type GetUserByIdQueryVariables = Exact<{
	id: Scalars["Uuid"];
}>;

export type GetUserByIdQuery = { __typename?: "QueryRoot" } & {
	getUserById: { __typename?: "User" } & UserInfoFragment;
};

export type GetUserByUsernameQueryVariables = Exact<{
	username: Scalars["String"];
}>;

export type GetUserByUsernameQuery = { __typename?: "QueryRoot" } & {
	getUserByUsername: { __typename?: "User" } & UserInfoFragment;
};

export const MapInfoFragmentDoc = gql`
	fragment MapInfo on Map {
		id
		name
		author {
			id
			username
		}
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
export const UserInfoFragmentDoc = gql`
	fragment UserInfo on User {
		id
		username
		email
		description
		imageUrl
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
	mutation UpdateUser($data: UpdateUser!) {
		updateUserInfo(updateValue: $data) {
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
 *      data: // value for 'data'
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
export const DeleteUserDocument = gql`
	mutation DeleteUser($id: Uuid!) {
		deleteUser(id: $id)
	}
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
	DeleteUserMutation,
	DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteUserMutation,
		DeleteUserMutationVariables
	>,
) {
	return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
		DeleteUserDocument,
		baseOptions,
	);
}
export type DeleteUserMutationHookResult = ReturnType<
	typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult = Apollo.MutationResult<
	DeleteUserMutation
>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
	DeleteUserMutation,
	DeleteUserMutationVariables
>;
export const SignUpDocument = gql`
	mutation SignUp($data: CreateUser!) {
		signUp(newUser: $data) {
			accessToken
			refreshToken
		}
	}
`;
export type SignUpMutationFn = Apollo.MutationFunction<
	SignUpMutation,
	SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SignUpMutation,
		SignUpMutationVariables
	>,
) {
	return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
		SignUpDocument,
		baseOptions,
	);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
	SignUpMutation,
	SignUpMutationVariables
>;
export const LoginDocument = gql`
	mutation Login($data: LoginUser!) {
		login(loginUser: $data) {
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
export const RefreshAccessTokenDocument = gql`
	mutation RefreshAccessToken($refreshToken: Uuid!) {
		refreshAccessToken(refreshToken: $refreshToken) {
			accessToken
			refreshToken
		}
	}
`;
export type RefreshAccessTokenMutationFn = Apollo.MutationFunction<
	RefreshAccessTokenMutation,
	RefreshAccessTokenMutationVariables
>;

/**
 * __useRefreshAccessTokenMutation__
 *
 * To run a mutation, you first call `useRefreshAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessTokenMutation, { data, loading, error }] = useRefreshAccessTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshAccessTokenMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RefreshAccessTokenMutation,
		RefreshAccessTokenMutationVariables
	>,
) {
	return Apollo.useMutation<
		RefreshAccessTokenMutation,
		RefreshAccessTokenMutationVariables
	>(RefreshAccessTokenDocument, baseOptions);
}
export type RefreshAccessTokenMutationHookResult = ReturnType<
	typeof useRefreshAccessTokenMutation
>;
export type RefreshAccessTokenMutationResult = Apollo.MutationResult<
	RefreshAccessTokenMutation
>;
export type RefreshAccessTokenMutationOptions = Apollo.BaseMutationOptions<
	RefreshAccessTokenMutation,
	RefreshAccessTokenMutationVariables
>;
export const LoginByGoolgeDocument = gql`
	mutation LoginByGoolge($loginData: GoogleInput!) {
		loginByGoolge(googleLogin: $loginData) {
			accessToken
			refreshToken
		}
	}
`;
export type LoginByGoolgeMutationFn = Apollo.MutationFunction<
	LoginByGoolgeMutation,
	LoginByGoolgeMutationVariables
>;

/**
 * __useLoginByGoolgeMutation__
 *
 * To run a mutation, you first call `useLoginByGoolgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginByGoolgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginByGoolgeMutation, { data, loading, error }] = useLoginByGoolgeMutation({
 *   variables: {
 *      loginData: // value for 'loginData'
 *   },
 * });
 */
export function useLoginByGoolgeMutation(
	baseOptions?: Apollo.MutationHookOptions<
		LoginByGoolgeMutation,
		LoginByGoolgeMutationVariables
	>,
) {
	return Apollo.useMutation<
		LoginByGoolgeMutation,
		LoginByGoolgeMutationVariables
	>(LoginByGoolgeDocument, baseOptions);
}
export type LoginByGoolgeMutationHookResult = ReturnType<
	typeof useLoginByGoolgeMutation
>;
export type LoginByGoolgeMutationResult = Apollo.MutationResult<
	LoginByGoolgeMutation
>;
export type LoginByGoolgeMutationOptions = Apollo.BaseMutationOptions<
	LoginByGoolgeMutation,
	LoginByGoolgeMutationVariables
>;
export const GetMapByIdDocument = gql`
	query GetMapById($mapID: ID!) {
		map(id: $mapID) {
			...MapInfo
			...MapTiles
		}
	}
	${MapInfoFragmentDoc}
	${MapTilesFragmentDoc}
`;

/**
 * __useGetMapByIdQuery__
 *
 * To run a query within a React component, call `useGetMapByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapByIdQuery({
 *   variables: {
 *      mapID: // value for 'mapID'
 *   },
 * });
 */
export function useGetMapByIdQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetMapByIdQuery,
		GetMapByIdQueryVariables
	>,
) {
	return Apollo.useQuery<GetMapByIdQuery, GetMapByIdQueryVariables>(
		GetMapByIdDocument,
		baseOptions,
	);
}
export function useGetMapByIdLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetMapByIdQuery,
		GetMapByIdQueryVariables
	>,
) {
	return Apollo.useLazyQuery<GetMapByIdQuery, GetMapByIdQueryVariables>(
		GetMapByIdDocument,
		baseOptions,
	);
}
export type GetMapByIdQueryHookResult = ReturnType<typeof useGetMapByIdQuery>;
export type GetMapByIdLazyQueryHookResult = ReturnType<
	typeof useGetMapByIdLazyQuery
>;
export type GetMapByIdQueryResult = Apollo.QueryResult<
	GetMapByIdQuery,
	GetMapByIdQueryVariables
>;
export const GetMapsPaginationDocument = gql`
	query GetMapsPagination($limit: Int, $offset: Int) {
		maps(limit: $limit, skip: $offset, sort: { createdAt: ASC }) {
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
export const MapsPaginationDocument = gql`
	query mapsPagination($first: Int, $after: Cursor, $filter: MapFilter) {
		mapsPagination(first: $first, after: $after, filter: $filter) {
			edges {
				node {
					...MapInfo
				}
				cursor
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}
	${MapInfoFragmentDoc}
`;

/**
 * __useMapsPaginationQuery__
 *
 * To run a query within a React component, call `useMapsPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useMapsPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMapsPaginationQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMapsPaginationQuery(
	baseOptions?: Apollo.QueryHookOptions<
		MapsPaginationQuery,
		MapsPaginationQueryVariables
	>,
) {
	return Apollo.useQuery<MapsPaginationQuery, MapsPaginationQueryVariables>(
		MapsPaginationDocument,
		baseOptions,
	);
}
export function useMapsPaginationLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		MapsPaginationQuery,
		MapsPaginationQueryVariables
	>,
) {
	return Apollo.useLazyQuery<MapsPaginationQuery, MapsPaginationQueryVariables>(
		MapsPaginationDocument,
		baseOptions,
	);
}
export type MapsPaginationQueryHookResult = ReturnType<
	typeof useMapsPaginationQuery
>;
export type MapsPaginationLazyQueryHookResult = ReturnType<
	typeof useMapsPaginationLazyQuery
>;
export type MapsPaginationQueryResult = Apollo.QueryResult<
	MapsPaginationQuery,
	MapsPaginationQueryVariables
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
			...UserInfo
		}
	}
	${UserInfoFragmentDoc}
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
export const GetUserByIdDocument = gql`
	query GetUserByID($id: Uuid!) {
		getUserById(id: $id) {
			...UserInfo
		}
	}
	${UserInfoFragmentDoc}
`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetUserByIdQuery,
		GetUserByIdQueryVariables
	>,
) {
	return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
		GetUserByIdDocument,
		baseOptions,
	);
}
export function useGetUserByIdLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetUserByIdQuery,
		GetUserByIdQueryVariables
	>,
) {
	return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
		GetUserByIdDocument,
		baseOptions,
	);
}
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<
	typeof useGetUserByIdLazyQuery
>;
export type GetUserByIdQueryResult = Apollo.QueryResult<
	GetUserByIdQuery,
	GetUserByIdQueryVariables
>;
export const GetUserByUsernameDocument = gql`
	query GetUserByUsername($username: String!) {
		getUserByUsername(username: $username) {
			...UserInfo
		}
	}
	${UserInfoFragmentDoc}
`;

/**
 * __useGetUserByUsernameQuery__
 *
 * To run a query within a React component, call `useGetUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserByUsernameQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetUserByUsernameQuery,
		GetUserByUsernameQueryVariables
	>,
) {
	return Apollo.useQuery<
		GetUserByUsernameQuery,
		GetUserByUsernameQueryVariables
	>(GetUserByUsernameDocument, baseOptions);
}
export function useGetUserByUsernameLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetUserByUsernameQuery,
		GetUserByUsernameQueryVariables
	>,
) {
	return Apollo.useLazyQuery<
		GetUserByUsernameQuery,
		GetUserByUsernameQueryVariables
	>(GetUserByUsernameDocument, baseOptions);
}
export type GetUserByUsernameQueryHookResult = ReturnType<
	typeof useGetUserByUsernameQuery
>;
export type GetUserByUsernameLazyQueryHookResult = ReturnType<
	typeof useGetUserByUsernameLazyQuery
>;
export type GetUserByUsernameQueryResult = Apollo.QueryResult<
	GetUserByUsernameQuery,
	GetUserByUsernameQueryVariables
>;

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
