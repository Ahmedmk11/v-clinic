import express from "express";

import {
  fillCartWithPrescription,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/prescription/:prescription_id", fillCartWithPrescription);

export default router;