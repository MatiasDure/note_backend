const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Note = require("../models/Note");
const helper = require("./test_helper");

beforeEach(async () => {
	await Note.deleteMany({});
	await Note.insertMany(helper.initialNotes);

}, 10000);

describe("when there are initially some notes saved", () => {
	test("notes are returned as json", async() => {
		await api
			.get("/api/notes")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("all notes are returned", async () => {
		const res = await api.get("/api/notes");

		expect(res.body).toHaveLength(helper.initialNotes.length);
	});

	test("a specific note is within the returned notes", async () => {
		const res = await api.get("/api/notes");

		const contents = res.body.map(r => r.content);
		expect(contents).toContain("Browser can execute only JavaScript");
	});
});

describe("Viewing a specific note", () => {
	test("succeeds with a valid id", async () => {
		const notesAtStart = await helper.notesInDb();

		const noteToView = notesAtStart[0];

		const resultNote = await api
			.get(`/api/notes/${noteToView.id}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(resultNote.body).toEqual(noteToView);
	});

	test("fails with status 404 if note does not exist", async () => {
		const nonExistingId = await helper.nonExistingId();

		await api
			.get(`/api/notes/${nonExistingId}`)
			.expect(404);
	});

	test("fails with status 400 if id is invalid", async () => {
		const invalidId = "sdasdasdasd";

		await api
			.get(`/api/notes/${invalidId}`)
			.expect(400);
	});
});

describe("Addition of a new note", () => {
	test("succeeds with valid data", async () => {
		const newNote = {
			content: "async/await simplifies making async calls",
			important: true,
		};

		await api
			.post("/api/notes")
			.send(newNote)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const notesAtEnd = await helper.notesInDb();
		expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

		const contents = notesAtEnd.map(note => note.content);
		expect(contents).toContain("async/await simplifies making async calls");
	});

	test("fails with status 400 if data is invalid", async () => {
		const newNote = {
			important: true
		};

		await api
			.post("/api/notes")
			.send(newNote)
			.expect(400);

		// const response = await api.get("/api/notes");
		const notesAtEnd = await helper.notesInDb();

		expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
	}, 10000);
});

describe("deletion of a note", () => {
	test("a note can be deleted", async () => {
		const notesAtStart = await helper.notesInDb();

		const noteToDelete = notesAtStart[0];

		await api
			.delete(`/api/notes/${noteToDelete.id}`)
			.expect(204);

		const notesAtEnd = await helper.notesInDb();

		expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

		const contents = notesAtEnd.map( (note) => note.content );

		expect(contents).not.toContain(noteToDelete.content);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});