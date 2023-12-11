import express from "express";
import { generateRoomLink } from "../controllers/videoChatController.js";
const router = express.Router();

router.get('/create-meeting',generateRoomLink)

export default router