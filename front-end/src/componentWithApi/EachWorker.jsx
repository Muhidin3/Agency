/* eslint-disable no-unused-vars */
import { Avatar, Box, Collapse, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import AvatarHead from "./EachWorker/avatarHead"
import MyTable from "./EachWorker/MyTable"
import { useParams } from "react-router-dom"
import axios from 'axios'
import MyLoading from "./EachWorker/MyLoading"



function EachWorker(props) {
    const [indata,setinData]= useState({})
    const data = indata
    const [loading,setLoading] = useState(true)
    const {id} = useParams()
    
    useEffect(()=>{
        async function fetchData(params) {
            const responce = await axios.get('http://localhost:4000/api/workers/'+id)
            setinData(responce.data)
            setLoading(false)
            
        }
        
        fetchData()
        
    },[id])
    
    if (loading) {
        return(<MyLoading/>)
    }
    
    
    //for collapse

    return (<>

    <AvatarHead name={data.name} 
                pNum={data.ContactInfo.phoneNumber} />
    <Paper elevation={1} sx={{borderRadius:'10px'}}>
    <MyTable data={data} id={id}/>

    </Paper>
  </>
  )
}

export default EachWorker




// const [isLoading,setIsloading] = useState(true)
// // const data = olddata
// // const [data,setdata] = useState(olddata)

// const [keys,setKeys] = useState(Object.keys(data))
// const[collapse,setCollapse]= useState(keys.map(()=>false))

//chat
//for collapse





// if (isLoading) {
//     return(<><Typography>Loading</Typography></>)
// }