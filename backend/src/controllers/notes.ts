const express = require("express");
import {
	createNote,
	deleteNoteById,
	getAllActiveNotes,
	getAllArchivedNotes,
	getAllNotes,
	getAllNotesWithCategory,
	getNoteById,
} from "../dao/notes";
import { updateNoteById } from "../services/notes";

export const routerNotes = express.Router();
routerNotes.use(express.json());

routerNotes.get("/", async (req: any, res: any) => {
	try {
		const allNotes = await getAllNotes();
		res.status(200).json(allNotes);
	} catch (err) {
		res.status(500).json("Error gettings notes");
	}
});

routerNotes.get("/:id", async (req: any, res: any) => {
	const { id } = req.params;
	try {
		const note = await getNoteById(id);
		note
			? res.status(200).json(note)
			: res.status(404).json(`Not found note with id: ${id}`);
	} catch (err) {
		res.json(`Error getting note with id: ${id}`);
	}
});

routerNotes.get("/status/active", async (req: any, res: any) => {
	try {
		const allNotes = await getAllActiveNotes();
		res.status(200).json(allNotes);
	} catch (err) {
		res.status(500).json("Error gettings notes with active status");
	}
});

routerNotes.get("/status/archived", async (req: any, res: any) => {
	try {
		const allNotes = await getAllArchivedNotes();
		res.status(200).json(allNotes);
	} catch (err) {
		res.status(500).json("Error gettings notes with archived status");
	}
});

routerNotes.get("/tag/:id", async (req: any, res: any) => {
	const { id } = req.params;
	try {
		const notesByCategory = await getAllNotesWithCategory(id);
		res.status(200).json(notesByCategory);
	} catch (err) {
		res.status(500).json(`Error getting note with tags : ${id}`);
	}
});

routerNotes.put("/:id", async (req: any, res: any) => {
	const { id } = req.params;
	const { title, content, active, categories } = req.body;
	try {
		const updatedNote = await updateNoteById(
			id,
			title,
			content,
			active,
			categories
		);
		res.status(200).json(updatedNote);
	} catch (err) {
		res.status(500).json(`Error updating note with id : ${id}`);
	}
});

routerNotes.post("/", async (req: any, res: any) => {
	const { title, content, active, categories } = req.body;
	try {
		const newNote = await createNote(title, content, active, categories);
		res.status(200).json(newNote);
	} catch (err) {
		res.status(500).json("Error creating note in db");
	}
});

routerNotes.delete("/:id", async (req: any, res: any) => {
	const { id } = req.params;
	try {
		const deletedNote = await deleteNoteById(id);
		res.status(200).json(deletedNote);
	} catch (err) {
		res.status(500).json("Error deleting note in db");
	}
});
