// eslint-disable-next-line no-unused-vars
import { Button, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
// eslint-disable-next-line no-unused-vars
import { Box } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import MyLoading from "./EachWorker/MyLoading"
import MyDelete from "./EachWorker/MyDelete"
// import dotenv from 'dotenv'

function RecentWorkers() {
    
    const [data,setData] = useState([])
    const [isLoading,setIsLoading]= useState(true)
    const navigate = useNavigate()
    const url = import.meta.env.VITE_HOST

    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get(url+'api/workers')
            setData(res.data)
            setIsLoading(false)    
        }
        fetchData()
    
    },[url,isLoading])

    const handleClick = (id) => {
        navigate('/eachWorker/'+ id)
        // console.log(id)
    }


    if (isLoading) {
        return<><MyLoading /></>
    } else {
        return(
            <>
            <Typography variant="h4">Recent Workers</Typography>
            {/* <Paper sx={{m:2}}> */}
                        

            <TableContainer sx={{borderRadius:'20px 20px 0 0 '}}>
                <Table >

                    <TableHead sx={{backdropFilter:'invert(10%)'}}>
                        <TableRow>
                            <TableCell sx={{width:'90%'}}> 
                           <Typography variant="h5">Workers</Typography> 
                            </TableCell>
                            <TableCell> 
                           <Typography variant="h5"></Typography> 
                            </TableCell>
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

export default RecentWorkers