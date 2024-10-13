import * as dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./app.js"

dotenv.config()

if (!process.env.DB_URI){
    throw new Error("DB_URI must be set")
}

if (!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET must be set")
}

mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Connected to the database")
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log("\nServer is running on port " + port)
})


