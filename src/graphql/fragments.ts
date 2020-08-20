import { gql } from "@apollo/client";

export const MapInfoFrag = gql`
	fragment MapInfo on Map {
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
`;
