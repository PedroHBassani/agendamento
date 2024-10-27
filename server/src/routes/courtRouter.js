import {
  addCourt,
  deleteCourt,
  getCourts,
  updateCourt,
} from "../controllers/court.js";
import express from "express";

const router = express.Router();

router.post("/", addCourt);
router.get("/", getCourts);
router.put("/:id", updateCourt);
router.delete("/:id", deleteCourt);

export default router;
