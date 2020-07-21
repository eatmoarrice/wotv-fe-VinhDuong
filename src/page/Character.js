import React, { useState, useEffect } from "react";
import StatTable from "../components/StatTable";
import HorizontalScroll from "../components/HorizontalScroll";
import AbilityBoard from "../components/AbilityBoard";

export default function Character(props) {
	const server = process.env.REACT_APP_SERVER;
	const shortName = props.match.params.name;
	const [details, setDetails] = useState(null);
	const getDetails = async () => {
		const data = await fetch(`${server}/characters/${shortName}`);
		const response = await data.json();
		setDetails(response.data);
		console.log(response.data);
	};
	useEffect(() => {
		getDetails();
	}, []);

	if (!details) return <div>Loading</div>;
	return (
		<div className="container p-3 text-white">
			<HorizontalScroll desc={details.desc} name={details.name} />
			<div className="d-md-flex d-none justify-content-center my-5">
				<img src="../img/divider2.png" className="img-fluid divider2" />
			</div>
			<div>
				<div className="job-icon d-inline-flex flex-column align-items-center">
					<img src={`../img/job/main/${details.job1.replace(/\s/g, "")}.png`} width="50px" />
					{details.job1}
				</div>
				<div className="job-icon d-inline-flex flex-column align-items-center">
					<img src={`../img/job/sub/${details.job2.replace(/\s/g, "")}.png`} width="50px" />
					{details.job2}
				</div>
				<div className="job-icon d-inline-flex flex-column align-items-center">
					<img src={`../img/job/sub/${details.job3.replace(/\s/g, "")}.png`} width="50px" />
					{details.job3}
				</div>
			</div>
			<h3>
				Element: <img src={`../img/UI/element_icon_${details.element.toLowerCase()}.png`} />
			</h3>

			<StatTable stats={details.stats} />
			<h2 className="text-center icy-name royal-font border-bottom pb-4 mb-4">Ability Board</h2>
			<AbilityBoard board={details.board} name={details.name} rarity={details.rarity} />
		</div>
	);
}
