import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function Characters() {
	const server = process.env.REACT_APP_SERVER;
	const [charList, setCharList] = useState(null);
	const [filteredList, setFilteredList] = useState([]);
	const [filterWord, setFilterWord] = useState("");
	const [filterElement, setFilterElement] = useState([]);
	const [filterRarity, setFilterRarity] = useState([]);
	const [filterMainJob, setFilterMainJob] = useState([]);
	const [filterSubJob, setFilterSubJob] = useState([]);

	const getAllChars = async () => {
		const data = await fetch(`${server}/characters`);
		const response = await data.json();
		setCharList(response.data);
		setFilteredList(response.data);
	};
	const listRarity = (rarity) => {
		return charList.map((item, key) => {
			if (item.rarity === rarity) {
				return (
					<div className="col-md-2 col-sm-4 col-6" key={key}>
						<Link to={`/characters/${item.name}`}>
							<div className="justify-content-center d-flex flex-column align-items-center char-card">
								<img className="char-icon" alt={`image of ${item.name}`} src={`img/char/${item.name}.png`} height="80px" />
								{item.stylized ? item.stylized : item.name}
							</div>
						</Link>
					</div>
				);
			}
		});
	};

	const listFilteredChars = () => {
		return filteredList.map((item, key) => {
			return (
				<div className="col-md-2 col-sm-4 col-6" key={key}>
					<Link to={`/characters/${item.name}`}>
						<div className="justify-content-center d-flex flex-column align-items-center char-card">
							<img className="char-icon" alt={`image of ${item.name}`} src={`img/char/${item.name}.png`} height="80px" />
							{item.stylized ? item.stylized : item.name}
						</div>
					</Link>
				</div>
			);
		});
	};

	const toggleElement = (item) => {
		if (filterElement.includes(item)) {
			let tempList = filterElement;
			tempList.splice(
				filterElement.findIndex((i) => i === item),
				1
			);
			setFilterElement([...tempList]);
		} else setFilterElement([...filterElement, item]);
	};

	// const toggleSubJob = (item) => {
	// 	if (filterSubJob.includes(item)) {
	// 		let tempList = filterSubJob.splice(
	// 			filterSubJob.findIndex((i) => i === item),
	// 			1
	// 		);
	// 		setFilterSubJob([...tempList]);
	// 	} else setFilterSubJob([...filterSubJob, item]);
	// };

	// const toggleRarity = (item) => {
	// 	if (filterRarity.includes(item)) {
	// 		let tempList = filterRarity.splice(filterRarity.findIndex(item), 1);
	// 		setFilterRarity([...tempList]);
	// 	} else setFilterRarity([...filterRarity, item]);
	// };

	// const toggleMainJob = (item) => {
	// 	if (filterMainJob.includes(item)) {
	// 		let tempList = filterMainJob.splice(filterMainJob.findIndex(item), 1);
	// 		setFilterMainJob([...tempList]);
	// 	} else setFilterMainJob([...filterMainJob, item]);
	// };

	const searchWord = (e) => {
		e.preventDefault();
		setFilterWord(e.target.value);
	};

	const filterEverything = () => {
		let tempList = charList;
		if (filterWord !== "") tempList = tempList.filter((char) => char.name.toLowerCase().includes(filterWord.toLowerCase()));
		// if (filterElement !== "") tempList = tempList.filter((char) => char.element === filterElement);
		// if (filterRarity !== "") tempList = tempList.filter((char) => char.rarity === filterRarity);
		// if (filterMainJob !== "") tempList = tempList.filter((char) => char.job1 === filterMainJob);
		// if (filterSubJob !== "") tempList = tempList.filter((char) => char.job2 === filterSubJob || char.job3 === filterSubJob);
		if (filterElement.length !== 0) tempList = tempList.filter((char) => filterElement.includes(char.element));
		filterRarity.forEach((item) => (tempList = tempList.filter((char) => char.rarity === item)));
		filterMainJob.forEach((item) => (tempList = tempList.filter((char) => char.job1 === item)));
		filterSubJob.forEach((item) => (tempList = tempList.filter((char) => char.job2 === item || char.job3 === item)));

		setFilteredList(tempList);
	};

	useEffect(() => {
		getAllChars();
	}, []);

	useEffect(() => {
		filterEverything();
	}, [filterWord, filterElement, filterRarity, filterMainJob, filterSubJob]);

	if (!charList || !filteredList)
		return (
			<div>
				<Loading />
			</div>
		);
	return (
		<div className="container text-center text-white allchars mb-5">
			<input
				className="m-5"
				type="text"
				placeholder="Search"
				onChange={(e) => {
					searchWord(e);
				}}
			/>
			<div className="mb-4">
				<div className={`filter-button  ${filterElement.includes("Fire") ? "active" : ""}`} onClick={() => toggleElement("Fire")}>
					Fire
				</div>
				<div className={`filter-button  ${filterElement.includes("Ice") ? "active" : ""}`} onClick={() => toggleElement("Ice")}>
					Ice
				</div>
				<div className={`filter-button  ${filterElement.includes("Wind") ? "active" : ""}`} onClick={() => toggleElement("Wind")}>
					Wind
				</div>
				<div className={`filter-button  ${filterElement.includes("Earth") ? "active" : ""}`} onClick={() => toggleElement("Earth")}>
					Earth
				</div>
				<div className={`filter-button  ${filterElement.includes("Lightning") ? "active" : ""}`} onClick={() => toggleElement("Lightning")}>
					Lightning
				</div>
				<div className={`filter-button  ${filterElement.includes("Water") ? "active" : ""}`} onClick={() => toggleElement("Water")}>
					Water
				</div>
				<div className={`filter-button  ${filterElement.includes("Light") ? "active" : ""}`} onClick={() => toggleElement("Light")}>
					Light
				</div>
				<div className={`filter-button  ${filterElement.includes("Dark") ? "active" : ""}`} onClick={() => toggleElement("Dark")}>
					Dark
				</div>
			</div>
			{filteredList.length === charList.length ? (
				<div>
					<h1 className="pretty-title">UR</h1>
					<div className="row text-white ">{listRarity("UR")}</div>
					<h1 className="pretty-title">MR</h1>
					<div className="row text-white ">{listRarity("MR")}</div>
					<h1 className="pretty-title">SR and below</h1>
					<div className="row text-white ">
						{listRarity("SR")}
						{listRarity("R")}
						{listRarity("N")}
					</div>
				</div>
			) : (
				<div>
					<div className="row text-white ">{listFilteredChars()}</div>
				</div>
			)}
		</div>
	);
}
