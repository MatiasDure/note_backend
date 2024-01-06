const express = require("express");
const cors = require("cors");
const app = express();

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
];
app.use(cors());
app.use(express.static("dist"));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
});
app.get("/hello", (req, res) => {
    res.send("<h1>Hello World!</h1>")
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    notes = notes.filter((note) => note.id.toString() !== id);

    res.status(204).end();
});

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id.toString() === id);
    
    if (note) {
        res.json(note);
        return;
    }

    res.status(404).end();
});

const generateId = () => {
    const maxId = notes.length > 0 
    ? Math.max(...notes.map((note) => note.id))
    : 0;

    return maxId + 1;
};

app.post("/api/notes", (req, res) => {
    const body = req.body;
    
    if(!body.content) {
        return res.status(400).json({
            error: "content missing"
        });
    }

    const note = {
        content: body.content,
        important: Boolean(body.important),
        id: generateId()
    };

    notes = notes.concat(note);

    res.json(note);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});