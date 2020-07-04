import React, { useEffect, useState } from "react";

import { generateGridMatrix, $ } from "./../utils";
import { Canvas } from "react-three-fiber";

import { OrbitControls } from "drei";

export type ISizes = null | {
	width: number;
	height: number;
};

export const EditorCanvas = () => {
	const [size, setSize] = useState<ISizes>(null);

	useEffect(() => {
		const { offsetWidth: width, offsetHeight: height } = $(
			"#EditorCanvas-wrap",
		)[0] as HTMLElement;
		setSize({ width, height });
	}, []);

	const hexagons = generateGridMatrix(10, 10);

	if (!size) {
		return null;
	}

	return (
		<Canvas
			orthographic
			id="canvas-wrapper"
			style={{ width: size!.width, height: size!.height }}
			camera={{ position: [0, 5, 0], near: -50 }}
		>
			<OrbitControls />
			<gridHelper args={[500, 100]} />
			<axesHelper />
			<ambientLight />
			<pointLight position={[10, 5, 10]} />
			{hexagons}
		</Canvas>
	);
};
