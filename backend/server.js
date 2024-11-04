import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import path,{dirname} from 'path'
import { connectDB } from './config/db.js'
import Worker from './models/workers.model.js'
import Arab from './models/arabs.model.js'
import { fileURLToPath } from 'url'

import { S3Client,PutObjectCommand } from '@aws-sdk/client-s3'
import multer from 'multer'



dotenv.config()
connectDB()

const app = express()

app.use(express.json())      // allow to pass json to body
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname,'../front-end/dist')))








const storage = multer.memoryStorage()
const upload = multer({storage:storage})

const BucketName ='my-first-aws-muhidin'
const BucketRegion ='eu-north-1'
const AccessKey = 'AKIAWQUOZ3THYGFEOBAX'
const SecretAccessKey = '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'

const s3 = new S3Client({
    credentials:{
        accessKeyId:AccessKey,
        secretAccessKey:SecretAccessKey,
    },
     region:BucketRegion
})

const client = new S3Client({region:BucketRegion})

app.get('/try',async(req,res)=>{
    res.send('sum')
});


app.post('/try',upload.single('file'),async (req,res)=>{
    console.log("started")
    const params = {
        Bucket:BucketName,
        Key:req.file.originalname,
        Body:req.file.buffer,
        ContentType: req.file.mimetype
    }
    const command = new PutObjectCommand(params)

    await s3.send(command)
    
    console.log('ended')
    res.send({message:'sent'})

});






















app.get('/api/arabs', async (req,res)=>{
    const data = await Arab.find()
    res.send(data)
});

app.post('/api/arabs',async (req,res)=>{

    const newArab = new Arab(req.body)

    await newArab.save()
    res.send('saved \n'+await Arab.find())  
});


app.get('/api/workers', async (req,res) => {
    // const datta = await Worker.find()
    // const aaaa = await datta.sort()
    
    res.send(await Worker.find().sort({createdAt:-1}))  
});
app.post('/api/workers',async (req,res) => {
    const worker = req.body 
    const newWorker = new Worker(worker)
    await newWorker.save()
    res.send('saved succsfully \n'+ await Worker.find())
});



app.patch('/api/workers/:id',async (req,res) => {
    const worker = req.body 
    const updatedWorker = await Worker.findByIdAndUpdate(req.params.id,worker,{new:true})
    console.log(worker)
    res.send('updated succsfully')
    // res.send('updated succsfully \n'+ await Worker.findById(req.params.id))
})
app.get('/api/workers/:id', async (req,res) => {
    const data = await Worker.findById(req.params.id)
    res.send(data)
});



app.get('/api/arabworkers/:id', async (req,res) => {
    const data = await Worker.find({arab:req.params.id})
    // Worker.find()
    res.send(data)
});

app.get('*',(req,res)=>{
    const page = path.join(__dirname, '../front-end/dist/index.html')
    res.sendFile(page)
})
    
    
    
let Port = 4000
app.listen(process.env.Port || Port,()=>console.log(`web is running on port ${Port}`))