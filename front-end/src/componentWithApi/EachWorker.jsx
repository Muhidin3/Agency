/* eslint-disable no-unused-vars */
import { Alert, Avatar, Box, Collapse, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import AvatarHead from "./EachWorker/AvatarHead"
import MyTable from "./EachWorker/MyTable"
import { useParams } from "react-router-dom"
import axios from 'axios'
import MyLoading from "./EachWorker/MyLoading"
import CheckIcon from '@mui/icons-material/Check';



function EachWorker(props) {
    const [indata,setinData]= useState({})
    const [arabData,setArabData] = useState()
    const data = indata
    const [loading,setLoading] = useState(true)
    const {id} = useParams()
    const url = import.meta.env.VITE_HOST
    useEffect(()=>{
        async function fetchData(params) {
            const responce = await axios.get(url+'api/workers/'+id)
            console.log(url+'api/workers/'+id)
            setinData(responce.data[0])
            setArabData(responce.data[1])

            setLoading(false)
            // console.log(responce.data)
            
        }
        
        fetchData()
        
    },[id,url])
    
    if (loading) {
        return(<MyLoading/>)
    }
    
    
    //for collapse

    return (<>

    <AvatarHead name={data.name} 
                arabdata ={arabData}
                data={data}
                />
    <Paper elevation={0} sx={{borderRadius:'10px',bgcolor:"rgba(63, 114, 175,0.1)"}}>
        <form encType="">

    <MyTable data={data} id={id}/>
        </form>
    

    </Paper>
  </>
  )
}

export default EachWorker
