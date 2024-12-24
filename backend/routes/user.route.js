import express from "express";
const router = express.Router();
import { register ,login ,logout ,updateProfile } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";

router.post("/register",singleUpload , register);
router.post("/login" , login);
router.get("/logout" , logout);
router.put("/update", auth ,singleUpload , updateProfile);



export default router;