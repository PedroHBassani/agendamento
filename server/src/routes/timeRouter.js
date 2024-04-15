import express from "express";
import {
  addTime,
  deleteTime,
  getFreeTimes,
  getTimesByUser,
} from "../controllers/time.js";

const router = express.Router();

router.get("/free/:court", getFreeTimes);
router.get("/user/:user", getTimesByUser);
router.post("/", addTime);
router.delete("/:id", deleteTime);

export default router;
