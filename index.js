import express from 'express';
import bodyParser from 'body-parser';
import axios from "axios";

const app = express();
const port = 3000;
const api_url = "https://v2.jokeapi.dev/joke/dark";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
});

app.get("/joke", async (req, res) => {
    try {
        const result = await axios.get(api_url);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});