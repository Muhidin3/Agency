import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import MyLoading from "./EachWorker/MyLoading"
import { useNavigate } from "react-router-dom"

function Country() {
    const url = import.meta.env.VITE_HOST
    const [data,setData] = useState()
    const [loading,setLoading] = useState([])
    const navigate = useNavigate()

useEffect(()=>{
    const fetch = async ()=>{
        const res = await axios.get(url+'api/country')
        setData(res.data)
        setLoading(false)
    }
    fetch()
},[])

if (loading) {
    return(<div style={{margin:'20% 47%',scale:'200%'}}>
                <MyLoading/>
            </div>)
}

  return (
    <>
        <Box>
        <Stack direction={"row"}>
        
            <Typography variant="h4" width={'80%'}>Countries</Typography>
            <Button variant="contained">New Country</Button>
        </Stack>

            <Dialog open={false}>
                <DialogTitle sx={{backgroundColor:"primary.main",mb:2}}>
                   <Typography sx={{color:"text.main"}} variant="h4">New Arab</Typography> 
                </DialogTitle>

                <DialogContent >
                   
                    <Typography sx={{display:"inline-block",minWidth:"20%", pt:1,pr:2}} variant="h5">Name: </Typography>

                    <TextField label='Name' name="name" size="small" sx={{mt:1}}/>
                    <br/>
                    <br/>
                    {/* <Typography sx={{display:"inline-block",minWidth:"23%"}} variant="h5">Id: </Typography> */}

                    {/* <TextField label='Id' name="id" size="small" onChange={(e)=>handleChange(e)}/> */}

                </DialogContent>

                <DialogActions>
                    <Button  variant="contained">submit</Button>
                    <Button  variant="outlined">close</Button>
                </DialogActions>

            </Dialog>

        


        <TableContainer sx={{borderRadius:'20px 20px 0 0',mt:3}}>
            <Table>
            <TableHead sx={{backdropFilter:'invert(20%)'}}>
                <TableRow>
                    <TableCell width={"70%"}>
                        Countries 
                    </TableCell>
                    <TableCell>Number of Arabs</TableCell>
                </TableRow>
            </TableHead>

                <TableBody>
                
                    {data.map((v,i)=>{
                        return(
                        
                    <TableRow key={i} sx={{":hover":{backgroundColor:"primary.light",borderRadius:"20px"},cursor:"pointer",borderRadius:"20px"}}
                                    onClick={()=>navigate('/arabsbycountry/'+v._id)}>
                        <TableCell >
                            <Typography>{v.name}</Typography>
                            
                        </TableCell>
                        <TableCell>0</TableCell>
                    </TableRow>)

                    })}

                    
                

                </TableBody>

            </Table>
        </TableContainer>
    </Box>
    </>
  )
}

export default Country