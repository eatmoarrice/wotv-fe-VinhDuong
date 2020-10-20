import React from "react";
import "./SignUp.css";
import { useHistory } from "react-router-dom";

export default function SignUp() {
	const history = useHistory();
	const submitReg = async (e) => {
		e.preventDefault();
		let url = `${process.env.REACT_APP_SERVER}/register`;
		let body = { username: e.target.username.value, email: e.target.email.value, password: e.target.password.value };
		let res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
		console.log(body);
		if (res.status === 200) {
			history.push("/characters");
		}
	};
	return (
		<div className="ignore-nav full-page">
			<h2 className="sign-up-slogan">Register a new account!</h2>
			<form className="sign-up-card" method="POST" onSubmit={(e) => submitReg(e)}>
				<label for="username" minLength="4">
					Username:
				</label>
				<input type="text" name="username" />
				<label for="email">Email: </label>
				<input type="email" name="email" />
				<label for="username">Password: </label>
				<input type="password" name="password" minLength="5" />
				<button className="sign-up-button" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}
