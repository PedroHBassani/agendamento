import "dotenv/config.js";
import app from "./src/app.js";

const port = process.env.PORT || 3002;

const ip = process.env.IP || "localhost";

app.listen(port, ip, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
