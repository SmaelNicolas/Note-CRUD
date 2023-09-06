import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlinePlusSquare } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./CreateNotes.css";
export const CreateNotes = () => {
	const { data, loading, fetchData } = useFetch();
	const { data: dataById, fetchData: fetchById } = useFetch();
	const [errors, setErrors] = useState({
		title: "",
		content: "",
		category: "",
	});

	const { id } = useParams();

	const [note, setNote] = useState({
		title: "",
		content: "",
		categories: [],
		active: true,
		created: "",
	});
	const [addedCategory, setAddCategory] = useState("");
	const [addedCategories, setAddedCategories] = useState([]);

	const navigate = useNavigate();
	const dialogRef = useRef(null);

	useEffect(() => {
		dialogRef.current.showModal();
		id && fetchById(`http://localhost:3001/api/notes/${id}`);
	}, [id]);

	useEffect(() => {
		if (dataById) {
			setNote(dataById);
			setAddedCategories(dataById.categories);
		}
	}, [dataById]);

	const handleClose = () => {
		dialogRef.current.close();
		navigate("/");
	};

	const updateNoteField = (fieldName, newValue) => {
		setNote({
			...note,
			[fieldName]: newValue,
		});
		newValue !== ""
			? setErrors({ ...errors, [fieldName]: "" })
			: setErrors({ ...errors, [fieldName]: `Empty ${fieldName}` });
	};

	const handleOnBlur = (fieldName, newValue) => {
		newValue !== ""
			? setErrors({ ...errors, [fieldName]: "" })
			: setErrors({ ...errors, [fieldName]: `Empty ${fieldName}` });
	};

	const handleAddCategory = (value) => {
		setAddCategory(value);
	};

	const handleAddCategories = () => {
		if (addedCategory !== "") {
			setAddedCategories([...addedCategories, addedCategory]);
			setAddCategory("");
			setErrors({ ...errors, category: "" });
		} else {
			setErrors({ ...errors, category: "Empty category" });
		}
	};

	const handleDeleteCategory = (value) => {
		setAddedCategories(
			addedCategories.filter((category) => category !== value)
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (note.title === "" || note.content === "") return;
		note.created = new Date();
		note.categories = addedCategories;
		id
			? fetchData(`http://localhost:3001/api/notes/${id}`, "PUT", note)
			: fetchData("http://localhost:3001/api/notes", "POST", note);
		setNote({
			title: "",
			content: "",
			categories: [],
			active: true,
			created: "",
		});
	};

	useEffect(() => {
		!loading && data && handleClose();
	}, [loading, data]);

	return (
		<dialog ref={dialogRef} className="dialog" onClose={handleClose}>
			<div className="dialog--form--container">
				<form onSubmit={handleSubmit} className="dialog--form">
					<AiOutlineClose
						className="dialog--form--close"
						onClick={handleClose}
					/>
					<label className="dialog--form--label">
						Title
						<input
							className="dialog--form--title"
							type="text"
							name="title"
							placeholder="Title"
							value={note.title}
							onChange={(e) =>
								updateNoteField(e.target.name, e.target.value)
							}
							onBlur={(e) =>
								handleOnBlur(e.target.name, e.target.value)
							}
						/>
						<p className="dialog--error">{errors.title}</p>
					</label>
					<label className="dialog--form--label">
						Content
						<textarea
							className="dialog--form--textarea"
							cols="30"
							rows="10"
							name="content"
							value={note.content}
							onChange={(e) =>
								updateNoteField(e.target.name, e.target.value)
							}
							onBlur={(e) =>
								handleOnBlur(e.target.name, e.target.value)
							}
							placeholder="Content"
						/>
						<p className="dialog--error">{errors.content}</p>
					</label>

					<label className="dialog--form--label">
						Add category
						<div className="dialog--form--categories--container">
							<div className="dialog--form--category--container">
								<input
									className="dialog--form--category"
									type="text"
									placeholder="New category"
									value={addedCategory}
									onChange={(e) =>
										handleAddCategory(e.target.value)
									}
								/>
								<AiOutlinePlusSquare
									className="dialog--form--category--add"
									onClick={handleAddCategories}
								/>
							</div>
							<p className="dialog--error">{errors.category}</p>
							<div className="dialog--form--categories">
								{addedCategories?.map((cat) => (
									<div
										className="dialog--form--categories--chip"
										key={cat}
										onClick={() =>
											handleDeleteCategory(cat)
										}>
										<MdDelete />
										{cat}
									</div>
								))}
							</div>
						</div>
					</label>

					<button className="dialog--form--button" type="submit">
						{id ? "Edit Note" : "Create Note"}
					</button>
				</form>
			</div>
		</dialog>
	);
};
