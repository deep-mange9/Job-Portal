import express from "express";
const router = express.Router();
import {postJob , getJobs ,getJobById ,getAdminJob} from "../controllers/job.controller.js";
import auth from "../middleware/auth.js";


router.post("/post", auth , postJob);
router.get("/get" , getJobs);
router.get("/get/:id" , getJobById);
router.get("/getadminjobs" , auth , getAdminJob);







export default router;