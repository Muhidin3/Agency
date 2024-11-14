import express from 'express'
import Worker from '../models/workers.model.js'
import Arab from '../models/arabs.model.js'
import { fileURLToPath } from 'url'

import { S3Client,PutObjectCommand,GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import multer from 'multer'
import fileUpload from 'express-fileupload'
import Country from '../models/country.model.js'
import Dashboard from '../models/dashboard.model.js'

const router = express.Router();


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

router.get('/country',async (req,res)=>{

    try{
        res.send(await Country.find())
    }
    catch(err){
        res.json({message:'An error occured try refreshing the page',error:err})
    }
})

router.post('/country',async (req,res)=>{
    const newCountry = new Country(req.body)
    await newCountry.save()
    res.send(`${newCountry.name} added successfuly`)
})



router.get('/arabsbycountry/:id',async (req,res)=>{
    const data = await Arab.find({country:req.params.id})
    
    res.send(data)
})

router.get('/arabs', async (req,res)=>{
    const data = await Arab.find()
    res.send(data)
});
router.get('/search',async (req,res) => {
    
    try {
        const searchTerm = req.query.name
        const regx =new RegExp(searchTerm,'i')
        const data = await Worker.find({name:regx}).exec();
        res.send(data)     
        
    } catch (error) {
        res.send('error'+error.message)
    }
})

router.post('/arabs',async (req,res)=>{

    const newArab = new Arab(req.body)

    await newArab.save()
    res.send(`${req.body.name} saved successfuly!`)  
});


router.delete('/arabs/:id',async (req,res) => {
    try {
        await Arab.findByIdAndDelete(req.params.id)
        res.send('Deleted successfully')    
    } catch (error) {
        res.send(`error deleting file${error}`)
    }
    
});


router.get('/workers', async (req,res) => {
    // const datta = await Worker.find()
    // const aaaa = await datta.sort()
    
    res.send(await Worker.find().sort({createdAt:-1}))  
});
router.post('/workers',async (req,res) => {
    const worker = req.body 
    const newWorker = new Worker(worker)
    
    await newWorker.save()
    res.send(`${req.body.name} saved succsfully`)
});

router.delete('/workers/:id',async (req,res) => {
    try {
        await Worker.findByIdAndDelete(req.params.id)
        res.send('Deleted successfully')    
    } catch (error) {
        res.send('error deleting file')
    }
    
});


router.patch('/workers/:id',async (req,res) => {
    const {key ,...workerData} = req.body 
    const files = req.files


    if(files==null){
        let datatoSend = {}
        for(let keys in workerData){
            if(workerData[keys].slice(0,5)!='s3://' && workerData[keys].slice(0,5)!='tx://')
                datatoSend[keys] = "tx://"+workerData[keys]
                // console.log('no need to take long path',keys,':',workerData[keys])
        }
        const worker = {[key]:datatoSend}
        await Worker.findByIdAndUpdate(req.params.id,worker,{new:true})
        // console.log(worker)
        
        res.send('Updated Successfully ')
        return
    }

    // console.log("body:::::",req.body)
    console.log("files::::",files)
    let error = false
    try {
        Object.keys(workerData).map((key,index)=>{
            if(workerData[key]=='true'|| workerData[key]=='false'){
                return
            }
            else if(workerData[key].slice(0,5)=='tx://'||workerData[key].slice(0,5)=='s3://'){
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
        try {
        Object.keys(files).map(async (key,index)=>{
                const params = {
                    Bucket:BucketName,
                    Key:files[key].md5,
                    Body:files[key].data,
                    ContentType: files[key].mimetype
                }
    
                const command = new PutObjectCommand(params)
                await s3.send(command)
                console.log("Saved Successfully")
                
            })
        } catch (error) {
            console.log("error while uploading",error.message)
            return
        }
        const updatedWorker = await Worker.findByIdAndUpdate(req.params.id,worker,{new:true})
        res.send('Saved Successfully')
    }


})

router.get('/workers/:id', async (req,res) => {
    var data = await Worker.findById(req.params.id)
    var arab = await Arab.findById(data.arab).populate('country').exec();
    
    res.send([data,arab])

});

router.get('/getfile/:id',async (req,res)=>{

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







router.get('/arabworkers/:id', async (req,res) => {
    const data = await Worker.find({arab:req.params.id})
    res.send(data)
});



router.get('/dash',async (req,res)=>{
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

router.patch('/dash',async (req,res)=>{
    await Dashboard.findByIdAndUpdate('672b59e85b195015f24febf2',req.body)
    res.send("saved" + await Dashboard.find())
})






export default router