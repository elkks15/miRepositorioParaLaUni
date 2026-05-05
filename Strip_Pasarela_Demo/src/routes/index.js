import "dotenv/config";
import express from "express";
import cors from "cors";
import {PORT} from "./config.js";
import path from "path";
import router from "../routes/paymentroutes.js";

const app=express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static(path.resolve("src/public")));

app.listen(PORT);
console.log("Server en el puerto " + PORT);

