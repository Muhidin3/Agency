/* eslint-disable no-unused-vars */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import MyCollapse from "./MyCollapse"
import { useState } from "react"
import { borderRadius } from "@mui/system"
import MyDialog from "./MyDialog"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Check from "./Check"

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
  

 async function abc(keyIndex) {
  return 'none'
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
              <TableRow sx={{ cursor: "pointer", ":hover": { bgcolor: "wheat" },borderTop:'1px solid rgba(224, 224, 224, 1)' }}>
                <TableCell onClick={() => handleToogle(keyIndex)} sx={{width:'70%'}}>
                <Stack direction={"row"}>

                {/* <KeyboardArrowRightIcon sx={{width:'6%',marginTop:"5px"}}/> */}

                <Typography variant="h6" sx={{borderRight:'1px solid',width:"100%"}}>
                {keyValue}
                </Typography>

                </Stack>
              </TableCell>

                <TableCell>
                  <Check data={data} keyI={keyIndex} keyV={keyValue}/>
                  <Button variant="text" onClick={() => handleClick(keyValue)}>Change</Button>
                </TableCell>
              </TableRow>

              <TableRow sx={{display:display[keyIndex]?'block':'none'}}>
              <TableCell size="small" sx={{borderBottom:0}}>
                <MyCollapse data={data[keyValue]} collapse={collapse[keyIndex]} />
              </TableCell>

              </TableRow>
            </TableBody>

          ))}



        </Table>
      </TableContainer>

                <Dialog open={dialog}
                        PaperProps={{sx:{borderRadius:'20px',p:2}}}>
                  <DialogTitle>{dialogData}</DialogTitle>
                    <MyDialog diagData={dialogData} data={data} id={prop.id} dialog={dialog} setDialog={setDialog}/>  
                </Dialog>
    </>
  )
}

export default MyTable