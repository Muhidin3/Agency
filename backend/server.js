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

import { S3Client,PutObjectCommand,GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import multer from 'multer'
import fileUpload from 'express-fileupload'
import Country from './models/country.model.js'
import Dashboard from './models/dashboard.model.js'



dotenv.config()
try {
    connectDB() 
} catch (error) {
    console.log(error.message)
}

const app = express()

app.use(express.json());      // allow to pass json to body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

// app.use(express.static(path.join(__dirname,'./dist')))
app.use(express.static(path.join(__dirname,'dist')))



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
    res.send(`${newCountry.name} added successfuly`)
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


    // const arab = await Arab.findOne({_id:req.body.arab})
    // console.log(await Worker.findOne({_id:'6730400eccef7eae199a1bfe'}).populate('arab').exec())




    await newWorker.save()
    res.send('saved succsfully \n')
});



app.patch('/api/workers/:id',async (req,res) => {
    const data = req.body
    const {key ,...workerData} = data 
    const files = req.files
    console.log("body:::::",req.body)
    console.log("files::::",files)
    let error = false
    try {
        Object.keys(workerData).map((key,index)=>{
            if(workerData[key]=='true'|| workerData[key]=='false'){
                return
            }
            if(workerData[key].slice(0,5)=='tx://'||workerData[key].slice(0,5)=='s3://'){
                return
            }
            workerData[key]= "tx://"+workerData[key]
        })

        Object.keys(files).map((key,index)=>{
            if(typeof(files[key])=='object'){
                workerData[key]=('s3://'+files[key].md5)
            }

        })
    } catch (error) {
        console.log('error from data',error.message)
        error = true
    }
    const worker = {[key]:workerData}

    console.log(worker)

    // error = true
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
                console.log("Saved Successfully")
                
            } catch (error) {
                console.log("error while uploading",error.message)
                res.send('error saving file')
                return
            }
        })
        const updatedWorker = await Worker.findByIdAndUpdate(req.params.id,worker,{new:true})
        res.send('Saved Successfully')
    }


})

app.get('/api/getfile/:id',async (req,res)=>{

    // console.log(req.params.id)
    const fileId = req.params.id
    const getObjectParams = {
        Bucket:BucketName,
        Key:fileId
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3,command,{expiresIn:60})
    res.send(url)
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
    const page = path.join(__dirname,'dist','index.html')
    res.sendFile(page)
})
    
    
    
let Port = 3000
app.listen(process.env.Port || Port,()=>console.log(`web is running on port ${Port}`))