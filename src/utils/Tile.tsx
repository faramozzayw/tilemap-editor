import React, { useRef, useState } from "react";

export interface ITileConfig {
	readonly radiusTop: number;
	readonly radiusBottom: number;
	readonly height: number;
	readonly radialSegments: number;
}

export const TileConfig: ITileConfig = {
	radiusTop: 5.0,
	radiusBottom: 5.5,
	height: 0.25,
	radialSegments: 6,
};

export const Tile = ({ position }: any) => {
	const [hovered, setHover] = useState(false);
	const mesh = useRef(null);

	const { radiusBottom, radiusTop, height, radialSegments } = TileConfig;

	return (
		<group>
			<mesh
				position={position}
				onClick={() => console.log("click")}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => setHover(false)}
				ref={mesh}
			>
				<cylinderBufferGeometry
					attach="geometry"
					args={[radiusTop, radiusBottom, height, radialSegments]}
				/>
				<meshStandardMaterial
					attach="material"
					color={hovered ? "hotpink" : "orange"}
				/>
			</mesh>
		</group>
	);
};
