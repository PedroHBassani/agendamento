import mongoose from "mongoose";

mongoose.set("strictQuery", true);
try {
  mongoose.connect(process.env.MONGO_URL);
  mongoose.connection.on(
    "error",
    console.log.bind(console, "Erro de conexão.")
  );
} catch (error) {
  console.log("Erro de conexão.");
  console.log(error);
}

export default mongoose.connection;
