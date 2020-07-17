import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./page/Login";
import Home from "./page/Home";
import Navigation from "./components/Navigation";

function App() {
	return (
		<div className="App">
			<Router>
				<Navigation />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/login" component={Login} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
