/* eslint-disable react/prop-types */
import {Box,Typography,Stack,Avatar, Paper, CircularProgress} from '@mui/material'
import { useState } from 'react';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  // value: propTypes.number.isRequired,
}


function AvatarHead(props) {
  const [loading,setLoading] = useState(50)


  
  return (
    <>  
    <Paper elevation={3} sx={{borderRadius:'20px'}}>
        <Box sx={{p:2,bgcolor:"",mb:3,borderRadius:'20px'}}>   


    <Stack direction="row" spacing={0} alignItems="center">

        <Avatar sx={{width:100,height:100}}>
            <Typography variant="h2">{props.name.toLocaleUpperCase()[0]}</Typography>
        </Avatar>

        <Box sx={{pl:4 , width:"1000px"}}>
        <Typography variant='h4'> {props.name.toLocaleUpperCase()} </Typography>
        <Typography sx={{ml:3,opacity:0.7}}>Arab: {props.pNum.slice(5)}</Typography>
        <Typography sx={{ml:3,opacity:0.7}}>Country: {props.pNum.slice(5)}</Typography>
        <Typography sx={{ml:3,opacity:0.7}}>PhoneNumber: {props.pNum.slice(5)}</Typography>
        </Box>
        <Box sx={{scale:'200%',mr:5}}>
        <CircularProgress variant='determinate' value={loading}/>
        </Box>

    </Stack>

    </Box>
    </Paper>
    </>
  )
}

export default AvatarHead  