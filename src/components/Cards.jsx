import PropTypes from 'prop-types';

export default function Card({ cover, title }) { // récupère les infos depuis Home
	return (
		<article className="card-logement">
			<img src={cover} alt="location" />
			<div className="card-logement__layer"></div>
			<p className="card-logement__title">{title}</p>
		</article>
	);
}

// cover et title doivent être des chaînes de caractères et est obligatoire
Card.propTypes = {
    cover: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
};