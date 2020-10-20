import React, { useState, useEffect } from "react";
import "./Login.css";
import { useHistory, Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";

export default function Login() {
	const responseFacebook = (response) => {
		loginWithFacebook(response.accessToken);
	};

	const history = useHistory();
	const submitLogin = async (e) => {
		e.preventDefault();
		let url = `${process.env.REACT_APP_SERVER}/login`;
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

	const loginWithFacebook = async (token) => {
		let url = `${process.env.REACT_APP_SERVER}/login/facebook`;
		let body = { access_token: token };
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
	};

	const loginWithGoogle = async (token) => {
		let url = `${process.env.REACT_APP_SERVER}/login/google`;
		let body = { access_token: token };
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
	};

	const responseGoogle = (response) => {
		console.log("google: ", response);
		loginWithGoogle(response.accessToken);
	};
	return (
		<div className="ignore-nav full-page">
			<h2 className="sign-up-slogan">Login to your account</h2>
			<form className="sign-up-card" method="POST" onSubmit={(e) => submitLogin(e)}>
				<label for="username" minLength="4">
					Username:
				</label>
				<input type="text" name="username" />
				<label for="email">Email: </label>
				<input type="email" name="email" />
				<label for="username">Password: </label>
				<input type="password" name="password" minLength="5" />
				<button className="login-button" type="submit">
					Login
				</button>

				<div>
					Don't have an account? Go{" "}
					<Link to="/register">
						<u>here</u>
					</Link>
					.
				</div>
			</form>
			<div className="login-buttons">
				<FacebookLogin
					appId={process.env.REACT_APP_FB_ID}
					autoLoad={false}
					fields="name,email,picture"
					callback={responseFacebook}
					render={(renderProps) => (
						<button className="login-button login-button--facebook" onClick={renderProps.onClick}>
							FACEBOOK
						</button>
					)}
				/>
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_ID}
					buttonText="Login"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={"single_host_origin"}
					render={(renderProps) => (
						<button className="login-button login-button--google" onClick={renderProps.onClick} disabled={renderProps.disabled}>
							GOOGLE
						</button>
					)}
				/>
			</div>
		</div>
	);
}
