import express from "express";
import { getZoomToken,createMeeting } from "../controllers/videoChatController.js";
const router = express.Router();

router.get('/createMeeting',getZoomToken,createMeeting)

export default router