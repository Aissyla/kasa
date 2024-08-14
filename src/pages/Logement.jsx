import { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import Carrousel from "../components/Carrousel";
import Collapse from "../components/Collapse";
import Host from "../components/Host";
import Rate from "../components/Rate";
import Tag from "../components/Tag";

export default function Logement() {
    const [pickedAppart, setPickedAppart] = useState(null); // État pour stocker les données du logement sélectionné
    const params = useParams(); // Extraction des paramètres de l'URL, notamment l'ID du logement
    const navigate = useNavigate(); // Hook pour rediriger l'utilisateur vers une autre page

    useEffect(() => {
        fetch("/logements.json")
            .then((response) => response.json())
            .then((data) => {
				// Recherche du logement correspondant à l'ID dans les données récupérées
                const foundAppart = data.find((appart) => appart.id === params.id);
                if (foundAppart) {
                    setPickedAppart(foundAppart);
                } else {
					// Redirection vers la page 404 si le logement n'est pas trouvé
                    navigate("/404", { state: { message: "Logement non trouvé" } });
                }
            })
            .catch((error) => {
				// Affichage d'un message d'erreur en cas d'échec de la récupération des données
                console.error('Error fetching data:', error);
                navigate("/404", { state: { message: "Erreur lors de la récupération des données" } });
            });
    }, [params.id, navigate]); // Le hook est déclenché à chaque fois que l'ID dans l'URL change

    if (!pickedAppart) {
        return null; // Retourne null si les données ne sont pas encore chargées
    }

	// Extraction des données spécifiques du logement
    const slidePics = pickedAppart.pictures;
    const tags = pickedAppart.tags;
    const equipments = pickedAppart.equipments;

	// Transformation des données de l'équipement en liste HTML
    const equip = equipments.map((item, index) => (
        <li key={index} className="equipList">
            {item}
        </li>
    ));

    return (
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
                        <Host hostName={pickedAppart.host.name} hostPic={pickedAppart.host.picture} />
                    </div>
                    <div className="rate-container">
                        <Rate score={pickedAppart.rating} />
                    </div>
                </div>
            </section>
            <div className="collapse-logement">
                <Collapse aboutTitle="Description" aboutText={pickedAppart.description} />
                <Collapse aboutTitle="Équipements" aboutText={equip} />
            </div>
        </div>
    );
}
