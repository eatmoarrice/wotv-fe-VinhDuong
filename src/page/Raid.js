import React from "react";
import AtkRes from "../components/AtkRes";
import ElementRes from "../components/ElementRes";
import StatusRes from "../components/StatusRes";
import FramedCharIcon from "../components/FramedCharIcon";

export default function Raid() {
	const {
		slash,
		pierce,
		strike,
		missile,
		magic,
		fire,
		ice,
		wind,
		earth,
		lightning,
		water,
		light,
		dark,
		poison,
		blind,
		sleep,
		silence,
		paralysis,
		confusion,
		petrify,
		toad,
		charm,
		slow,
		stop,
		immobilize,
		disable,
		berserk,
		doom
	} = {
		slash: -10,
		pierce: 15,
		strike: -10,
		missile: 30,
		magic: 5,
		fire: 10,
		wind: 10,
		earth: 10,
		lightning: 10,
		water: 10,
		light: 10,
		dark: -20,
		poison: 100,
		blind: 25,
		sleep: 50,
		silence: 100,
		paralysis: 0,
		confusion: 100,
		petrify: 100,
		toad: 100,
		charm: 100,
		slow: 25,
		stop: 100,
		immobilize: 50,
		disable: 100,
		berserk: 50,
		doom: 100
	};

	return (
		<div className="allchars mb-3 container">
			<div className="mt-5 d-flex flex-column justify-content-center align-items-center img-box">
				<img src={`../img/raid/lapscsli_01_m.png`} />
				<h1 className="icy-name text-center">White Marshmallow</h1>
			</div>
			<div className="text-center big-text mb-3">Status Ailment: Sleep</div>
			<div className="d-flex justify-content-center align-items-center flex-column">
				<div className="resistance-board text-white">
					<div className="m-2">ATK Type Res</div>

					<div className="d-flex attack-type-row">
						<AtkRes type="slash" value={slash} />

						<AtkRes type="missile" value={missile} />

						<AtkRes type="strike" value={strike} />

						<AtkRes type="pierce" value={pierce} />

						<AtkRes type="magic" value={magic} />
					</div>

					<div className="m-2">Elemental Res</div>

					<div className="d-flex attack-type-row flex-wrap">
						<ElementRes type="fire" value={fire} />
						<ElementRes type="ice" value={ice} />
						<ElementRes type="wind" value={wind} />
						<ElementRes type="earth" value={earth} />
						<ElementRes type="lightning" value={lightning} />
						<ElementRes type="water" value={water} />
						<ElementRes type="light" value={light} />
						<ElementRes type="dark" value={dark} />
					</div>
					<div className="m-2">Status Ailment Res</div>
					<div className="d-flex attack-type-row flex-wrap">
						<StatusRes type="poison" value={poison} />
						<StatusRes type="blinded" value={blind} />
						<StatusRes type="sleep" value={sleep} />
						<StatusRes type="mute" value={silence} />
						<StatusRes type="paralysis" value={paralysis} />
						<StatusRes type="confusion" value={confusion} />
						<StatusRes type="petrification" value={petrify} />
						<StatusRes type="frog" value={toad} />
						<StatusRes type="charm" value={charm} />
						<StatusRes type="slow" value={slow} />
						<StatusRes type="stop" value={stop} />
						<StatusRes type="dontmove" value={immobilize} />
						<StatusRes type="dontaction" value={disable} />
						<StatusRes type="berserk" value={berserk} />
						<StatusRes type="doom" value={doom} />
					</div>
				</div>
				<div className="recommended">
					<p className="big-text text-center m-3">Recommended Units</p>
					<div className="recommended-char d-flex justify-content-center flex-wrap">
						<FramedCharIcon name="Xiza" rarity="UR" />
						<FramedCharIcon name="Vinera" rarity="UR" />
						<FramedCharIcon name="Sterne" rarity="UR" />
						<FramedCharIcon name="Gaffgarion" rarity="MR" />
						<FramedCharIcon name="Shadowlynx" rarity="MR" />
					</div>
					<div className="guide">
						<div className="text-center big-text">TIPS</div>
						<b>
							<u>Strategy:</u>{" "}
						</b>
						Give up the first turn to move closer to the boss and block it, or buff yourself to gain AP. Ignore all the mobs (and stay far away from them). <br />
						<b>
							<u>Xiza & Vinera:</u>{" "}
						</b>
						Use Steal Time constantly. Vinera can use LB to build up chains if she is fast enough to lap the boss.
						<br />
						<b>
							<u>Sterne:</u>{" "}
						</b>
						At level 89, he can't do 2 Hard Slash in a row. So either move in and attack the boss on turn 1, or buff himself. You can normal attack if he does not have 34 AP or more, so
						you won't break the chain after the first Hard Slash due to not having any AP left.
						<br />
						<b>
							<u>Shadowlynx:</u>
						</b>{" "}
						A Dream within a Dream to chain attacks. Then Hien for damage.
						<br />
						<b>
							<u>Gaffagrion:</u>
						</b>{" "}
						Crushing Blow is a low cost, high damage skill that can chain both slash and dark. At level 99, he can do 4 Crushing Blows in a row (which may be better than Sterne in some
						cases).
					</div>
				</div>
			</div>
		</div>
	);
}
