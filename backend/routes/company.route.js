import express from "express";
const router = express.Router();
import { registerCompany ,getCompany,getCompanyById,updateCompany} from "../controllers/company.controller.js";
import {singleUpload} from "../middleware/multer.js";

import auth from "../middleware/auth.js"
router.post("/register", auth , registerCompany);
router.put("/update/:id", auth , singleUpload ,updateCompany);
router.get("/get", auth , getCompany);
router.get("/get/:id", auth , getCompanyById);





export default router;