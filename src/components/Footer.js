import React from "react";

export default function Footer() {
	return (
		<div className="footer d-flex justify-content-center align-items-center p-4 flex-column">
			<div>
				<a href="https://github.com/eatmoarrice">
					<i class="fab fa-github fa-2x"></i>
				</a>
				<a href="https://www.reddit.com/message/compose/?to=MuaLon">
					<i class="fab fa-reddit fa-2x"></i>
				</a>
				<i class="fab fa-linkedin fa-2x"></i>
			</div>
			<span>
				This is a fansite made by <i>Vinh Duong</i> (hire me? :D)
			</span>
			Most of the visual media belongs to Square Enix Co., Ltd.
		</div>
	);
}
