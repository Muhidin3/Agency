/* eslint-disable no-unused-vars */
import { Box, Paper, Typography } from "@mui/material"
import axios from "axios"
import * as motion from "framer-motion/client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function MySearch() {
    const [data,setData]= useState([])
    const url = import.meta.env.VITE_HOST
    const [query,setQuery] = useState('')
    const navigate = useNavigate();

    const handleSearch = async (searchTerm)=>{
        if(searchTerm=='' || searchTerm.indexOf('/')!=-1){
          return
        }
        const res = await axios.get(`${url}api/search?name=${searchTerm}`)
        setData(res.data)
        // console.log(searchTerm.indexOf('x'))
    } 

    function handleChange(e){
        handleKeyDown(e)
        setQuery(e.target.value)
        // console.log(query,e.target.value)
        handleSearch(e.target.value)
        // console.log(e.target.value)
    }

    const handleKeyDown = (e)=>{
      if(e.key == '/'){
        e.preventDefault();
      }
    }



  return (
    <>  
    <Box sx={{width:'80%',p:0}}>

        <motion.div initial={{ opacity: 1, scale: 0,y:-100 }}animate={{ opacity: 1, scale: 1,y:0,transitionDuration:"0.1s" }}> 
              <Paper elevation={10} sx={{p:2,borderRadius:"20px",}} >
              <input onKeyDown={handleKeyDown} onChange={handleChange} style={{width:"100%",outline:0,border:0,fontSize:"1.3rem"}} placeholder="Search"/>
              </Paper>          
          </motion.div>

              <Paper elevation={10} sx={{display:data.length==0?'none':'block',p:2,mt:2,borderRadius:"20px"}} >
                {data.map((v,i)=>{
                  return(<Box key={i} sx={{
                                          borderBottom:'1px solid grey',
                                          ':hover':{scale:1.1,cursor:"pointer",transitionDuration:'0.5s',pl:4,borderBottom:'0px'},
                                          pt:1
                                          }} 
                                          onClick={()=>navigate(`/eachWorker/${v._id}`)}>
                      <Typography variant="h5">{v.name}</Typography>
                  </Box>


                  )
                })}
              </Paper>          

          
    </Box>
    </>
  )
}

export default MySearch