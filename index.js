const express = require("express");
const app = express();
const port = 3000;

app.push("/", (req, res) => res.send("Hello World!").status(200));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
