import React from "react";
import { Tile } from "@faramo.zayw/reabulma";

import { SetDescription, SetPassword, DeleteUser } from "./Info";

export const SettingInfo = () => (
	<Tile isAncestor>
		<Tile isParent isVertical>
			<Tile isChild>
				<SetDescription />
			</Tile>
			<Tile isChild>
				<SetPassword />
			</Tile>
			<Tile isChild>
				<DeleteUser />
			</Tile>
		</Tile>
	</Tile>
);
