import React, { useState, useEffect, useRef } from "react";
import StatTable from "../components/StatTable";
import HorizontalScroll from "../components/HorizontalScroll";
import AbilityBoard from "../components/AbilityBoard";
const scrollToRef = (ref) => window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });

export default function Character(props) {
	const server = process.env.REACT_APP_SERVER;
	const shortName = props.match.params.name;
	const [details, setDetails] = useState(null);
	const [skillDetails, setSkillDetails] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const showSkillDetails = async (skillname) => {
		const data = await fetch(`${server}/skill/${skillname}`);
		const response = await data.json();
		if (response.data != null) {
			setSkillDetails(response.data);
			return true;
		} else return false;
	};
	const getDetails = async () => {
		const data = await fetch(`${server}/characters/${shortName}`);
		const response = await data.json();
		setDetails(response.data);
		console.log(response.data);
	};

	const myRef = useRef(null);
	const scrollHere = () => scrollToRef(myRef);

	useEffect(() => {
		getDetails();
	}, []);

	if (!details) return <div>Loading</div>;
	return (
		<div className="container p-3 char-page text-white">
			<HorizontalScroll desc={details.desc} name={details.name} />
			{/* <div className="d-md-flex d-none justify-content-center my-5">
				<img src="../img/divider2.png" className="img-fluid divider2" />
			</div> */}

			<h2 className="text-center icy-name royal-font border-bottom pb-4 mb-4 mt-5 pt-5">Character Info</h2>
			<div className="d-flex justify-content-around flex-wrap">
				<div className="stat-group d-inline-flex flex-column align-items-center p-2">
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

					<div className="d-flex justify-content-around m-2 w-100">
						<div>
							Rarity: <img src={`../img/rarity/RarityIcon_${details.rarity}.png`} width="35px" />
						</div>
						-
						<div>
							Element: <img src={`../img/UI/element_icon_${details.element.toLowerCase()}.png`} width="25px" />
						</div>
					</div>

					<StatTable stats={details.stats} />
				</div>
				<div className="star-rating text-center mt-3">
					<h5>Rating:</h5>
					<div>
						<span className="fa fa-star checked"></span>
						<span className="fa fa-star checked"></span>
						<span className="fa fa-star checked"></span>
						<span className="fa fa-star checked"></span>
						<span className="fa fa-star"></span> 4.2/5
						<br />
						from 27 ratings
					</div>
					<div className="summary">
						<div className="summary-title"> Summary:</div>
					</div>
					<p>Nm nemo omnios futga nescuiunt. Oster nomin cast.</p>
				</div>
			</div>

			<h2 className="text-center icy-name royal-font border-bottom pb-4 mb-4">Ability Board</h2>
			<AbilityBoard board={details.board} name={details.name} rarity={details.rarity} showSkillDetails={showSkillDetails} scrollHere={scrollHere} />

			{skillDetails ? (
				<div className="w-100 d-flex justify-content-center mb-4" ref={myRef}>
					<div className="skill-details d-inline-flex flex-column align-items-center">
						<div className="big-text text-center">{skillDetails.name}</div>
						<div className="big-text text-center">{skillDetails.jp}</div>
						<img className="m-2" src="../img/divider.png" width="150px" />
						<div className="d-flex justify-content-center">
							<div className="d-flex flex-column align-items-center">
								<img src={`../img/skills/${skillDetails.name.replace(/\s/g, "").toLowerCase()}.jpg`} width="120px" />
							</div>
							<div>
								<div className="white-text pl-5 pr-2">{skillDetails.desc}</div>
								<div className="d-flex justify-content-end w-100 pr-2 mt-3">
									{skillDetails.AP ? <div>AP: {skillDetails.AP}</div> : <div>TP: {skillDetails.TP}</div>}
									<div className="ml-3">Uses: {skillDetails.uses}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
}
