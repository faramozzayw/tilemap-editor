import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";

import { loader } from "./index";

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

const url = "https://threejsfundamentals.org/threejs/resources/images/wall.jpg";

export const Tile = ({ position }: any) => {
	const [hovered, setHover] = useState(false);
	const mesh = useRef<THREE.Mesh | null>(null);
	const texture = useMemo(() => loader.load(url), [url]);

	const { radiusBottom, radiusTop, height, radialSegments } = TileConfig;

	const onClick = () => {
		console.log(mesh.current);
	};

	return (
		<group>
			<mesh
				position={position}
				onClick={onClick}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => setHover(false)}
				ref={mesh}
			>
				<cylinderBufferGeometry
					attach="geometry"
					args={[radiusTop, radiusBottom, height, radialSegments]}
				/>
				<meshBasicMaterial
					attach="material"
					// color={hovered ? "hotpink" : "orange"}
					transparent
					map={texture}
				></meshBasicMaterial>
			</mesh>
		</group>
	);
};
