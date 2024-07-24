import logo from "../assets/images/LOGO.svg";
import Nav from "./Nav";

export default function Header() {
	return (
		<header>
			<img src={logo} alt="logo de l'agence kasa" />
			<Nav className="nav-header" />
		</header>
	);
}
