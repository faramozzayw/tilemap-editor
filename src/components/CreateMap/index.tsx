import React, { useState, Suspense } from "react";

import { Button } from "@faramo.zayw/reabulma";

const CreateMapModal = React.lazy(() => import("./CreateMapModal"));

export const CreateMap = () => {
	const [modalActive, toggleModal] = useState(false);

	return (
		<Suspense fallback={null}>
			<Button
				isOutlined
				isColor="primary"
				isRounded
				onClick={() => toggleModal(true)}
			>
				<span>
					<i className="fas fa-map"></i> Create map!
				</span>
			</Button>
			<CreateMapModal
				isActive={modalActive}
				closeModal={() => toggleModal(false)}
			/>
		</Suspense>
	);
};
