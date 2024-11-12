/* eslint-disable no-unused-vars */
import { Box, Button, Container, Divider, Drawer, Grid, Grid2, List, ListItem, Paper, Stack, Typography } from '@mui/material'
// import '../styles/Headers.css'
import { useNavigate } from 'react-router-dom'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useState } from 'react';
import MyDrawer from './MyDrawer';

function Header() {
  const nav = useNavigate()
  const [state,setState]= useState(false)
  
  return (<>


    
    
    <Paper elevation={5} sx={{width:"100%",position:'sticky',top:"0px",zIndex:'1',backgroundColor:'rgba(24, 143, 255, 0)'}}>
      <Box sx={{pr:0,mb:2,color:'whitesmoke',backgroundColor:'rgba(63, 114, 175, 0.5)',backdropFilter:'blur(8px)',width:"100%"}}>
        <Stack direction={'row'}>
              <Box sx={{position:"absolute",mt:2}}>

              <Button sx={{p:0,m:0}} onClick={()=>setState(!state)}>
                <MenuOpenIcon fontSize='large'/>
              </Button>

              </Box>
              <Typography variant="h4" sx={{p:2,pl:12}}>  Agency Name </Typography>
        </Stack>

      </Box>
    </Paper>

    <MyDrawer state={state} setState={setState}/>

  </>

  )
}

export default Header