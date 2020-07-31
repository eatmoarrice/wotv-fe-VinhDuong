import React from "react";

export default function ElementRes(props) {
	let value = props.value;
	let type = props.type;
	if (type == "thunder") type = "lightning";
	if (type == "light") type = "shine";

	return (
		<div className="square d-flex flex-column">
			<div className="d-flex">
				<img src={`../img/UI/element_icon_${type}.png`} />
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
