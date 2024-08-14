import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Cards";
import { Link } from "react-router-dom";

export default function Home() {
    const [data, setData] = useState([]);

	// Utilisation de useEffect pour effectuer la requête HTTP
    useEffect(() => {
		// fetch() est utilisé pour récupérer les données du fichier logements.json
        fetch("/logements.json")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
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

