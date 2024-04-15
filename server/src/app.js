import db from "./config/dbConnect.js";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import path from "path";

db.on("error", console.log.bind(console, "Erro de conexão."));
db.once("open", () => {
  console.log("Conexão com banco de dados feita com sucesso.");
});

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.static(path.join(process.cwd(), "public")));
routes(app);

export default app;
