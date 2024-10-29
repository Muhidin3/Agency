// eslint-disable-next-line no-unused-vars
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
// eslint-disable-next-line no-unused-vars
import { Box } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate,useParams} from 'react-router-dom'
import MyLoading from "../componentWithApi/EachWorker/MyLoading"

function Workers() {
    const [data,setData] = useState([])
    const [isLoading,setIsLoading]= useState(true)
    const navigate = useNavigate()
    const {id} = useParams()
    const [dialog,setDialog] = useState(false)
    const [formData,setFormData] = useState('')

    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch('/api/arabworkers/'+id)
            .then(async (res)=> await  res.json())
            setData(res)
        }
        fetchData()
        setIsLoading(false)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
        const responce = await axios.post('http://localhost:4000/api/workers',{name:formData,arab:id})
        console.log(`saved`)
    }


    if (isLoading) {
        return<><MyLoading/></>
    } else {
        return(
            <>
            <Stack direction={"row"}>
            <Typography variant="h4" width={"80%"}>Workers</Typography>

            <Button variant="contained" onClick={handleDialog}>New Worker</Button>

            
            <Dialog open={dialog}>

            <DialogTitle><Typography>New Worker</Typography></DialogTitle>

            <DialogContent><TextField name="name" label="Name" sx={{mt:1}} onChange={(e)=>handleChange(e)} required={true}/></DialogContent>

            <DialogActions>
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
            <Button variant="contained" onClick={handleDialog}>Close</Button>
            </DialogActions>

            </Dialog>
            
            </Stack>
            <Paper sx={{m:2}}>
                        

            <TableContainer>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Workers </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((v,i)=>{
                            return(
                            <TableRow key={i}>
                                <TableCell 
                                 onClick={()=>handleClick(v._id)}
                                 sx={{":hover":{bgcolor:'#f5f5f5',cursor:'pointer'}}} key={v.id} >
                                    <Typography>{v.name}</Typography>
                                </TableCell>
                            </TableRow>                        

                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
            </>
        )
    }
}

export default Workers