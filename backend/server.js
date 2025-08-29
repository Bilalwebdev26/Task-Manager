import app from "./src/app.js";
import { connectDB } from "./src/config/connect.db.js";
const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on PORT : ${PORT}`);
  });
})
