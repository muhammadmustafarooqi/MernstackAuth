import express from "express";
import cors from "cors";
import dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';
import { dbConnection } from "./config/db.js";
import router from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(cors({Credentials: true}));
app.use(cookieParser());

dbConnection();
//middleware
// api Endpoints
app.use('/api', router);
// Port
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.status(200).send("API is running..., Alhamdulillah!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
