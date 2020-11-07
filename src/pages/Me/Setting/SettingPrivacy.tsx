import React from "react";
import { CoolBox } from "../../../common";
import { Field, Control, Checkbox } from "@faramo.zayw/reabulma";

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
