import PropTypes from 'prop-types';

export default function Host(props) {
	return (
		<aside className="host-aside">
			<div className="host-name">{props.hostName}</div>
			<div className="host-picture">
				<img src={props.hostPic} alt={props.id} />
			</div>
		</aside>
	);
}

Host.propTypes = {
	hostName: PropTypes.string.isRequired,
	hostPic: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
};
