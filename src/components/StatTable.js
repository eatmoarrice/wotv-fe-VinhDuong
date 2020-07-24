import React from "react";

export default function StatTable(props) {
	return (
		<div className="stat-box">
			<img className="stat-pic" src="../img/UI/stat.png" />
			<p className="hp">{props.stats.HP}</p>
			<p className="atk">{props.stats.ATK}</p>
			<p className="tp">{props.stats.TP}</p>
			<p className="mag">{props.stats.MAG}</p>
			<p className="ap">{props.stats.AP}</p>
			<p className="agi">{props.stats.AGI}</p>
			<p className="move">{props.stats.MOVE}</p>
			<p className="jump">{props.stats.JUMP}</p>
			<p className="dex">{props.stats.DEX}</p>
			<p className="luck">{props.stats.LUCK}</p>
			{/* <div className="star">
				<img src="../img/UI/cmn_icon_star.png" />
				<img src="../img/UI/cmn_icon_star.png" />
				<img src="../img/UI/cmn_icon_star.png" />
				<img src="../img/UI/cmn_icon_star.png" />
				<img src="../img/UI/cmn_icon_star.png" />
				<img src="../img/UI/cmn_icon_star.png" />
			</div> */}
		</div>
	);
}
