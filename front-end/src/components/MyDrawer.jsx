import { Box, Button, Collapse, Divider, Drawer, List, ListItem, ListItemIcon, Stack, Typography } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardIcon from '@mui/icons-material/Dashboard'
import RecentActors from '@mui/icons-material/RecentActors'
import Language from '@mui/icons-material/Language'
import Logout from '@mui/icons-material/Logout'
import Person from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
function MyDrawer({state,setState}) {
    const[collapseState,setCollapseState] = useState([false,false])
    const url = import.meta.env.VITE_HOST
    const [data,setData] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchdata() {
            const res = await axios.get(url+'api/dash')
            setData([res.data.samworker,res.data.samarab])
            // console.log(data)
        }
        fetchdata()
    },[url,collapseState])

    function loadWorkers(num){
        setCollapseState({...collapseState,[num]:!collapseState[num]})
    }

    function handleClick(v,i){
        i==0 && navigate('/')
        i==1 && navigate('/recentWorkers')
        i==2 && navigate('/arabs')
        i==3 && navigate('/country')
        setState(false)
    }
  return (<>

    <Drawer open={state} onClose={()=>setState(false)} >
    <Box sx={{minWidth:'200px',bgcolor:'#eaeaea', height:'100%'}} >
          
          {/* head */}
        <Stack direction={'row'}>

              <Typography variant="h4" sx={{p:2,pl:1}}>  Agency Name </Typography>

              <Box sx={{position:"relative",mt:2.5,right:0}}>
              <Button sx={{p:0,m:0}} onClick={()=>setState(!state)}>
                <MenuOpenIcon fontSize='large' />
              </Button>
              </Box>
        </Stack>
      <Divider/>
      <List>
        {['Dashboard','Recent Workers','Arabs','Countries'].map((v,i)=>{
            return(
            <ListItem key={i} sx={{cursor:'pointer',':hover':{scale:1.2,pl:5},transitionDuration:'0.3s'}}
            onClick={()=>handleClick(v,i)}>
                    <ListItemIcon>
                    {i==0 && <DashboardIcon/>}
                    {i==1 && <RecentActors/>}
                    {i==2 && <Person/>}
                    {i==3 && <Language/>}
                    </ListItemIcon>
                    <Typography variant='h6'>{v}</Typography>
                
            </ListItem>
            )


        })}
      </List>
      <Divider/>

        <ListItem sx={{cursor:'pointer',':hover':{scale:1.2,pl:5},transitionDuration:'0.3s'}} onClick={()=>loadWorkers(0)}>
            <ListItemIcon>

            <KeyboardArrowRight sx={{display:collapseState[0]?'none':'block',scale:1.5}} onClick={()=>loadWorkers(0)}/>
            <KeyboardArrowDown sx={{display:collapseState[0]?'block':'none',scale:1.5}} onClick={()=>loadWorkers(0)}/>
            </ListItemIcon>
            <Typography variant='h6'>Workers</Typography>

        </ListItem>

            {/* workerdata */}
            <Collapse in={collapseState[0]} >
                <Box sx={{display:'block',pl:7}}>

                    <List>
                        {data.length==0?<p>loading</p>:
                            data[0].map((v,i)=>{
                                return(
                                <ListItem key={i}>
                                    <Typography>{v.name}</Typography>
                                </ListItem>)
                            })}
                    </List>
                
                </Box>
            </Collapse>


        <ListItem sx={{cursor:'pointer',':hover':{scale:1.2,pl:5},transitionDuration:'0.3s'}} onClick={()=>loadWorkers(1)}>
            <ListItemIcon>
            <KeyboardArrowRight sx={{display:collapseState[1]?'none':'block',scale:1.5}} onClick={()=>loadWorkers(1)}/>
            <KeyboardArrowDown sx={{display:collapseState[1]?'block':'none',scale:1.5}} onClick={()=>loadWorkers(1)}/>
            </ListItemIcon>
            <Typography variant='h6'>Arabs</Typography>

        </ListItem>     

        <Collapse in={collapseState[1]} >
                <Box sx={{display:'block',pl:7}}>

                    <List>
                        {data.length==0?<p>loading</p>:
                            data[1].map((v,i)=>{
                                return(
                                <ListItem key={i}>
                                    <Typography>{v.name}</Typography>
                                </ListItem>)
                            })}
                    </List>
                
                </Box>
            </Collapse>


    <Divider/>
    <ListItem sx={{cursor:'pointer',':hover':{scale:1.2,pl:5},transitionDuration:'0.3s'}}>
        <ListItemIcon>
        <Logout/> 
        </ListItemIcon>
        <Typography>Log Out</Typography>
        </ListItem>
    </Box>
</Drawer>
  </>
  )
}

export default MyDrawer