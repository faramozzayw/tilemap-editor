import React, { useState, Suspense } from "react";

import { Button } from "../../bulma";

const CreateMapModal = React.lazy(() => import("./CreateMapModal"));

export const CreateMap = () => {
	const [modalActive, toggleModal] = useState(false);

	return (
		<Suspense fallback={null}>
			<Button isOutlined isColor="primary" onClick={() => toggleModal(true)}>
				Create map!
			</Button>
			<CreateMapModal
				isActive={modalActive}
				closeModal={() => toggleModal(false)}
			/>
		</Suspense>
	);
};
