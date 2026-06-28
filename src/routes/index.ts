import express, { Router } from "express";
import auth from "./auth";

const routes: Router = express.Router();

routes.use("/auth", auth);

export default routes;