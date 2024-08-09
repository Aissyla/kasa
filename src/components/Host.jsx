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
