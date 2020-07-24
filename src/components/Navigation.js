import React, { useState } from "react";

import { Navbar, NavDropdown, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navigation() {
	const [expanded, setExpanded] = useState(false);
	return (
		<div className="topnav">
			<Navbar expand="md" expanded={expanded} className="dirt navbar-dark">
				<Link to="/" onClick={() => setExpanded(false)}>
					<img className="logo" src="../img/mog.png" height="70px" />
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<div className="home-section">
							<Link to="/characters" className="no-underscore" onClick={() => setExpanded(false)}>
								<span className="fancy-text">Characters</span>
							</Link>
						</div>
						<div className="home-section">
							<Link to="/raid" className="no-underscore" onClick={() => setExpanded(false)}>
								<span className="fancy-text">Raid</span>
							</Link>
						</div>
						<div className="home-section">
							<Link to="/tools" className="no-underscore" onClick={() => setExpanded(false)}>
								<span className="fancy-text">Tools</span>
							</Link>
						</div>
						<div className="home-section">
							<Link to="/miscellaneous" className="no-underscore" onClick={() => setExpanded(false)}>
								<span className="fancy-text">Miscellaneous</span>
							</Link>
						</div>
						{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
