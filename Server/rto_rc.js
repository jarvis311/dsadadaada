import express from "express"
const app = express()
import  env from "dotenv"
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"
import cors from "cors"
import "./connecttion/confing.js"
import router from "./router/index.js"

import path from 'path'

const prot = process.env.PORT || 1616
app.use('/', express.static('public'))
env.config()
app.use(fileUpload())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('../Frontend/build'))
app.get("*", (req, res) => {
res.sendFile(path.resolve('../Frontend/build', 'index.html'))
})

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE"],
    })
);

app.use("/api" , router)


app.listen(prot, () => {
    console.log(`server Running on ${prot}`);
})