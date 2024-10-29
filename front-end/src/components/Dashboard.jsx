import { Box, Button, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"


function Dashboard() {
    const navigate = useNavigate()
  return (
    <>
          <Box width={"100%"}>
        <Paper sx={{width:"40%",p:2,pr:4,borderRadius:"20px"}} elevation={10} >

          <Typography variant="h4">List Of Arabs</Typography>
          
          <Button size='large' variant='contained' onClick={()=>navigate('/arabs')} sx={{m:2}} fullWidth>Arabs</Button>
          
        </Paper>

        <Paper sx={{width:"40%",p:2,mt:2,borderRadius:"20px"}} elevation={14}>

          <Typography variant="h4">Recent workers</Typography>
         <Button size='large' variant='contained' onClick={()=>navigate('/recentWorkers')} fullWidth>Recent Workers</Button>

        </Paper>
          </Box>


         
         {/* <Button onClick={()=>navigate('/try')}>Try</Button> */}
    </>
  )
}

export default Dashboard