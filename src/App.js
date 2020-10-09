import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./page/Login";
import Home from "./page/Home";
import Navigation from "./components/Navigation";
import Characters from "./page/Characters";
import Character from "./page/Character";
import Raid from "./page/Raid";
import Tools from "./page/Tools";
import Footer from "./components/Footer";
import Miscellaneous from "./page/Miscellaneous/Miscellaneous";
import MatPlanner from "./page/MatPlanner";
import FourOhFour from "./page/FourOhFour";
import RaidEditor from "./page/RaidEditor/RaidEditor";
import CharEditor from "./page/CharEditor/CharEditor";

function App() {
	return (
		<div className="App">
			<Navigation />
			<div className="wrapper">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/login" component={Login} />
					<Route exact path="/characters" component={Characters} />
					<Route exact path="/characters/:name" component={Character} />
					<Route exact path="/raid" component={Raid} />
					<Route exact path="/tools" component={Tools} />
					<Route exact path="/miscellaneous" component={Miscellaneous} />
					<Route exact path="/raid/editor" component={RaidEditor} />
					<Route exact path="/characters/:name/editor" component={CharEditor} />
					{/* <Route exact path="/tools/matplanner" component={MatPlanner} /> */}
					<Route component={FourOhFour} />
				</Switch>
				<Footer />
			</div>
		</div>
	);
}

export default App;
