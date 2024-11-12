// eslint-disable-next-line no-unused-vars
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
// eslint-disable-next-line no-unused-vars
import { Box } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate,useParams} from 'react-router-dom'
import MyLoading from "../componentWithApi/EachWorker/MyLoading"
import MyDelete from "../componentWithApi/EachWorker/MyDelete"

function Workers() {
    const [data,setData] = useState([])
    const [isLoading,setIsLoading]= useState(true)
    const navigate = useNavigate()
    const {id} = useParams()
    const [dialog,setDialog] = useState(false)
    const [formData,setFormData] = useState('')
    const url = import.meta.env.VITE_HOST

    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch(url+'api/arabworkers/'+id)
            .then(async (res)=> await  res.json())
            setData(res)
        }
        fetchData()
        setIsLoading(false)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[url,isLoading])

    const handleClick = (id) => {
        navigate('/eachWorker/'+ id)
        // console.log(id)
    }

    function handleDialog() {
        setDialog(!dialog)
    }
    function handleChange(e) {
        setFormData(e.target.value)
        console.log({name:formData})
    }

    async function handleSubmit() {
        
        // eslint-disable-next-line no-unused-vars
        const responce = await axios.post(`${url}api/workers`,{name:formData,arab:id})
        console.log(`saved`)
        setIsLoading(true)
        setDialog(false)
    }


    if (isLoading) {
        return<><MyLoading/></>
    } else {
        return(
            <>
            <Stack direction={"row"} sx={{mb:2}}>
            <Typography variant="h4" width={"80%"}>Workers</Typography>

            <Button variant="contained" onClick={handleDialog} sx={{":hover":{color:'primary.main'}}}>New Worker</Button>

            
            <Dialog open={dialog}>

            <DialogTitle><Typography>New Worker</Typography></DialogTitle>

            <DialogContent><TextField name="name" label="Name" sx={{mt:1}} onChange={(e)=>handleChange(e)} required={true}/></DialogContent>

            <DialogActions>
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
            <Button variant="contained" onClick={handleDialog} sx={{":hover":{color:'blueviolet'}}}>Close</Button>
            </DialogActions>

            </Dialog>
            
            </Stack>
            {/* <Paper sx={{m:2}}> */}
                        

            <TableContainer sx={{borderRadius:'20px 20px 0 0'}}>
                <Table >

                    <TableHead >

                        <TableRow sx={{bgcolor:"rgba(1,1,1,0.1)", zIndex:"-1"}}>
                    {/* <Paper sx={{bgcolor:"rgba(1,1,1,0.1)", zIndex:"-1"}} elevation={0}> */}
                            <TableCell sx={{width:'80%'}}> Workers </TableCell>

                            <TableCell> Delete </TableCell>
                    {/* </Paper> */}
                        </TableRow>
                        
                    </TableHead>

                    <TableBody>
                        {data.map((v,i)=>{
                            return(
                            <TableRow key={i}>
                                <TableCell 
                                 onClick={()=>handleClick(v._id)}
                                 sx={{":hover":{bgcolor:'primary.light',cursor:'pointer'}}} key={v.id} >
                                    <Typography variant="h6">{v.name}</Typography>
                                </TableCell>

                                <TableCell>

                                <MyDelete id={v._id} loading={setIsLoading} name={v.name}/>

                                </TableCell>
                            </TableRow>                        

                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            {/* </Paper> */}
            </>
        )
    }
}

export default Workers