import React, { useState } from "react";

import { Button } from "../../bulma";
import { CreateMapModal } from "./CreateMapModal";

export const CreateMap = () => {
	const [modalActive, toggleModal] = useState(false);

	return (
		<>
			<Button isOutlined isColor="primary" onClick={() => toggleModal(true)}>
				Create map!
			</Button>
			<CreateMapModal
				isActive={modalActive}
				closeModal={() => toggleModal(false)}
			/>
		</>
	);
};
