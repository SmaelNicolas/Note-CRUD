import { useRef } from "react";
import { Link } from "react-router-dom";

import "./note.css";
export const Note = ({
	id,
	title,
	content,
	categories,
	active,
	created,
	handleDeleteNote,
	handleUpdateNote,
}) => {
	const dialogRef = useRef(null);

	const handleDelete = () => {
		dialogRef.current.showModal();
	};

	const handleDeleteConfirm = () => {
		handleDeleteNote(id);
	};

	const handleCancel = () => {
		dialogRef.current.close();
	};

	const handleUpdate = () => {
		let note = {
			id,
			title,
			content,
			categories,
			active: !active,
			created,
		};
		console.log(note);
		handleUpdateNote(id, note);
	};

	const getDate = (date) => {
		const newDate = new Date(date);
		return newDate.toLocaleDateString();
	};

	return (
		<>
			<div className="note--container">
				<div className="note--actions">
					<Link to={`/edit/${id}`}>
						<button className="note--button">Edit</button>
					</Link>
					<button className="note--button" onClick={handleUpdate}>
						{active ? "Archive" : "Active"}
					</button>
					<button className="note--button" onClick={handleDelete}>
						Delete
					</button>
				</div>
				<div className="note--info">
					<h3 className="note--title">{title}</h3>
					<p className="note--content">{content}</p>
					<div className="note--chip--container">
						{categories.map((cat) => (
							<div className="note--chip" key={cat}>
								{cat}
							</div>
						))}
					</div>
					<p className="note--date">Created: {getDate(created)}</p>
				</div>
			</div>
			<dialog
				ref={dialogRef}
				onClose={handleCancel}
				className="confirm--modal">
				<div className="confirm--container">
					<div className="confirm--title">Are you sure?</div>
					<div className="confirm--button--container">
						<button
							className="confirm--button"
							onClick={handleCancel}>
							No, cancel.
						</button>
						<button
							className="confirm--button"
							onClick={handleDeleteConfirm}>
							Yes, delete.
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
};
