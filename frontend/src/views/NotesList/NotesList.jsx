import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Note } from "../../components/Note/Note";
import { useFetch } from "../../hooks/useFetch";

import { Loading } from "../../components/Loading/Loading";
import { Message } from "../../components/Message/Message";
import { Select } from "../../components/Select/Select";
import "./notesList.css";

export const NotesList = () => {
	const { pathname } = useLocation();
	const [notesByCategory, setNotesByCategories] = useState([]);

	const { data, error, loading, fetchData } = useFetch();
	const {
		data: dataDelete,
		error: errorDelete,
		loading: loadingDelete,
		fetchData: fetchDelete,
	} = useFetch();

	const {
		data: dataUpdate,
		error: errorUpdate,
		loading: loadingUpdate,
		fetchData: fetchUpdate,
	} = useFetch();

	useEffect(() => {
		pathname === "/"
			? fetchData("http://localhost:3001/api/notes/status/active")
			: fetchData("http://localhost:3001/api/notes/status/archived");
	}, [pathname, dataDelete, dataUpdate]);

	const handleDeleteNote = (id) => {
		fetchDelete(`http://localhost:3001/api/notes/${id}`, "DELETE");
	};

	const handleUpdateNote = (id, body) => {
		fetchUpdate(`http://localhost:3001/api/notes/${id}`, "PUT", body);
	};

	const handleSelect = (e) => {
		e.target.value === "all"
			? setNotesByCategories(data)
			: setNotesByCategories(
					data.filter((note) =>
						note.categories.includes(e.target.value)
					)
			  );
	};

	if (data?.length === 0) return <Message msg="You have no notes yet 📝" />;

	if (loading) return <Loading />;

	if (error) return <Message msg="Error , please try again" />;

	return (
		<div className="activeNotes--container">
			<Select handleSelect={handleSelect} notes={data} />
			{notesByCategory.length > 0
				? notesByCategory?.map((note) => (
						<Note
							key={note.id}
							{...note}
							handleDeleteNote={handleDeleteNote}
							handleUpdateNote={handleUpdateNote}
						/>
				  ))
				: data?.map((note) => (
						<Note
							key={note.id}
							{...note}
							handleDeleteNote={handleDeleteNote}
							handleUpdateNote={handleUpdateNote}
						/>
				  ))}
		</div>
	);
};
