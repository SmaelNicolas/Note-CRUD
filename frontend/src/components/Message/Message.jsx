import "./message.css";

export const Message = ({ msg }) => {
	return (
		<div className="message--container">
			<div className="message">{msg}</div>
		</div>
	);
};
