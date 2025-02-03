const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

const routes = require("./routes");
app.use("/api", routes);

const PORT = process.env.PORT || 5001;

mongoose.connect("mongodb://admin:admin@localhost:27019")
  .then(() => {
    console.log("🔥 MongoDB conectado");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
  })
  .catch((error) => console.error("❌ Erro ao conectar ao MongoDB:", error));
