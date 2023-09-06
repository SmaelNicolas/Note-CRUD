import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateNoteById = async (
	id: string,
	title: string,
	content: string,
	active: boolean,
	categories: string[]
) => {
	const updatedNote = await prisma.notes.update({
		where: {
			id: parseInt(id),
		},
		data: {
			title,
			content,
			active,
			categories,
		},
	});
	return updatedNote;
};
