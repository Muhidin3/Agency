/* eslint-disable react/prop-types */
import {Box,Typography,Stack,Avatar, Paper} from '@mui/material'


function AvatarHead(props) {
  return (
    <>  
    <Paper elevation={3} sx={{borderRadius:'20px'}}>
        <Box sx={{p:2,bgcolor:"",mb:3,borderRadius:'20px'}}>   


    <Stack direction="row" spacing={0} alignItems="center">

        <Avatar sx={{width:100,height:100}}>
            <Typography variant="h2">{props.name.toLocaleUpperCase()[0]}</Typography>
        </Avatar>

        <Box sx={{pl:4 , width:"1000px"}}>
        <Typography variant='h3'> {props.name.toLocaleUpperCase()} </Typography>
        <Typography sx={{ml:3}}>PhoneNumber: {props.pNum}</Typography>
        <Typography></Typography>

        </Box>
    </Stack>

    </Box>
    </Paper>
    </>
  )
}

export default AvatarHead  