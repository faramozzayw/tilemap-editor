import React from "react";
import { Field, Control, Checkbox } from "@faramo.zayw/reabulma";

import { CoolBox } from "../../common";

export const SettingPrivacy = () => (
	<CoolBox title="privacy">
		<form>
			<Field>
				<Control>
					<Checkbox className="has-text-white-bis"> show email</Checkbox>
				</Control>
			</Field>
		</form>
	</CoolBox>
);
