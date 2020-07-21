import React from "react";

export default function AtkRes(props) {
	let type = "";
	let value = props.value;
	switch (props.type) {
		case "blunt":
		case "strike":
		case "blow":
			type = "blow";
			break;
		case "piercing":
		case "pierce":
			type = "pierce";
			break;
		case "shot":
		case "shoot":
		case "shooting":
		case "missile":
			type = "shot";
			break;
		case "slash":
			type = "slash";
			break;
		case "magic":
			type = "magic";
			break;
	}

	return (
		<div className="square d-flex flex-column">
			<div className="d-flex">
				<img src={`../img/UI/statusattackicon_none_${type}.png`} />
				{value > 0 ? <img src={`../img/UI/bufftype_text_up.png`} /> : value < 0 ? <img src={`../img/UI/bufftype_text_down.png`} /> : ""}
			</div>
			<div>
				{value >= 100 ? (
					<div className="green">Imm.</div>
				) : value > 0 ? (
					<div className="green">{value}%</div>
				) : value == 0 || !value ? (
					<div className="white">--</div>
				) : (
					<div className="red">{value}%</div>
				)}
			</div>
		</div>
	);
}
