import React, { useState } from "react";

import AbilityNode from "./AbilityNode";

export default function AbilityBoard(props) {
	const { board, name, rarity } = props;
	let frame = "";
	switch (rarity) {
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
	const renderRow = (start, end) => {
		let row = [];
		for (let i = start; i <= end; i++) {
			row.push(<AbilityNode type={board[i].type} job={board[i].job} text={board[i].text} showSkillDetails={props.showSkillDetails} scrollHere={props.scrollHere} />);
		}
		return row;
	};

	return (
		<div className="abilityBoard pt-3">
			<div className="d-flex justify-content-center">{renderRow(0, 4)}</div>
			<div className="d-flex justify-content-center">{renderRow(5, 10)}</div>
			<div className="d-flex justify-content-center">{renderRow(11, 17)}</div>
			<div className="d-flex justify-content-center">{renderRow(18, 25)}</div>
			<div className="d-flex justify-content-center">
				{renderRow(26, 29)}
				<div className="hexa">
					<div className="d-flex justify-content-center align-items-center">
						<div className="rel">
							<div className="board-profile img-div d-flex align-items-center justify-content-center">
								<img alt="" src={`../img/char/${name}.png`} width="80px" />
								<img alt="" src={`../img/frame/uniticon_frame_${frame}.png`} width="90px" />
							</div>
						</div>
					</div>
				</div>
				{renderRow(30, 33)}
			</div>
			<div className="d-flex justify-content-center">{renderRow(34, 41)}</div>
			<div className="d-flex justify-content-center">{renderRow(42, 48)}</div>
			<div className="d-flex justify-content-center">{renderRow(49, 54)}</div>
			<div className="d-flex justify-content-center">{renderRow(55, 59)}</div>
		</div>
	);
}
