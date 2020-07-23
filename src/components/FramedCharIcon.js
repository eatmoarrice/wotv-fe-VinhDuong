import React from "react";

export default function FramedCharIcon(props) {
	const name = props.name;
	let frame = "";
	switch (props.rarity) {
		case "UR":
			frame = "05";
			break;
		case "MR":
			frame = "04";
			break;
		case "SR":
			frame = "03";
			break;
		case "R":
			frame = "02";
			break;
		case "N":
			frame = "01";
			break;
	}
	return (
		<div className="hexa">
			<div className="d-flex justify-content-center align-items-center">
				<div className="rel">
					<div className="board-profile img-div d-flex align-items-center justify-content-center">
						<img alt="" src={`../img/char/${name}.png`} width="80px" />
						<img alt="" src={`../img/frame/uniticon_frame_${frame}.png`} width="90px" />
					</div>
				</div>
			</div>
			<p className="text-white text-center">{name}</p>
		</div>
	);
}
