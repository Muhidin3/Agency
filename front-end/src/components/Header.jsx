/* eslint-disable no-unused-vars */
import { Box, Button, Container, Grid, Grid2, List, ListItem, Paper, Stack, Typography } from '@mui/material'
// import '../styles/Headers.css'
import { useNavigate } from 'react-router-dom'

function Header() {
  const nav = useNavigate()
  return (

    
    
    <Paper elevation={5} sx={{width:"100%",position:'sticky',top:"0px",zIndex:'1',backgroundColor:'rgba(24, 143, 255, 0)'}}>

      <Box sx={{pr:0,mb:2,backgroundColor:'rgba(24, 143, 255, 0.5)',backdropFilter:'blur(8px)',width:"100%"}}>

      <Stack direction={'row'}>

    <Grid2 container rowSpacing={0} columnSpacing={12}>
        <Grid2 size={{xs:12,sm:7,md:9,lg:9,xl:9}} >
        <Typography variant='h4' sx={{pt:2,pl:2}}>Agency Name </Typography>
        </Grid2>

        <Grid2 size={{xs:12,sm:5,md:3,lg:3,xl:3}}>
          <List sx={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between', width: '100%'}}>

            <ListItem>
              <Typography><Button onClick={()=>nav('/')}>Home</Button></Typography>
            </ListItem>
            <ListItem>
              <Typography><Button>About</Button></Typography>
            </ListItem>
            <ListItem>
              <Typography><Button>Contactus</Button></Typography>
            </ListItem>
          </List>

        </Grid2>
      </Grid2>

      </Stack>

      </Box>
    </Paper>

  )
}

export default Header