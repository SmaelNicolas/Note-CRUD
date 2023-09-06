import { PrismaClient } from "@prisma/client";
import { routerNotes } from "./controllers/notes";
const express = require("express");
const cors = require("cors");
const prisma = new PrismaClient();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

async function main() {
	app.use("/api/notes", routerNotes);
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT} ...`);
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
