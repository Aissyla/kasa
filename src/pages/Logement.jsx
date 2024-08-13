// Ce bloc importe les hooks useState et useEffect pour gérer l'état et les effets secondaires dans le composant. 
// useParams et useNavigate sont utilisés pour accéder aux paramètres d'URL et pour naviguer entre les pages. 
// Carrousel, Collapse, Host, Rate, et Tag sont importés pour être utilisés dans le rendu. 
// axios pour faire des requêtes HTTP.
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Carrousel from "../components/Carrousel";
import Collapse from "../components/Collapse";
import Host from "../components/Host";
import Rate from "../components/Rate";
import Tag from "../components/Tag";
import axios from "axios";

// Ce bloc définit le composant FicheLogement. useParams extrait l'ID du logement à partir de l'URL. 
// useNavigate permet de rediriger l'utilisateur. useState initialise l'état pickedAppart, qui stockera les données du logement sélectionné.
export default function FicheLogement() {
	const params = useParams();
	const navigate = useNavigate();
	const [pickedAppart, setPickedAppart] = useState();

	// Ici, un effet secondaire est déclenché au chargement du composant. La fonction getData utilise axios pour récupérer les données des logements depuis un fichier JSON. 
	// Ensuite, elle recherche le logement correspondant à l'ID dans les paramètres d'URL (params.id). 
	// Si le logement est trouvé, l'état pickedAppart est mis à jour. Si aucun logement n'est trouvé, l'utilisateur est redirigé vers une page 404.
	useEffect(() => {
		const getData = async () => {
			const res = await axios.get("/logements.json");
			const picked = res.data.find(({ id }) => id === params.id);
			res.data.map(() => setPickedAppart(picked));
			if (picked === undefined) {
				navigate("/404", { state: { message: "Can't get data" } });
			}
		};
		getData();
		// eslint-disable-next-line
	}, []);

	// Ce bloc extrait les données spécifiques du logement pour les images (slidePics), les tags (tags), 
	// et les équipements (equipments). Il crée aussi une liste d'éléments <li> pour afficher chaque équipement si pickedAppart est défini.
	const slidePics = pickedAppart && pickedAppart.pictures;
	const tags = pickedAppart && pickedAppart.tags;
	const equipments = pickedAppart && pickedAppart.equipments;
	const equip =
		pickedAppart &&
		equipments.map((item, index) => (
			<li key={index} className="equipList">
				{item}
			</li>
		));


	return (
		pickedAppart && (
			<div key={params.id} className="fiche-container">
				<Carrousel slides={slidePics} />
				<section className="hostInfo-container">
					<div className="title-tags-container">
						<div className="title-container redFont">
							<h1>{pickedAppart.title}</h1>
							<h3>{pickedAppart.location}</h3>
						</div>
						<div className="tags-container">
							{tags.map((tag) => (
								<Tag key={tag} tag={tag} />
							))}
						</div>
					</div>
					<div className="rate-host-container">
						<div className="host-container redFont">
							<Host
								hostName={pickedAppart.host.name}
								hostPic={pickedAppart.host.picture}
							/>
						</div>
						<div className="rate-container">
							<Rate score={pickedAppart.rating} />
						</div>
					</div>
				</section>
				<div className="collapse-logement">
					<Collapse
						aboutTitle="Description"
						aboutText={pickedAppart.description}
					/>
					<Collapse aboutTitle="Équipements" aboutText={equip} />
				</div>
			</div>
		)
	);
}