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
import fileUpload from 'express-fileupload'
import Country from './models/country.model.js'
import Dashboard from './models/dashboard.model.js'



dotenv.config()
connectDB()

const app = express()

app.use(express.json())      // allow to pass json to body
app.use(bodyParser.urlencoded({limit:"10mb",extended:true}))
app.use(bodyParser.json({limit:"10mb"}))
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,'../front-end/dist')));
app.use(fileUpload());







const storage = multer.memoryStorage()
const upload = multer({storage:storage,limits:{fileSize:10*1024*1024}})


const BucketName =process.env.BUCKET_NAME
const BucketRegion =process.env.BUCKET_REGION
const AccessKey = process.env.ACCESS_KEY
const SecretAccessKey = process.env.SECRET_ACCESS_KEY


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

// const cpUpload = upload.fields()
app.post('/tryy',async (req,res)=>{

    upload.single('file')(req,res,function (err){
        
        if (err instanceof multer.MulterError) {
            console.log('multererror')
        }else if(err){
            console.log('my error')
        }

        console.log("started")
        console.log(req.file)
        console.log(req.body)
    })


    try {
        const params = {
            Bucket:BucketName,
            Key:req.file.originalname,
            Body:req.file.buffer,
            ContentType: req.file.mimetype
        }
        const command = new PutObjectCommand(params)
    
        await s3.send(command)
        
        console.log('ended')
        res.json({message:'sent'})

    } 
    catch (error) {
        console.log('error',error.message)
        res.send('error sending the file')
    }

});
app.post('/try',(req,res)=>{
    const textData= req.body
    // if (req.files!= null) {
        // const reqbody = {LegalDocuments:{cv:"abcd",id:"123",passport:"mnmnmnn"}}
        // const fileKeys = Object.keys(files)
        
        // console.log('sent',fileKeys)
    // }
    // const files = req.files
    console.log('body::::::',req.body)
    console.log('files::::::',req.files)
    // const textkeys = Object.keys(reqbody) 

    // textkeys.map((v,i)=>{
    //     console.log(reqbody[v])
    // })

    // console.log("bodytext",textData)


    // console.log('files',files)


    // console.log('sent',files[fileKeys])
    res.send('end')
})













app.get('/api/country',async (req,res)=>{

    try{
        res.send(await Country.find())
    }
    catch(err){
        res.json({message:'An error occured try refreshing the page',error:err})
    }
})

app.post('/api/country',async (req,res)=>{
    const newCountry = new Country(req.body)
    await newCountry.save()
    res.send(`${newCountry.name} saved successfuly`)
})



app.get('/api/arabsbycountry/:id',async (req,res)=>{
    const data = await Arab.find({country:req.params.id})
    
    res.send(data)
})

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
    const data = req.body
    const {key ,...workerData} = data 
    const files = req.files
    // console.log("body:::::",workerData)
    // console.log("files::::",files)
    let error = false
    try {
        Object.keys(workerData).map((key,index)=>{
            workerData[key]= "tx://"+workerData[key]
        })
        Object.keys(files).map((key,index)=>{
            workerData[key]=('s3://'+files[key].md5)
        })
    } catch (error) {
        console.log('error from data',error.message)
        error = true
    }
    const worker = {[key]:workerData}

    if(!error){
        
        Object.keys(files).map(async (key,index)=>{
            try {
                const params = {
                    Bucket:BucketName,
                    Key:files[key].md5,
                    Body:files[key].data,
                    ContentType: files[key].mimetype
                }
    
                const command = new PutObjectCommand(params)
                await s3.send(command)
                const updatedWorker = await Worker.findByIdAndUpdate(req.params.id,worker,{new:true})
                console.log("uploaded to s3 successfully")
                
            } catch (error) {
                console.log("error while uploading",error.message)
            }
        })

    }


    // console.log(worker)
    res.send('updated succsfully')
    // res.send('updated succsfully \n'+ await Worker.findById(req.params.id))
})


app.get('/api/workers/:id', async (req,res) => {
    const data = await Worker.findById(req.params.id)
    res.send(data)
});



app.get('/api/arabworkers/:id', async (req,res) => {
    const data = await Worker.find({arab:req.params.id})
    res.send(data)
});



app.get('/api/dash',async (req,res)=>{
    const data = await Dashboard.find()
    const numwork = (await (Worker.find())).length
    const numarab = (await (Arab.find())).length
    const samworker = await Worker.find().sort({createdAt:-1}).limit(3)
    const samarab = await Arab.find().sort({createdAt:-1}).limit(3)
    const samcountry = await Country.find().sort({createdAt:-1}).limit(3)
    const sendedFile = {
        numwork:numwork,
        numarab:numarab,
        samcountry:samcountry,
        samarab:samarab,
        samworker:samworker
    }
    res.send(sendedFile)
})


app.patch('/api/dash',async (req,res)=>{
    await Dashboard.findByIdAndUpdate('672b59e85b195015f24febf2',req.body)
    res.send("saved" + await Dashboard.find())
})

app.get('*',(req,res)=>{
    const page = path.join(__dirname, '../front-end/dist/index.html')
    res.sendFile(page)
})
    
    
    
let Port = 3000
app.listen(process.env.Port || Port,()=>console.log(`web is running on port ${Port}`))