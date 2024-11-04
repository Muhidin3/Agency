/* eslint-disable no-unused-vars */
import { Box, Button, Drawer, Grid2, Input, Paper, TextField, Typography } from "@mui/material"
import { height } from "@mui/system"
import { useNavigate } from "react-router-dom"
import CountUp from 'react-countup';
// React
// import { motion } from "framer-motion"

// React Server Components
import * as motion from "framer-motion/client"
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate()
    const [arabs,setArabs]= useState([])
    const [countries,setCountries]= useState([])
    const [workers,setWorkers]= useState([])
    const url = import.meta.env.VITE_HOST

    useEffect(()=>{
      async function fetchdata() {
        const resarabs= await axios.get(url+'api/arabs')
        setArabs(resarabs)
        console.log(arabs.data)
      }
      fetchdata()
    },[])
    const data = {
      Countries:{
        1:"Country1",
        2:"Country2",
        3:"Country3"
      },
      Arabs:{
        1:"Arab1",
        2:"Arab2",
        3:"Arab3"
      },Workers:{
        1:"Worker1",
        2:"Worker2",
        3:"Worker3"
      }
    }

    const keys = Object.keys(data)
  return (
    <>
    {/* <Button size='large' variant='contained' onClick={()=>navigate('/arabs')} sx={{m:2}} fullWidth>Arabs</Button> */}
    {/* <Button size='large' variant='contained' onClick={()=>navigate('/recentWorkers')} sx={{m:2}} fullWidth>Recent Workers</Button> */}
    
      <Grid2 container spacing={3}>
            {/* search */}
          <Grid2 size={{xs:12}} sx={{justifyItems:"center",mb:15,mt:10}}>
          <motion.div 
            // className="box"
            initial={{ opacity: 1, scale: 1,y:-100 }}
            animate={{ opacity: 1, scale: 1,y:10,transitionDuration:"0.2s" }}
            
          > 
              <Paper elevation={10} sx={{p:3,width:"70%",borderRadius:"200px"}} >
                      {/* <TextField sx={{}} variant="filled" label="Search" fullWidth></TextField> */}
                      {/* <Input placeholder="search" fullWidth sx={{border:"10px solid white",borderBottom:0,borderRadius:"20px"}}/> */}
                    <input style={{width:"100%",outline:0,border:0,fontSize:"1.3rem"}} placeholder="Search"/>
              </Paper>          
          </motion.div>
          </Grid2>

          <Grid2 size={{xs:12}} sx={{mb:12}}>

              {/* number of workers and arabs */}
              <Grid2 container columnSpacing={20} rowSpacing={3} sx={{p:1}}>
                  <Grid2 size={{xs:12,sm:6,md:6}} sx={{justifyItems:"center"}} onClick={()=>navigate('/recentWorkers')} >
              <motion.div initial={{x:-100}} animate={{x:0}} style={{width:"100%"}}>
                    <Paper elevation={10} sx={{p:3,width:"100%",bgcolor:"#FAFAFA",borderRadius:"20px"}}>
                        <Typography variant="h1" textAlign={"center"} color="text.primary">
                        <CountUp start={281/1.2} end={281} duration={3} separator="," />
                        </Typography>
                        <Typography textAlign={"center"} variant="h4" color="text.primary">Workers</Typography>
                    </Paper>
              </motion.div>
                  </Grid2>

                  <Grid2 size={{xs:12,sm:6,md:6}} sx={{justifyItems:"center"}} onClick={()=>navigate('/arabs')}>
                  <motion.div initial={{x:100}} animate={{x:-50}} style={{width:"100%"}}>

                    <Paper elevation={10} sx={{p:3,width:"100%",bgcolor:"#FAFAFA",borderRadius:"20px"}}>
                        <Typography variant="h1" textAlign={"center"} color="text.primary">
                        <CountUp start={21/1.2} end={21} duration={3} separator="," />
                        </Typography>
                        <Typography textAlign={"center"} variant="h4" color="text.primary">Arabs</Typography>
                    </Paper>                  
              </motion.div>
                  </Grid2>
              </Grid2>
          </Grid2>

          {keys.map((v,i)=>{
            if(v=='Workers'){
              return(<Grid2 key={i} size={{xs:12,md:12}}>
                <motion.div initial={{y:+100}} animate={{y:0}} style={{width:"100%"}}>


                <Paper elevation={24} sx={{p:3,bgcolor:"primary.light",borderRadius:'20px'}}>
                      <Typography variant="h4" textAlign={"center"} color="text.primary">{v}</Typography>
                      <Box sx={{pt:1}}>
                      {Object.keys(data[v]).map((vv,ii)=>{
                        return(
                        <Paper key={ii} elevation={0} sx={{height:'50px',
                                                          p:1,mt:1,
                                                          bgcolor:"#F0F2F5", 
                                                          color:"#1B263B",
                                                          ':hover':{cursor:"pointer"},
                                                          borderRadius:'20px'}}>
                          <Typography >{data[v][vv]}</Typography>
                        </Paper>
                        )
                      })}
                      </Box>
                  </Paper>

                </motion.div>
                </Grid2>)
            }
            return(
              <Grid2 key={i} size={{xs:12,md:6}}>
              <motion.div initial={{y:+100}} animate={{y:0}} style={{width:"100%"}}>

                <Paper elevation={24} sx={{p:3,bgcolor:"primary.light",borderRadius:'20px'}}>
                      <Typography variant="h4" textAlign={"center"} >{v}</Typography>
                      <Box sx={{pt:1}}>
                      {Object.keys(data[v]).map((vv,ii)=>{
                        return(
                        <Paper key={ii} elevation={0} sx={{height:'50px',
                                                          p:1,mt:1,
                                                          bgcolor:"#F0F2F5", 
                                                          color:"#1B263B",
                                                          ':hover':{cursor:"pointer"},
                                                          borderRadius:'20px'}}>
                          <Typography >{data[v][vv]}</Typography>
                        </Paper>
                        )
                      })}
                      </Box>
                  </Paper>
                  </motion.div>

                </Grid2>
            )
          })}  
          
      </Grid2>
    </>
  )
}

export default Dashboard