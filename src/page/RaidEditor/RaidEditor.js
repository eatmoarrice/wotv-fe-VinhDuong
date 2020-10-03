import React, { useState, useEffect } from 'react';
import './RaidEditor.css';
import { Container, Alert } from 'react-bootstrap';

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
export default function RaidEditor() {
	const server = process.env.REACT_APP_SERVER;
	const [bosses, setBosses] = useState(null);
	const [boss, setBoss] = useState(null);
	const [option, setOption] = useState(null);
	const [alertMessage, setAlertMessage] = useState('');
	const [show, setShow] = useState(false);

	const submitSet = async (e) => {
		e.preventDefault();
		console.log(boss);
		console.log('submit new');
		const newBoss = await fetch(`${server}/boss/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(boss),
		});

		if (newBoss.status == 200) {
			setShow(true);
			setAlertMessage('You have successfully created a new boss!');
		}
	};

	const saveSet = async (e) => {
		e.preventDefault();
		console.log(boss);
		console.log('save');
		const edit = await fetch(`${server}/boss/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(boss),
		});
		console.log(edit);
		if (edit.status == 200) {
			setShow(true);
			setAlertMessage('You have saved your changes!');
		}
	};

	const getBosses = async () => {
		let url = `${server}/boss`;
		let response = await fetch(url);
		let data = await response.json();
		setBosses(data.data);
		setOption('existing');
		console.log(data);
	};

	const getSingleBoss = async (name) => {
		let url = `${server}/boss/${name}`;
		let response = await fetch(url);
		let data = await response.json();
		setBoss(data.data);
		setShow(false);
		setOption('oneboss');
		setBoss(data.data);
		console.log(data);
	};

	const makeNewBoss = () => {
		setShow(false);
		setOption('new');
		setBoss({
			name: '',
			element: '',
			description: '',
			key: '',
			res: {
				slash: '',
				pierce: '',
				strike: '',
				missile: '',
				magic: '',
				fire: '',
				wind: '',
				earth: '',
				lightning: '',
				water: '',
				light: '',
				dark: '',
				poison: '',
				blind: '',
				sleep: '',
				silence: '',
				paralyze: '',
				confusion: '',
				petrify: '',
				toad: '',
				charm: '',
				slow: '',
				stop: '',
				immobilize: '',
				disable: '',
				berserk: '',
				doom: '',
			},
		});
	};
	return (
		<div className="editor-page">
			{alertMessage ? (
				<div className="alert-bottom">
					<Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
						{alertMessage}
					</Alert>
				</div>
			) : (
				''
			)}
			<Container>
				<div className="editor-buttons">
					<button className="create-button" onClick={() => makeNewBoss()}>
						Create New
					</button>
					<button className="edit-button" onClick={() => getBosses()}>
						Edit Existing
					</button>
				</div>
				<div className="bosses">
					{bosses &&
						option === 'existing' &&
						bosses.map((boss) => (
							<button className="boss-name" onClick={() => getSingleBoss(boss.name)}>
								{boss.name}
							</button>
						))}
				</div>
				{!option ? <NoneContent /> : ''}
				{boss && (option == 'oneboss' || option == 'new') && (
					<form
						className="raid-form"
						onSubmit={(e) => {
							option === 'oneboss' ? saveSet(e) : submitSet(e);
						}}
					>
						<div>
							Name: <input name="name" required type="text" value={boss.name} onChange={(e) => setBoss({ ...boss, name: e.target.value })} />
						</div>
						<div>
							Element:{' '}
							<select name="element" required value={boss.element} onChange={(e) => setBoss({ ...boss, element: e.target.value })}>
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
						<div className="description-div">
							Description:{' '}
							<textarea className="description-box" name="description" type="string" value={boss.description} onChange={(e) => setBoss({ ...boss, description: e.target.value })} />
						</div>
						<div>
							Secret Key: <input name="name" required type="text" value={boss.key} onChange={(e) => setBoss({ ...boss, key: e.target.value })} />
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
									value={boss.res.slash}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, slash: e.target.value } })}
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
									value={boss.res.missile}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, missile: e.target.value } })}
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
									value={boss.res.strike}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, strike: e.target.value } })}
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
									value={boss.res.pierce}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, pierce: e.target.value } })}
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
									value={boss.res.magic}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, magic: e.target.value } })}
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
									value={boss.res.fire}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, fire: e.target.value } })}
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
									value={boss.res.ice}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, ice: e.target.value } })}
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
									value={boss.res.wind}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, wind: e.target.value } })}
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
									value={boss.res.earth}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, earth: e.target.value } })}
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
									value={boss.res.lightning}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, lightning: e.target.value } })}
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
									value={boss.res.water}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, water: e.target.value } })}
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
									value={boss.res.light}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, light: e.target.value } })}
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
									value={boss.res.dark}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, dark: e.target.value } })}
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
									value={boss.res.poison}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, poison: e.target.value } })}
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
									value={boss.res.blind}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, blind: e.target.value } })}
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
									value={boss.res.sleep}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, sleep: e.target.value } })}
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
									value={boss.res.silence}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, silence: e.target.value } })}
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
									value={boss.res.paralyze}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, paralyze: e.target.value } })}
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
									value={boss.res.confusion}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, confusion: e.target.value } })}
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
									value={boss.res.petrify}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, petrify: e.target.value } })}
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
									value={boss.res.toad}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, toad: e.target.value } })}
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
									value={boss.res.charm}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, charm: e.target.value } })}
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
									value={boss.res.slow}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, slow: e.target.value } })}
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
									value={boss.res.stop}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, stop: e.target.value } })}
								/>
							</div>
							<div>
								<div style={{ fontSize: '13px' }}>
									<img src="/img/UI/statusconditionicon_dontmove.png" width="25px" /> Immobilize:
								</div>
								<input
									className="atk-type"
									name="immobilize"
									type="number"
									min={-999}
									max={999}
									value={boss.res.immobilize}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, immobilize: e.target.value } })}
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
									value={boss.res.disable}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, disable: e.target.value } })}
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
									value={boss.res.berserk}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, berserk: e.target.value } })}
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
									value={boss.res.doom}
									onChange={(e) => setBoss({ ...boss, res: { ...boss.res, doom: e.target.value } })}
								/>
							</div>
						</div>
						<button className="submit-button" type="submit">
							{option === 'oneboss' ? 'Save Edits' : 'Add New'}
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
