import dotenv from 'dotenv';
import express from "express";
import cors from "cors";

import router from "./routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`App is listening on http://localhost:${listener.address().port}`);
    console.log(`DATABASE_URL is ${process.env.DATABASE_URL}`);
});