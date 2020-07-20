import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Characters() {
	const server = process.env.REACT_APP_SERVER;
	const [charList, setCharList] = useState(null);
	// const [urList, setUrList] = useState(null);
	// const [mrList, setMrList] = useState(null);
	// const [lowList, setLowList] = useState(null);
	const getAllChars = async () => {
		const data = await fetch(`${server}/characters`);
		const response = await data.json();
		setCharList(response.data);
		// filterRarity(response.data);
	};
	const filterRarity = (rarity) => {
		return charList.map((item, key) => {
			if (item.rarity === rarity) {
				return (
					<div className="col-md-2 col-sm-4 col-6 " key={key}>
						<Link to={`/characters/${item.name}`}>
							<div className="justify-content-center d-flex flex-column align-items-center char-card">
								<img className="char-icon" alt={`image of ${item.name}`} src={`img/char/${item.name}.png`} height="80px" />
								{item.name}
							</div>
						</Link>
					</div>
				);
			}
		});
	};

	useEffect(() => {
		getAllChars();
	}, []);

	if (!charList) return <div>loading</div>;
	return (
		<div className="container text-center text-white p-3">
			<h1>UR</h1>
			<div className="row text-white ">{filterRarity("UR")}</div>
			<h1>MR</h1>
			<div className="row text-white ">{filterRarity("MR")}</div>
			<h1>SR and below</h1>
			<div className="row text-white ">
				{filterRarity("SR")}
				{filterRarity("R")}
				{filterRarity("N")}
			</div>
		</div>
	);
}
