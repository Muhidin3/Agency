import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import path,{dirname} from 'path'
import { connectDB } from './config/db.js'
import fileUpload from 'express-fileupload'


import APIs from './routes/APIs.js'



dotenv.config()

const app = express()

app.use(express.json());      // allow to pass json to body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename);


app.use('/api',APIs)

const __dirname = path.resolve();

if (process.env.NODE_ENV ==='production') {
    app.use(express.static(path.join(__dirname,'..','front-end','dist')))
    
    app.get('*',(req,res)=>{
        const page = path.resolve(__dirname,'front-end','dist','index.html')
        res.sendFile(page)
    })
}

let Port = 3000
app.listen(process.env.Port || Port,()=>{
    try {
        connectDB() 
    } catch (error) {
        console.log(error.message)
    }
    console.log(`web is running on port ${Port}`)
})