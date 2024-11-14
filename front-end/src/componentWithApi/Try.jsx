import { Box, Button} from "@mui/material"
import { useSnackbar } from "../components/SnackbarContext"


function Try() {
  const showSnackbar = useSnackbar();
  
  function handleClick(){
    showSnackbar('this is message','error')
  }



  return (
    <>
    <Box >
      <Button variant="contained" onClick={handleClick} >Show</Button>
    </Box>
    </>
  )
}

export default Try