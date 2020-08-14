import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
const gql = Apollo.gql;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
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
	filter?: Maybe<Scalars["String"]>;
	skip?: Maybe<Scalars["Int"]>;
	limit?: Maybe<Scalars["Int"]>;
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

export type Map = {
	__typename?: "Map";
	id: Scalars["ID"];
	name: Scalars["String"];
	author: Scalars["String"];
	description?: Maybe<Scalars["String"]>;
	lastEdit?: Maybe<Scalars["String"]>;
	createData: Scalars["String"];
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

/** Base terrain variants for a hex */
export enum BaseTerrain {
	Coast = "Coast",
	Desert = "Desert",
	Grassland = "Grassland",
	Ocean = "Ocean",
	Show = "Show",
	Forest = "Forest",
	Jungle = "Jungle",
}

export type NewMap = {
	name: Scalars["String"];
	author: Scalars["String"];
	description?: Maybe<Scalars["String"]>;
	lastEdit?: Maybe<Scalars["String"]>;
	createData: Scalars["String"];
	size: NewMapSize;
};

export type UpdateMap = {
	name?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
};

export type EditMapQueryVariables = Exact<{
	mapID: Scalars["ID"];
}>;

export type EditMapQuery = { __typename?: "QueryRoot" } & {
	map: { __typename?: "Map" } & Pick<
		Map,
		"id" | "name" | "author" | "description" | "lastEdit" | "createData"
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

export const EditMapDocument = gql`
	query EditMap($mapID: ID!) {
		map(id: $mapID) {
			id
			name
			author
			description
			lastEdit
			createData
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
