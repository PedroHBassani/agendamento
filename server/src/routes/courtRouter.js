import { addCourt, getCourts } from "../controllers/court.js";
import express from "express";

const router = express.Router();

router.post("/", addCourt);
router.get("/", getCourts);

export default router;
