import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllNotes = async () => {
	const allNotes = await prisma.notes.findMany();
	return allNotes;
};

export const getNoteById = async (id: string) => {
	const note = await prisma.notes.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	return note;
};

export const createNote = async (
	title: string,
	content: string,
	active: boolean,
	categories: string[]
) => {
	const newNote = await prisma.notes.create({
		data: {
			title,
			content,
			active,
			categories,
		},
	});
	return newNote;
};

export const deleteNoteById = async (id: string) => {
	const deletedNote = await prisma.notes.delete({
		where: {
			id: parseInt(id),
		},
	});
	return deletedNote;
};

export const getAllActiveNotes = async () => {
	const allNotes = await prisma.notes.findMany({
		where: {
			active: true,
		},
	});
	return allNotes;
};

export const getAllArchivedNotes = async () => {
	const allNotes = await prisma.notes.findMany({
		where: {
			active: false,
		},
	});
	return allNotes;
};

export const getAllNotesWithCategory = async (category: string) => {
	const allNotes = await prisma.notes.findMany({
		where: {
			categories: {
				has: category,
			},
		},
	});
	return allNotes;
};
