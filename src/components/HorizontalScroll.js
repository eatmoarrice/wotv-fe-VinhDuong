import React from "react";

export default function HorizontalScroll(props) {
	return (
		<div className="row justify-content-center align-items-center justify-content-center">
			<div className="col-lg-4 d-flex justify-content-center align-items-center">
				<img src={`../img/portrait/${props.name}.png`} className="img-fluid fade-in-1" />
			</div>
			<div className="d-md-none d-flex flex-column">
				<h1 className="pretty-name text-center">{props.name}</h1>
				<div className="divider-text">
					<img className="img-fluid" src="../img/divider.png" />
				</div>

				<div className="dfade-in-2 desc p-3 text-white">{props.desc}</div>

				<img className="img-fluid fade-in-3" src="../img/divider.png" />
			</div>
			<div className="col-lg-8 col-12 d-md-flex align-items-center justify-content-center d-none">
				<div className="scroll-top2 d-flex align-items-center justify-content-center">
					<img src="../img/scroll-left.png" />
				</div>
				<div className="page2 d-flex flex-column align-items-center">
					<h1 className="pretty-name text-center">{props.name}</h1>

					<img className="fade-in-2" src="../img/divider.png" height="20px" />

					<div className="desc py-4 fade-in-3">{props.desc}</div>

					{/* <img src="../img/divider.png" height="20px" /> */}
				</div>
				<div className="scroll-bot2 d-flex align-items-center">
					<img src="../img/scroll-right.png" />
				</div>
			</div>
		</div>
	);
}
