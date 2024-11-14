/* eslint-disable react/prop-types */
import {Box,Typography,Avatar, Paper, Grid2} from '@mui/material'
import { useState } from 'react';
import {LinearProgress} from '@mui/material';



function AvatarHead({name,arabdata,data}) {
  // eslint-disable-next-line no-unused-vars
  const [loadingBar,setLoading] = useState(60)
  // there are 11 keys like legal documents... and 32 sub keys like paid, cv passport
  console.log(arabdata)
let number = 0 
  for(let keyss in data){  
    if(typeof(data[keyss])=='object'){
      for(let subdata in data[keyss]){
        if(data[keyss][subdata]!='s3://None' && data[keyss][subdata]!='tx://None' && data[keyss][subdata]!=false){
          // console.log(subdata,':', data[keyss][subdata])
          number+=3.125
        }

      }
    }
  }



  return (
    <>  
    <Paper elevation={3} sx={{borderRadius:'20px',mb:3}}>

      <Box sx={{bgcolor:"",mb:0,borderRadius:'20px'}}>   


        {/* <Stack direction="row" spacing={0} alignItems="center" sx={{p:2}} > */}

          <Grid2 container sx={{p:2}}>
              <Grid2 size={2} sx={{backgroundColor:''}}>
                <Avatar sx={{width:{xs:80,sm:100},height:{xs:80,sm:100}}}>
                    <Typography variant="h2">{name.toLocaleUpperCase()[0]}</Typography>
                </Avatar>

              </Grid2>


              <Grid2 size={10} sx={{backgroundColor:'',pt:1}}>
                <Box sx={{pl:{xs:6,sm:3,md:4,lg:2}, width:"1000px"}}>
                    <Typography variant='h4'> {name.toLocaleUpperCase()} </Typography>
                    <Typography sx={{ml:3,opacity:0.7}}>Arab: {arabdata.name}</Typography>
                    {/* <Typography sx={{ml:3,opacity:0.7}}>Country: {arabdata.country.name == 'undefined'? 'none':arabdata.country.name}</Typography> */}
                    </Box>
                    <Box sx={{scale:'200%',mr:5}}>
                    {/* <CircularProgress variant='determinate' value={loadingBar}/> */}
                </Box>

              </Grid2>


          </Grid2>


        {/* </Stack> */}

          <Box>
          <LinearProgress variant='determinate' value={number} sx={{height:'20px',zIndex:'1',border:'10px 3px solid rgba(255,255,255,1)', borderRadius:'0 0 20px 20px'}} />
          </Box>
      </Box>
      

    </Paper>
    </>
  )
}

export default AvatarHead  