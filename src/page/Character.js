import React, { useState, useEffect } from "react";

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
			<div className="row justify-content-center align-items-center">
				<div className="col-lg-4 d-flex justify-content-center align-items-center img-box">
					<img src={`../img/portrait/${details.name}.png`} height="500px" />
				</div>
				<div className="d-md-none d-flex flex-column">
					<h1 className="pretty-name text-center">{details.name}</h1>
					<div className="divider-text">
						<img className="img-fluid" src="../img/divider.png" />
					</div>

					<div className="dfade-in-2 desc p-3 text-white">{details.desc}</div>

					<img className="img-fluid fade-in-3" src="../img/divider.png" />
				</div>
				<div className="col-lg-8 col-12 d-md-flex align-items-center justify-content-center d-none">
					<div className="scroll-top2 d-flex align-items-center justify-content-center">
						<img src="../img/scroll-left.png" />
					</div>
					<div className="page2 d-flex flex-column align-items-center">
						<h1 className="pretty-name text-center">{details.name}</h1>

						<img className="fade-in-2" src="../img/divider.png" height="20px" />

						<div className="desc py-4 fade-in-3">{details.desc}</div>

						{/* <img src="../img/divider.png" height="20px" /> */}
					</div>
					<div className="scroll-bot2 d-flex align-items-center">
						<img src="../img/scroll-right.png" />
					</div>
				</div>
			</div>
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
			<div className="stat-box">
				<img className="stat-pic" src="../img/UI/stat.png" />
				<p className="hp">{details.stats.HP}</p>
				<p className="atk">{details.stats.ATK}</p>
				<p className="tp">{details.stats.TP}</p>
				<p className="mag">{details.stats.MAG}</p>
				<p className="ap">{details.stats.AP}</p>
				<p className="agi">{details.stats.AGI}</p>
				<p className="move">{details.stats.MOVE}</p>
				<p className="jump">{details.stats.JUMP}</p>
				<p className="dex">{details.stats.DEX}</p>
				<p className="luck">{details.stats.LUCK}</p>
			</div>
		</div>
	);
}
