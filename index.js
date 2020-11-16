require("dotenv").config()
const express = require("express");
const cors = require("cors")
const { dbConnection } = require("./db/config");
const app = express();
dbConnection()

// cors
app.use(cors())

// directrorio publico
app.use(express.static("public"))

// para parsear el body solo con express
app.use(express.json())

// rutas
app.use("/api", require("./routes"))

const port = process.env.PORT;
app.listen(port, () => console.log(`Server on port ${port}`));
