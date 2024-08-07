import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Cards";
import { Link } from "react-router-dom";
import axios from "axios"; // Importation de la bibliothèque axios pour les requêtes HTTP

export default function Home() {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("/logements.json") // Requête GET pour récupérer les données du fichier logements.json
			.then((res) => setData(res.data));  // Mise à jour de l'état data avec les données récupérées
	}, []);

	return (
		<>
			<Banner />
			<div className="cards-container">
				{/* Boucle sur les données pour créer une carte pour chaque logement */}
				{data.map((appart, id) => (
					<div className="card_logement" key={id}>
						<Link className="link_card_logement" to={`/logement/${appart.id}`}>
							<Card cover={appart.cover} title={appart.title} />
						</Link>
					</div>
				))}
			</div>
		</>
	);
}
