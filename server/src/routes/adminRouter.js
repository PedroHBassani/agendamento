import express from "express";
import { getUserAndTimes } from "../controllers/admin.js";

const router = express.Router();

router.get("/", getUserAndTimes);

export default router;
