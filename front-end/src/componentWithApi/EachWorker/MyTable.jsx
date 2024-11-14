/* eslint-disable no-unused-vars */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import MyCollapse from "./MyCollapse"
import { useState } from "react"
import MyDialog from "./MyDialog"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from "./Check"
import ShowFile from "./ShowFile"
import MyDelete from "./MyDelete";

function MyTable(prop) {
  const rawdata = prop.data
  const {_id,__v,updatedAt,createdAt,name,arab,...data} = rawdata
  const keys = Object.keys(data)
  const [collapse,setCollapse] = useState(keys.map(()=>false))
  const [dialog,setDialog]=useState(false)
  const [dialogData,setDialogData] = useState("LegalDocuments")
  const [display,setDisplay] = useState(keys.map(()=>false))


  function handleToogle(key) {
      setCollapse((prevState)=>({
          ...prevState, [key]:!prevState[key]
      }))


      if (display[key]) {
        setTimeout(() => {
          setDisplay((prevState)=>({
              ...prevState, [key]:!prevState[key]
          }))
        },300);
        
      } else {
        setDisplay((prevState)=>({
            ...prevState, [key]:!prevState[key]
        }))
      }

        
  }

  
  function handleClick(key) {
      setDialog(!dialog)
      setDialogData(key)
  }
  

const [showFileState,setShowFileState] = useState(false)
const [url,setUrl] =useState('')
function handleShowFile(argurl) {
  setShowFileState(!showFileState)
  setUrl(argurl)
}
  
  return (
    <>
      <TableContainer sx={{borderRadius:'10px'}}>
        <Table>

          {/* table head */}
          <TableHead sx={{backgroundColor:'#f5f5f5',borderRadius:'10px'}}>
            <TableRow>
              <TableCell>
                <Typography sx={{borderRight:'1px solid'}}>Group</Typography>
              </TableCell>
              <TableCell>
                <Typography>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          {keys.map((keyValue,keyIndex)=>(
            <TableBody key={keyIndex}>

              {/* groups */}
              <TableRow sx={{ cursor: "pointer", ":hover": { bgcolor: "rgba(1,1,1,0.1)" },borderTop:'1px solid rgba(224, 224, 224, 1)' }}>
                <TableCell onClick={() => handleToogle(keyIndex)} sx={{width:'70%'}}>
                <Stack direction={"row"}>
                <KeyboardArrowRightIcon sx={{scale:1.2,color:'primary.main',width:'6%',marginTop:"5px",display:display[keyIndex]?'none':'block'}}/>
                <KeyboardArrowDown sx={{width:'6%',marginTop:"5px",display:display[keyIndex]?'block':'none'}}/>
                
                <Typography variant="h6" sx={{borderRight:'1px solid',width:"100%"}}>
                {keyValue}
                </Typography>

                </Stack>
              </TableCell>

                {/* Change btn */}
                <TableCell >
                  <Grid2 container>

                    <Grid2 size={{xs:4}}>
                      <Check data={data} keyI={keyIndex} keyV={keyValue}/>
                    </Grid2>

                    <Grid2 size={{xs:4}}>
                      <Button variant="text" onClick={() => handleClick(keyValue)}>Change</Button>
                    </Grid2>


                  </Grid2>
                </TableCell>

              </TableRow>

              <TableRow sx={{display:display[keyIndex]?'block':'none'}}>
              <TableCell size="small" sx={{borderBottom:0}}>
                <MyCollapse data={data[keyValue]} collapse={collapse[keyIndex]} handleClick={handleShowFile}/>
              </TableCell>

              </TableRow>
            </TableBody>

          ))}



        </Table>
        
      </TableContainer>

                <Dialog open={dialog} PaperProps={{sx:{borderRadius:'20px'}}}>
                  <DialogTitle sx={{backgroundColor:'primary.main',color:'text.main'}}>{dialogData}</DialogTitle>
                    

                    <MyDialog diagData={dialogData} data={data} id={prop.id} dialog={dialog} setDialog={setDialog}/>  
                    
                </Dialog>
          <ShowFile title={'CV'} state={showFileState} url={url} handleClick={handleShowFile}/>
    </>
  )
}

export default MyTable