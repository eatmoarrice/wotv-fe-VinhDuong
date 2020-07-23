import React from "react";

export default function Footer() {
	return (
		<div className="footer d-flex justify-content-center align-items-center p-4 flex-column">
			<div>
				<i class="fab fa-github fa-2x"></i>
				<i class="fab fa-reddit fa-2x"></i>
				<i class="fab fa-linkedin fa-2x"></i>
			</div>
			<span>
				This is a fansite made by <i>Vinh Duong</i>
			</span>
			Most of the visual media belongs to Square Enix Co., Ltd.
		</div>
	);
}
