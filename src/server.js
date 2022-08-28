const express = require("express");

const app = express();

const PORT = 3333;

app.use(express.json())
app.use(routes)

app.listen(PORT, () => `server is running on port ${PORT}`);