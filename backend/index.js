import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";
import path from "path";


connectDB();

const app = express();
dotenv.config({});
const _dirname = path.resolve();

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
   origin : "https://job-portal-7q1a.onrender.com",
   credentials : true, 
}
app.use(cors(corsOptions));



app.use("/api/v1/user" , userRouter);
app.use("/api/v2/company" , companyRouter);
app.use("/api/v3/job" , jobRouter);
app.use("/api/v4/application" , applicationRouter);



const port = process.env.PORT || 3000;


app.use(express.static(path.join(_dirname , "/frontend/dist")));
app.get("*" , (_,res)=>{
    res.sendFile(path.resolve(_dirname , "frontend" , "dist" , "index.html"))
});

app.listen(port , ()=>{
    console.log(`the server is running on port ${port}`);
})