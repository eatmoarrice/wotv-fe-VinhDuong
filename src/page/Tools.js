import React from "react";
import { Link } from "react-router-dom";

export default function Tools() {
	return (
		<div className="tools d-flex flex-column justify-content-center align-items-center text-center">
			<div className="m-3">
				<Link to="/tools/matplanner">
					<div className="tool-card">
						<img alt="" className="img-fluid" src="img/tools/bg2.png" />
						<img alt="" className="tool-icon" src="img/tools/SquiresMemoryRed.png" />
						<div className="textOver pl-5">Job Material Planner</div>
					</div>
				</Link>
			</div>
			<div className="m-3">
				<a href="https://wotv-tools.github.io/" target="_blank">
					<div className="tool-card">
						<img alt="" className="img-fluid" src="img/tools/bg2.png" />
						<img alt="" className="tool-icon" src="img/tools/lapswpn_swo_008.png" />
						<div className="textOver pl-5">Equipment Calculator</div>
					</div>
				</a>
			</div>
			<div className="m-3">
				<a href="https://wotvfarmcalculator.github.io/" target="_blank">
					<div className="tool-card">
						<img alt="" className="img-fluid" src="img/tools/bg2.png" />
						<img alt="" className="tool-icon" src="img/tools/DLC_chocobo_04.png" />
						<div className="textOver pl-5">Farm Calculator</div>
					</div>
				</a>
			</div>
			<div className="m-3">
				<a href="https://wotv-calc.com/" target="_blank">
					<div className="tool-card">
						<img alt="" className="img-fluid" src="img/tools/bg2.png" /> <img alt="" className="tool-icon" src="img/tools/it_af_reset.png" />
						<div className="textOver pl-5">WOTV Builder</div>
					</div>
				</a>
			</div>
		</div>
	);
}
