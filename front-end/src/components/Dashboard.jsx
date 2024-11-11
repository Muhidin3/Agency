/* eslint-disable no-unused-vars */
import { Box, Button, Drawer, Grid2, Input, Paper, TextField, Typography } from "@mui/material"
import { height } from "@mui/system"
import { useNavigate } from "react-router-dom"
import CountUp from 'react-countup';
import backgroundimg from '../assets/brushed-alum.png' 
 
// React
// import { motion } from "framer-motion"

// React Server Components
import * as motion from "framer-motion/client"
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate()
    const [indata,setinData] = useState()
    const url = import.meta.env.VITE_HOST
    const [loading,setLoading] = useState(true)
    const [arabs,setArabs] = useState()

    useEffect(()=>{
      async function fetchdata() {
        const res = await axios.get(url+'api/dash')
        // console.log(res.data)
        setinData(res.data)
        setArabs()
        setLoading(false)
      }
      fetchdata()
    },[url])
   

    

    if (loading) {
      return(<h1>loading</h1>)
    }

  return (
    <>
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
                    <Paper elevation={10} sx={{p:3,width:"100%",borderRadius:"20px",backgroundImage:`url(${backgroundimg})`}}>
                        <Typography variant="h1" textAlign={"center"} color="text.primar,y">
                        <CountUp start={indata.numwork/2} end={indata.numwork} duration={3} separator="," />
                        </Typography>
                        <Typography textAlign={"center"} variant="h4" color="text.primary">Workers</Typography>
                    </Paper>
              </motion.div>
                  </Grid2>

                  <Grid2 size={{xs:12,sm:6,md:6}} sx={{justifyItems:"center"}} onClick={()=>navigate('/arabs')}>
                  <motion.div initial={{x:100}} animate={{x:-50}} style={{width:"100%"}}>

                    <Paper elevation={10} sx={{p:3,width:"100%",bgcolor:"#FAFAFA",borderRadius:"20px"}}>
                        <Typography variant="h1" textAlign={"center"} color="text.primary">
                        <CountUp start={indata.numarab/2} end={indata.numarab} duration={3} separator="," />
                        </Typography>
                        <Typography textAlign={"center"} variant="h4" color="text.primary">Arabs</Typography>
                    </Paper>                  
              </motion.div>
                  </Grid2>
              </Grid2>
          </Grid2>

          <Grid2 size={{xs:12,md:12}} container>
                
                <Grid2 size={{xs:12,md:6}}>
                      <motion.div initial={{y:+100}} animate={{y:0}} style={{width:"100%"}}>
                    
                    <Paper elevation={24} sx={{p:3,bgcolor:"primary.light",borderRadius:'20px'}} >
                        <Typography variant="h4" textAlign={"center"} onClick={()=>navigate('/country')}>countries</Typography>
                        {indata.samcountry.map((v,i)=>{
                          return(
                          <Box sx={{pt:1}} key={i}>
                          <Paper elevation={1} sx={{height:'50px',
                                                              p:1,mt:1,
                                                              bgcolor:"#F0F2F5", 
                                                              color:"#1B263B",
                                                              ':hover':{cursor:"pointer"},
                                                              borderRadius:'20px'}}
                                                              onClick={()=>navigate('/arabsbycountry/'+v._id)}>
                              <Typography variant="h6" sx={{pt:1,pl:1}}>{v.name}</Typography>
                            </Paper>
                          </Box>
                            
                            )
                        })}
                        <Typography sx={{mt:3,ml:1,cursor:'pointer'}} onClick={()=>navigate('/country')}>See more</Typography>
                      </Paper>
                      </motion.div>
                </Grid2>            
                <Grid2 size={{xs:12,md:6}}>
                      <motion.div initial={{y:+100}} animate={{y:0}} style={{width:"100%"}}>
                    
                    <Paper elevation={24} sx={{p:3,bgcolor:"primary.light",borderRadius:'20px'}}>
                        <Typography variant="h4" textAlign={"center"} onClick={()=>navigate('/arabs')}>Arabs</Typography>
                        {indata.samarab.map((v,i)=>{
                          return(
                          <Box sx={{pt:1}} key={i}>
                          <Paper elevation={0} sx={{height:'50px',
                                                              p:1,mt:1,
                                                              bgcolor:"#F0F2F5", 
                                                              color:"#1B263B",
                                                              ':hover':{cursor:"pointer"},
                                                              borderRadius:'20px'}}
                                                              onClick={()=>navigate('/workers/'+v._id)}>
                              <Typography variant="h6" sx={{pt:1,pl:1}}>{v.name}</Typography>
                            </Paper>
                          </Box>
                            
                            )
                        })}
                        <Typography sx={{mt:3,ml:1,cursor:'pointer'}} onClick={()=>navigate('/arabs')}>See more</Typography>

                      </Paper>
                      </motion.div>
                </Grid2>            
                <Grid2 size={{xs:12}}>
                      <motion.div initial={{y:+100}} animate={{y:0}} style={{width:"100%"}}>
                    
                    <Paper elevation={24} sx={{p:3,bgcolor:"primary.light",borderRadius:'20px'}}>
                        <Typography variant="h4" textAlign={"center"} onClick={()=>navigate('/recentworkers')}>Workers</Typography>

                        {indata.samworker.map((v,i)=>{
                          return(
                          <Box sx={{pt:1}} key={i}>
                          <Paper elevation={0} sx={{height:'50px',
                                                              p:1,mt:1,
                                                              bgcolor:"#F0F2F5", 
                                                              color:"#1B263B",
                                                              ':hover':{cursor:"pointer"},
                                                              borderRadius:'20px'}}
                                                              onClick={()=>navigate('/eachWorker/'+ v._id)}>
                              <Typography variant="h6" sx={{pt:1,pl:1}}>{v.name}</Typography>
                            </Paper>
                          </Box>
                            
                            )
                        })}
                        <Typography sx={{mt:3,ml:1,cursor:'pointer'}} onClick={()=>navigate('/recentworkers')}>See more</Typography>

                      </Paper>
                      </motion.div>
                </Grid2>            

          </Grid2> 
          
      </Grid2>
    </>
  )
}

export default Dashboard