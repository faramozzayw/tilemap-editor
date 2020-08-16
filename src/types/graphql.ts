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
	/** DateTime */
	DateTimeUtc: any;
};

export type QueryRoot = {
	__typename?: "QueryRoot";
	/** Get a game map by ID */
	map: Map;
	maps: Array<Map>;
	/** Ok zoomer! */
	boomer: Scalars["String"];
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
	date?: Maybe<SortOrder>;
};

export type Map = {
	__typename?: "Map";
	id: Scalars["ID"];
	name: Scalars["String"];
	author: Scalars["String"];
	description?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["DateTimeUtc"]>;
	createdAt: Scalars["DateTimeUtc"];
	size: MapSize;
	tiles?: Maybe<Array<TileConfig>>;
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

export type MutationRoot = {
	__typename?: "MutationRoot";
	/** Creating a new map */
	createMap: Map;
	/** Deleting a map by ID */
	deleteMap: Map;
	updateTile: Scalars["String"];
	/** Updating part of map information by ID */
	updateMapInfo: Scalars["String"];
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

export type NewMap = {
	name: Scalars["String"];
	author: Scalars["String"];
	description?: Maybe<Scalars["String"]>;
	size: NewMapSize;
};

export type UpdateMap = {
	name?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
};

export type CreateMapMutationVariables = Exact<{
	newMap: NewMap;
}>;

export type CreateMapMutation = { __typename?: "MutationRoot" } & {
	createMap: { __typename?: "Map" } & Pick<
		Map,
		"id" | "name" | "author" | "description" | "updatedAt" | "createdAt"
	> & {
			size: { __typename?: "MapSize" } & Pick<MapSize, "row" | "column">;
			tiles?: Maybe<
				Array<
					{ __typename?: "TileConfig" } & Pick<
						TileConfig,
						"id" | "baseTerrain" | "terrainFeatures" | "resource" | "units"
					>
				>
			>;
		};
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

export type EditMapQueryVariables = Exact<{
	mapID: Scalars["ID"];
}>;

export type EditMapQuery = { __typename?: "QueryRoot" } & {
	map: { __typename?: "Map" } & Pick<
		Map,
		"id" | "name" | "author" | "description" | "updatedAt" | "createdAt"
	> & {
			size: { __typename?: "MapSize" } & Pick<MapSize, "row" | "column">;
			tiles?: Maybe<
				Array<
					{ __typename?: "TileConfig" } & Pick<
						TileConfig,
						"id" | "baseTerrain" | "terrainFeatures" | "resource" | "units"
					>
				>
			>;
		};
};

export type GEtMapsQueryVariables = Exact<{ [key: string]: never }>;

export type GEtMapsQuery = { __typename?: "QueryRoot" } & {
	maps: Array<
		{ __typename?: "Map" } & Pick<
			Map,
			"id" | "name" | "author" | "description" | "createdAt"
		> & { size: { __typename?: "MapSize" } & Pick<MapSize, "row" | "column"> }
	>;
};

export const CreateMapDocument = gql`
	mutation CreateMap($newMap: NewMap!) {
		createMap(newMap: $newMap) {
			id
			name
			author
			description
			updatedAt
			createdAt
			size {
				row
				column
			}
			tiles {
				id
				baseTerrain
				terrainFeatures
				resource
				units
			}
		}
	}
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
export const EditMapDocument = gql`
	query EditMap($mapID: ID!) {
		map(id: $mapID) {
			id
			name
			author
			description
			updatedAt
			createdAt
			size {
				row
				column
			}
			tiles {
				id
				baseTerrain
				terrainFeatures
				resource
				units
			}
		}
	}
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
export const GEtMapsDocument = gql`
	query GEtMaps {
		maps {
			id
			name
			author
			description
			createdAt
			size {
				row
				column
			}
		}
	}
`;

/**
 * __useGEtMapsQuery__
 *
 * To run a query within a React component, call `useGEtMapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGEtMapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGEtMapsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGEtMapsQuery(
	baseOptions?: Apollo.QueryHookOptions<GEtMapsQuery, GEtMapsQueryVariables>,
) {
	return Apollo.useQuery<GEtMapsQuery, GEtMapsQueryVariables>(
		GEtMapsDocument,
		baseOptions,
	);
}
export function useGEtMapsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GEtMapsQuery,
		GEtMapsQueryVariables
	>,
) {
	return Apollo.useLazyQuery<GEtMapsQuery, GEtMapsQueryVariables>(
		GEtMapsDocument,
		baseOptions,
	);
}
export type GEtMapsQueryHookResult = ReturnType<typeof useGEtMapsQuery>;
export type GEtMapsLazyQueryHookResult = ReturnType<typeof useGEtMapsLazyQuery>;
export type GEtMapsQueryResult = Apollo.QueryResult<
	GEtMapsQuery,
	GEtMapsQueryVariables
>;
