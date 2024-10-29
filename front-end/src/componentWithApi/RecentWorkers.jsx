// eslint-disable-next-line no-unused-vars
import { Button, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
// eslint-disable-next-line no-unused-vars
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'

function RecentWorkers() {
    const [data,setData] = useState([])
    const [isLoading,setIsLoading]= useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch('http://localhost:4000/api/workers')
            .then(async (res)=> await  res.json())
            setData(res)
        }
        fetchData()
        setIsLoading(false)
    
    },[])

    const handleClick = (id) => {
        navigate('/eachWorker/'+ id)
        // console.log(id)
    }


    if (isLoading) {
        return<><h1>Loading</h1></>
    } else {
        return(
            <>
            <Typography variant="h4">Recent Workers</Typography>
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

export default RecentWorkers