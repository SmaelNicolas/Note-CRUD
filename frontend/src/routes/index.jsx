import { Route, Routes } from "react-router-dom";
import { CreateNotes, NotesList } from "../views";

export const MyRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<NotesList />} />
			<Route path="/archived" element={<NotesList />} />
			<Route path="/create" element={<CreateNotes />} />
			<Route path="/edit/:id" element={<CreateNotes />} />
		</Routes>
	);
};
