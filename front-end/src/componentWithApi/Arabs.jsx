import { useEffect, useState } from "react"
import axios from "axios"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { useNavigate } from "react-router-dom"
import MyLoading from "./EachWorker/MyLoading"


function Arabs() {
    const [arabs,setArabs] = useState([])
    const [loadind,setLoading] = useState(true)
    const [dialog,setDialog] = useState(false)
    const [formData,setFormData] = useState({name:'',id:''})
    const [numberOfWorkers,setNum] = useState([])
    const navigate = useNavigate()
    const url = import.meta.env.VITE_HOST

    useEffect(()=>{
        async function fetchdata() {
            const responce = await axios.get(url+'api/arabs')
            // console.log(responce.data)
            // console.log(responce.data)
            setArabs(responce.data)
            setLoading(false)
            

        }
        fetchdata()
    },[url])

    async function handlenumberOfWorkers(v) {
        const id = v._id
        const res = await axios.get(url+'api/arabworkers/'+id)
        const resdata = res.data
        setNum((p)=>([...p,resdata.length]))
        // console.log(resdata.length)
        // console.log(numberOfWorkers)

    }


    
    async function handleSubmit() {
        // eslint-disable-next-line no-unused-vars
        const responce = await axios.post(url+'api/arabs',formData)
        console.log('submitted')
    }

    function handleChange(e) {
        const a = e.target.name
        setFormData((p)=>{
            return({...p,[a]:e.target.value})
        })
    }
    function handleClick(v) {
        navigate('/workers/'+ v._id)
    //  console.log(v._id)   
    }


    if (loadind) {
        return(<MyLoading/>)
    }

  return (
    <>
    <Box>
        <Stack direction={"row"}>
            <Typography variant="h4" width={'80%'}>List Of Arabs</Typography>
            <Button onClick={()=>setDialog(!dialog)} variant="contained">New Arab</Button>

            <Dialog open={dialog}>
                <DialogTitle sx={{backgroundColor:"primary.main",mb:2}}>
                   <Typography sx={{color:"text.main"}} variant="h4">New Arab</Typography> 
                </DialogTitle>

                <DialogContent >
                   
                    <Typography sx={{display:"inline-block",minWidth:"20%", pt:1,pr:2}} variant="h5">Name: </Typography>

                    <TextField label='Name' name="name" size="small" onChange={(e)=>handleChange(e)} sx={{mt:1}}/>
                    <br/>
                    <br/>
                    {/* <Typography sx={{display:"inline-block",minWidth:"23%"}} variant="h5">Id: </Typography> */}

                    {/* <TextField label='Id' name="id" size="small" onChange={(e)=>handleChange(e)}/> */}

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSubmit} variant="contained">submit</Button>
                    <Button onClick={()=>setDialog(!dialog)} variant="outlined">close</Button>
                </DialogActions>

            </Dialog>

        </Stack>
        
        <TableContainer>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell width={"70%"}>
                        Arabs Name
                    </TableCell>
                    <TableCell>Number of workers</TableCell>
                </TableRow>
            </TableHead>

                <TableBody>
                {arabs.map((v,i)=>{
                    handlenumberOfWorkers(v)
                    return(
                    <TableRow key={i} sx={{":hover":{backgroundColor:"primary.light",borderRadius:"20px"},cursor:"pointer",borderRadius:"20px"}}>
                        <TableCell onClick={()=>handleClick(v)}>
                            <Typography>{v.name}</Typography>
                            
                        </TableCell>
                        <TableCell>{numberOfWorkers[i]}</TableCell>
                    </TableRow>

                    )
                })}

                </TableBody>

            </Table>
        </TableContainer>
    </Box>
    </>
  )
}

export default Arabs