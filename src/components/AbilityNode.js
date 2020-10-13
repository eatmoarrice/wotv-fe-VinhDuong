import React, { useState } from "react";

export default function AbilityNode(props) {
	const joblist = {
		"Knight of Grandshelt": "lapsrain",
		Assassin: "ass",
		"Dual Gunner": "wgn",
		Squire: "fft0ramz",
		"Fell Knight": "fft0gfgr",
		"Sword Saint": "fft0ornd",
		Viking: "vik",
		Warrior: "war",
		Knight: "knt",
		Soldier: "swn",
		Ranger: "hun",
		Monk: "mnk",
		Lancer: "lan",
		Gunner: "gun",
		"White Mage": "whm",
		"Black Mage": "blm",
		"Red Mage": "rdm",
		"Green Mage": "grm",
		Samurai: "sam",
		Paladin: "pld",
		"Time Mage": "tim",
		Spellblade: "mgk",
		Cleric: "clr",
		Ninja: "nin",
		Dragoon: "drg",
		"Winged One": "lapsglms",
		Gunbreaker: "ff14tncr",
		Sorceress: "ff14ystl",
		Lord: "war",
		"White Mage of Lapis": "lapsfina",
		Thief: "thi"
	};

	const type = props.type;
	const job = joblist[props.job];
	const text = props.text;
	let abilityGlobal = "";
	let abilityType = "";
	let abilityWeapon = "";
	let nodeBG = "";
	let hover = "";

	switch (type) {
		case "action-global":
			nodeBG = "../img/board/abilityboard_panel_cover_unit_action_release.png";
			abilityGlobal = "../img/board/abilityboard_panel_main_base_on.png";
			abilityType = "../img/board/abilityboard_panel_type_unit_action.png";
			abilityWeapon = `../img/job-nodes/${job}_m.png`;
			hover = "board-red";
			break;
		case "action":
			nodeBG = "../img/board/abilityboard_panel_cover_unit_action_release.png";
			abilityType = "../img/board/abilityboard_panel_type_unit_action.png";
			abilityWeapon = `../img/job-nodes/${job}_m.png`;
			hover = "board-red";
			break;
		case "support":
			nodeBG = "../img/board/abilityboard_panel_cover_unit_support_release.png";
			abilityType = "../img/board/abilityboard_panel_type_unit_support.png";
			abilityWeapon = `../img/job-nodes/${job}_m.png`;
			hover = "board-green";
			break;
		case "status":
			nodeBG = "../img/board/abilityboard_panel_cover_unit_status_release.png";
			abilityType = "../img/board/abilityboard_panel_type_unit_status.png";
			abilityWeapon = `../img/job-nodes/${job}_m.png`;
			hover = "board-yellow";
			break;
		case "reaction":
			nodeBG = "../img/board/abilityboard_panel_cover_unit_reaction_release.png";
			abilityType = "../img/board/abilityboard_panel_type_unit_reaction.png";
			abilityWeapon = `../img/job-nodes/${job}_m.png`;
			hover = "board-blue";
			break;
		default:
			nodeBG = "../img/board/abilityboard_panel_cover_unit_status_release.png";
			abilityType = "../img/board/abilityboard_panel_type_unit_status.png";
			abilityWeapon = ``;
	}

	const showAndScroll = async (text) => {
		const response = await props.showSkillDetails(text);
		if (response) props.scrollHere();
	};
	return (
		<div className={hover}>
			<div className="d-flex justify-content-center align-items-center" onClick={() => showAndScroll(text)}>
				<div className="rel">
					<div className="d-flex justify-content-center align-items-center img-div">
						<img className="ability-bg" src={nodeBG} alt="" />
						<img className="ability-global" src={abilityGlobal} alt="" />
						<img className="ability-type" src={abilityType} alt="" />
						<img className="ability-weapon" src={abilityWeapon} alt="" />
						<p className="node-text">{text}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
