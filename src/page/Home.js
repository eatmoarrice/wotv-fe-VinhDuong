import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
	function useWindowSize() {
		const isClient = typeof window === "object";

		function getSize() {
			return {
				width: isClient ? window.innerWidth : undefined,
				height: isClient ? window.innerHeight : undefined
			};
		}

		const [windowSize, setWindowSize] = useState(getSize);

		useEffect(() => {
			if (!isClient) {
				return false;
			}

			function handleResize() {
				setWindowSize(getSize());
			}

			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, []); // Empty array ensures that effect is only run on mount and unmount

		return windowSize;
	}

	const size = useWindowSize();
	const [url, seturl] = useState("");
	const checkURL = () => {
		if (size.width > 720 && url === "") {
			seturl("https://www.youtube.com/embed/bgut5bvKGBg?controls=0&showinfo=0&rel=0&autoplay=1&mute=1&loop=1");
		}
		if (size.width <= 720 && url !== "") {
			seturl("");
		}
	};
	useEffect(() => {
		checkURL();
	}, [size.width]);
	return (
		<div>
			<Link to="/characters">
				<div className="iframeblock"></div>
			</Link>

			<div className="video-background d-none d-md-block">
				<div className="video-foreground">
					<iframe src={url} frameborder="0" allowfullscreen></iframe>
				</div>
			</div>
			<Link to="/characters">
				<div className="home d-md-none d-block"></div>
			</Link>
		</div>
	);
}
