import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express()

dotenv.config();

const PORT = process.env.PORT;




//middleware
app.use(cors({
  origin:"http://localhost:5173",
}))
app.use(express.json());
app.use(rateLimiter)



app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();
})

app.use("/api/notes",notesRoutes)

connectDB().then(()=>{
app.listen(PORT,()=>{
  console.log("Server is running on port 5001")
}) 
})

//mongodb+srv://kaushikrjpm10_db_user:ya7kHB5HvuS0FAST@cluster0.f4pqcbu.mongodb.net/?appName=Cluster0