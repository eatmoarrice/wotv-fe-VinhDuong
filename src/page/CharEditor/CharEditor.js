import React, { useState, useEffect } from "react";
import "../RaidEditor/RaidEditor.css";
import "./CharEditor.css";
import { Container, Alert } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";

const NoneContent = () => {
	return (
		<div className="editor-noncontent">
			<h2>Choose an option, almighty editor!</h2>
			<div className="editor-filler-image">
				<img className="img-fluid" src="/img/raid/whitechoc.png" alt="fat and cute chocobo" />
			</div>
		</div>
	);
};
export default function CharEditor() {
	const server = process.env.REACT_APP_SERVER;
	const initialState = {
		name: "",
		element: "",
		desc: "",
		key: "",
		job1: "",
		job2: "",
		job3: "",
		res: {
			slash: "",
			pierce: "",
			strike: "",
			missile: "",
			magic: "",
			fire: "",
			ice: "",
			wind: "",
			earth: "",
			lightning: "",
			water: "",
			light: "",
			dark: "",
			poison: "",
			blind: "",
			sleep: "",
			silence: "",
			paralyze: "",
			confusion: "",
			petrify: "",
			toad: "",
			charm: "",
			slow: "",
			stop: "",
			immobilize: "",
			disable: "",
			berserk: "",
			doom: ""
		}
	};
	let history = useHistory();
	const [chars, setAllChars] = useState(null);
	const [charID, setCharID] = useState("");
	const [char, setChar] = useState(initialState);
	const [option, setOption] = useState(null);
	const [alertMessage, setAlertMessage] = useState("");
	const [show, setShow] = useState(false);
	const { name } = useParams();
	const submitSet = async (e) => {
		e.preventDefault();
		console.log(char);
		console.log("submit new");
		const newChar = await fetch(`${server}/characters/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(char)
		});

		if (newChar.status == 200) {
			setShow(true);
			setAlertMessage("You have successfully created a new character!");
		}
	};

	const saveSet = async (e) => {
		e.preventDefault();
		console.log(char);
		console.log("save");
		const edit = await fetch(`${server}/characters/${charID}/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(char)
		});
		console.log(edit);
		if (edit.status == 200) {
			setShow(true);
			setAlertMessage("You have saved your changes!");
		}
	};

	const getAllChars = async () => {
		let url = `${server}/characters`;
		let response = await fetch(url);
		let data = await response.json();
		setAllChars(data.data);
		setOption("existing");
		console.log(data);
	};

	const getSingleChar = async () => {
		console.log(name);
		let id = chars.find((item) => item.name === name)._id;
		setCharID(id);
		let url = `${server}/characters/${id}`;
		console.log(name);
		let response = await fetch(url);
		let data = await response.json();
		if (!data.data.res) {
			setChar({ ...data.data, res: initialState.res });
		} else setChar(data.data);
		setShow(false);
		setOption("onechar");
		console.log("one char", data);
	};

	const makeNewChar = () => {
		setShow(false);
		setOption("new");
		setChar(initialState);
	};
	const changeURL = (name) => {
		history.push(`/characters/${name}/editor`);
	};
	useEffect(() => {
		getAllChars();
	}, []);
	useEffect(() => {
		if (chars) getSingleChar();
	}, [chars, name]);
	return (
		<div className="editor-page">
			{alertMessage ? (
				<div className="alert-bottom">
					<Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
						{alertMessage}
					</Alert>
				</div>
			) : (
				""
			)}
			<Container>
				<form
					className="raid-form"
					onSubmit={(e) => {
						saveSet(e);
					}}
				>
					<div>
						Name:{" "}
						<select name="name" required value={char.name} onChange={(e) => changeURL(e.target.value)}>
							<option value="null">---</option>
							{chars && chars.map((item) => <option value={item.name}>{item.name}</option>)}
						</select>
					</div>
					<div>
						<div>Avatar:</div> <img src={`/img/char/${char.name}.png`} width={100} />
					</div>

					<div>
						Element:{" "}
						<select name="element" required value={char.element.toLowerCase()} onChange={(e) => setChar({ ...char, element: e.target.value })}>
							<option value="null">---</option>
							<option value="fire">fire</option>
							<option value="ice">ice</option>
							<option value="wind">wind</option>
							<option value="earth">earth</option>
							<option value="lightning">lightning</option>
							<option value="water">water</option>
							<option value="light">light</option>
							<option value="dark">dark</option>
							<option value="none">none</option>
						</select>
					</div>
					<div>
						Rarity:{" "}
						<select name="rarity" required value={char.rarity} onChange={(e) => setChar({ ...char, rarity: e.target.value })}>
							<option value="null">---</option>
							<option value="UR">UR</option>
							<option value="MR">MR</option>
							<option value="SR">SR</option>
							<option value="R">R</option>
							<option value="N">N</option>
						</select>
					</div>
					<div className="description-div">Jobs:</div>
					<div className="jobs">
						<div className="job-icon">
							<img src={`/img/job/main/${char.job1.replace(/\s/g, "")}.png`} height={50} />
							<div>{char.job1}</div>
						</div>
						<div className="job-icon">
							<img src={`/img/job/sub/${char.job2.replace(/\s/g, "")}.png`} height={50} />
							<div>{char.job2}</div>
						</div>
						<div className="job-icon">
							<img src={`/img/job/sub/${char.job3.replace(/\s/g, "")}.png`} height={50} />
							<div>{char.job3}</div>
						</div>
					</div>
					<div className="description-div">
						Description: <textarea className="description-box" name="description" type="string" value={char.desc} onChange={(e) => setChar({ ...char, desc: e.target.value })} />
					</div>
					<div>
						Secret Key: <input name="name" required type="text" value={char.key} onChange={(e) => setChar({ ...char, key: e.target.value })} />
					</div>
					<u>ATK Type Resistance:</u>
					<div className="res">
						<div>
							<div>
								<img src="/img/UI/statusattackicon_none_slash.png" width="25px" /> Slash:
							</div>
							<input
								className="atk-type"
								name="slash"
								type="number"
								min={-999}
								max={999}
								value={char.res.slash}
								onChange={(e) => setChar({ ...char, res: { ...char.res, slash: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusattackicon_none_shot.png" width="25px" /> Missile:
							</div>
							<input
								className="atk-type"
								name="missile"
								type="number"
								min={-999}
								max={999}
								value={char.res.missile}
								onChange={(e) => setChar({ ...char, res: { ...char.res, missile: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusattackicon_none_blow.png" width="25px" /> Strike:
							</div>
							<input
								className="atk-type"
								name="strike"
								type="number"
								min={-999}
								max={999}
								value={char.res.strike}
								onChange={(e) => setChar({ ...char, res: { ...char.res, strike: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusattackicon_none_pierce.png" width="25px" /> Pierce:
							</div>
							<input
								className="atk-type"
								name="pierce"
								type="number"
								min={-999}
								max={999}
								value={char.res.pierce}
								onChange={(e) => setChar({ ...char, res: { ...char.res, pierce: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusattackicon_none_magic.png" width="25px" /> Magic:
							</div>
							<input
								className="atk-type"
								name="magic"
								type="number"
								min={-999}
								max={999}
								value={char.res.magic}
								onChange={(e) => setChar({ ...char, res: { ...char.res, magic: e.target.value } })}
							/>
						</div>
					</div>
					<u>Elemental Resistance:</u>
					<div className="res">
						<div>
							<div>
								<img src="/img/UI/element_icon_fire.png" width="25px" /> Fire:
							</div>
							<input
								className="atk-type"
								name="fire"
								type="number"
								min={-999}
								max={999}
								value={char.res.fire}
								onChange={(e) => setChar({ ...char, res: { ...char.res, fire: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/element_icon_ice.png" width="25px" /> Ice:
							</div>
							<input
								className="atk-type"
								name="ice"
								type="number"
								min={-999}
								max={999}
								value={char.res.ice}
								onChange={(e) => setChar({ ...char, res: { ...char.res, ice: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/element_icon_wind.png" width="25px" /> Wind:
							</div>
							<input
								className="atk-type"
								name="wind"
								type="number"
								min={-999}
								max={999}
								value={char.res.wind}
								onChange={(e) => setChar({ ...char, res: { ...char.res, wind: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/element_icon_earth.png" width="25px" /> Earth:
							</div>
							<input
								className="atk-type"
								name="fire"
								type="number"
								min={-999}
								max={999}
								value={char.res.earth}
								onChange={(e) => setChar({ ...char, res: { ...char.res, earth: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/element_icon_lightning.png" width="25px" /> Lightning:
							</div>
							<input
								className="atk-type"
								name="fire"
								type="number"
								min={-999}
								max={999}
								value={char.res.lightning}
								onChange={(e) => setChar({ ...char, res: { ...char.res, lightning: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/element_icon_water.png" width="25px" /> Water:
							</div>
							<input
								className="atk-type"
								name="fire"
								type="number"
								min={-999}
								max={999}
								value={char.res.water}
								onChange={(e) => setChar({ ...char, res: { ...char.res, water: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/element_icon_shine.png" width="25px" /> Light:
							</div>
							<input
								className="atk-type"
								name="fire"
								type="number"
								min={-999}
								max={999}
								value={char.res.light}
								onChange={(e) => setChar({ ...char, res: { ...char.res, light: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/element_icon_dark.png" width="25px" /> Dark:
							</div>
							<input
								className="atk-type"
								name="fire"
								type="number"
								min={-999}
								max={999}
								value={char.res.dark}
								onChange={(e) => setChar({ ...char, res: { ...char.res, dark: e.target.value } })}
							/>
						</div>
					</div>
					<u>Debuff Resistance:</u>
					<div className="res">
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_poison.png" width="25px" /> Poison:
							</div>
							<input
								className="atk-type"
								name="poison"
								type="number"
								min={-999}
								max={999}
								value={char.res.poison}
								onChange={(e) => setChar({ ...char, res: { ...char.res, poison: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_blinded.png" width="25px" /> Blind:
							</div>
							<input
								className="atk-type"
								name="blind"
								type="number"
								min={-999}
								max={999}
								value={char.res.blind}
								onChange={(e) => setChar({ ...char, res: { ...char.res, blind: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_sleep.png" width="25px" /> Sleep:
							</div>
							<input
								className="atk-type"
								name="sleep"
								type="number"
								min={-999}
								max={999}
								value={char.res.sleep}
								onChange={(e) => setChar({ ...char, res: { ...char.res, sleep: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_mute.png" width="25px" /> Silence:
							</div>
							<input
								className="atk-type"
								name="silence"
								type="number"
								min={-999}
								max={999}
								value={char.res.silence}
								onChange={(e) => setChar({ ...char, res: { ...char.res, silence: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_paralysis.png" width="25px" /> Paralyze:
							</div>
							<input
								className="atk-type"
								name="paralyze"
								type="number"
								min={-999}
								max={999}
								value={char.res.paralyze}
								onChange={(e) => setChar({ ...char, res: { ...char.res, paralyze: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_confusion.png" width="25px" /> Confusion:
							</div>
							<input
								className="atk-type"
								name="confusion"
								type="number"
								min={-999}
								max={999}
								value={char.res.confusion}
								onChange={(e) => setChar({ ...char, res: { ...char.res, confusion: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_petrification.png" width="25px" /> Petrify:
							</div>
							<input
								className="atk-type"
								name="petrify"
								type="number"
								min={-999}
								max={999}
								value={char.res.petrify}
								onChange={(e) => setChar({ ...char, res: { ...char.res, petrify: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_frog.png" width="25px" /> Toad:
							</div>
							<input
								className="atk-type"
								name="toad"
								type="number"
								min={-999}
								max={999}
								value={char.res.toad}
								onChange={(e) => setChar({ ...char, res: { ...char.res, toad: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_charm.png" width="25px" /> Charm:
							</div>
							<input
								className="atk-type"
								name="charm"
								type="number"
								min={-999}
								max={999}
								value={char.res.charm}
								onChange={(e) => setChar({ ...char, res: { ...char.res, charm: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_slow.png" width="25px" /> Slow:
							</div>
							<input
								className="atk-type"
								name="slow"
								type="number"
								min={-999}
								max={999}
								value={char.res.slow}
								onChange={(e) => setChar({ ...char, res: { ...char.res, slow: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_stop.png" width="25px" /> Stop:
							</div>
							<input
								className="atk-type"
								name="stop"
								type="number"
								min={-999}
								max={999}
								value={char.res.stop}
								onChange={(e) => setChar({ ...char, res: { ...char.res, stop: e.target.value } })}
							/>
						</div>
						<div>
							<div style={{ fontSize: "13px" }}>
								<img src="/img/UI/statusconditionicon_dontmove.png" width="25px" /> Immobilize:
							</div>
							<input
								className="atk-type"
								name="immobilize"
								type="number"
								min={-999}
								max={999}
								value={char.res.immobilize}
								onChange={(e) => setChar({ ...char, res: { ...char.res, immobilize: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_dontaction.png" width="25px" /> Disable:
							</div>
							<input
								className="atk-type"
								name="disable"
								type="number"
								min={-999}
								max={999}
								value={char.res.disable}
								onChange={(e) => setChar({ ...char, res: { ...char.res, disable: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_berserk.png" width="25px" /> Berserk:
							</div>
							<input
								className="atk-type"
								name="berserk"
								type="number"
								min={-999}
								max={999}
								value={char.res.berserk}
								onChange={(e) => setChar({ ...char, res: { ...char.res, berserk: e.target.value } })}
							/>
						</div>
						<div>
							<div>
								<img src="/img/UI/statusconditionicon_doom.png" width="25px" /> Doom:
							</div>
							<input
								className="atk-type"
								name="doom"
								type="number"
								min={-999}
								max={999}
								value={char.res.doom}
								onChange={(e) => setChar({ ...char, res: { ...char.res, doom: e.target.value } })}
							/>
						</div>
					</div>
					<button className="submit-button" type="submit">
						{option === "onechar" ? "Save Edits" : "Add New"}
					</button>
				</form>
				)}
			</Container>
		</div>
	);
}

// <form className="raid-form" onSubmit={(e) => submitSet(e)}>
// <div>
//     Name: <input name="name" type="string" />
// </div>
// <div>
//     Element:{' '}
//     <select name="element">
//         <option value="null">---</option>
//         <option value="fire">fire</option>
//         <option value="ice">ice</option>
//         <option value="wind">wind</option>
//         <option value="earth">earth</option>
//         <option value="lightning">lightning</option>
//         <option value="water">water</option>
//         <option value="light">light</option>
//         <option value="dark">dark</option>
//         <option value="none">none</option>
//     </select>
// </div>
// <div className="description-div">
//     Description: <textarea className="description-box" name="description" type="string" />
// </div>
// <u>ATK Type Resistance:</u>
// <div className="res">
//     <div>
//         <div>
//             <img src="/img/UI/statusattackicon_none_slash.png" width="25px" /> Slash:
//         </div>
//         <input className="atk-type" name="slash" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusattackicon_none_shot.png" width="25px" /> Missile:
//         </div>
//         <input className="atk-type" name="missile" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusattackicon_none_blow.png" width="25px" /> Strike:
//         </div>
//         <input className="atk-type" name="strike" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusattackicon_none_pierce.png" width="25px" /> Pierce:
//         </div>
//         <input className="atk-type" name="pierce" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusattackicon_none_magic.png" width="25px" /> Magic:
//         </div>
//         <input className="atk-type" name="magic" type="number" min={-100} max={100} />
//     </div>
// </div>
// <u>Elemental Resistance:</u>
// <div className="res">
//     <div>
//         <div>
//             <img src="/img/UI/element_icon_fire.png" width="25px" /> Fire:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/element_icon_ice.png" width="25px" /> Ice:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/element_icon_wind.png" width="25px" /> Wind:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/element_icon_earth.png" width="25px" /> Earth:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/element_icon_lightning.png" width="25px" /> Lightning:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/element_icon_water.png" width="25px" /> Water:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/element_icon_shine.png" width="25px" /> Light:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/element_icon_dark.png" width="25px" /> Dark:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
// </div>
// <u>Debuff Resistance:</u>
// <div className="res">
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_poison.png" width="25px" /> Poison:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_blinded.png" width="25px" /> Blind:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_sleep.png" width="25px" /> Sleep:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_mute.png" width="25px" /> Silence:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_paralysis.png" width="25px" /> Paralyze:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_confusion.png" width="25px" /> Confusion:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_petrification.png" width="25px" /> Petrify:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_frog.png" width="25px" /> Toad:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_charm.png" width="25px" /> Charm:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_slow.png" width="25px" /> Slow:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_stop.png" width="25px" /> Stop:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div style={{ fontSize: '13px' }}>
//             <img src="/img/UI/statusconditionicon_dontmove.png" width="25px" /> Immobilize:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_dontaction.png" width="25px" /> Disable:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_berserk.png" width="25px" /> Berserk:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
//     <div>
//         <div>
//             <img src="/img/UI/statusconditionicon_doom.png" width="25px" /> Doom:
//         </div>
//         <input className="atk-type" name="fire" type="number" min={-100} max={100} />
//     </div>
// </div>
// <button className="submit-button" type="submit">
//     Submit
// </button>
// </form>
