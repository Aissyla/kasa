import logo from "../assets/images/LOGO.svg";
import Nav from "./Nav";

export default function Header() {
	return (
		<header className="header">
			<figure>
				<img className="logo" src={logo} alt="logo de l'agence kasa" />
			</figure>
			<Nav className="nav-header" />
		</header>
	);
}
