/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Typography,DialogContent, Box, Input, TableContainer, Table, TableRow, TableCell, TableBody, Button, TextField, DialogActions } from "@mui/material"
import { useState } from "react"
import axios from 'axios'
import InputType from "./InputType";
import { useFormik } from "formik";
import MyLoading from "./MyLoading";
import { useSnackbar } from "../../components/SnackbarContext";


function MyDialog(props) {
    const data  = props.data;
    const dialogData = props.diagData; //keys , its not array gut one key passed from parent 
    const dialog = props.dialog
    const setDialog = props.setDialog
    const [formData,setFormData]= useState(data[dialogData])
    const [formFileData,setFormFileData] = useState(data[dialogData])
    const url = import.meta.env.VITE_HOST
    const [loading,setLoading] = useState(false)
    const showSnack = useSnackbar();

    const formik = useFormik({
      initialValues:data[dialogData],

      onSubmit:async (values)=>{
        setLoading(true)
        const fd = new FormData();

        fd.append('key',dialogData);

        Object.keys(values).forEach((v)=>{
          // console.log([v],values[v])
          fd.append(v,values[v]);
        });

        for (let [key, value] of fd.entries()) {
          // console.log(key, value);
        }

        try {
          const responce = await axios.patch(`${url}api/workers/${props.id}`,fd,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          showSnack(responce.data)
          // console.log('sent to server')
          
        } catch (error) {
          // console.log('error sending the file to server',error)
          
        }
        setLoading(false)
      }
        
    })
    


      function handleChange(e,v) {

        setFormData((p)=>{return({...p,[v]:e.target.value})})


        // console.log('sended data',{[dialogData]:formData})

        
      }
      async function handleSubmit(e) {
        e.preventDefault()
        // const responce = await axios.patch(url+"api/workers/"+props.id,{[dialogData]:formData})
        // console.log('clg submitted \n ' ,{[dialogData]:formData})
      }

      if(loading){
        return(<>
        <Box sx={{p:12}}>
          <MyLoading/>
        </Box>
        </>)
      }

  
  return (
    <>
        <DialogContent>

          <Box  component="form" minWidth={"50px"} onSubmit={handleSubmit}>
            {Object.keys(data[dialogData]).map((v,i)=>{
              {/* console.log(Object.keys(data[dialogData])[i]) */}
            return(

                <TableContainer key={i}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        
                        <TableCell sx={{border:0}}>
                        

                        <InputType data={data} 
                                  dialogData={dialogData} 
                                  v={v} i={i} 
                                  onChange={handleChange} 
                                  formData={formData}
                                  formik={formik} />
                        
                        </TableCell>

                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
            )
            })}
                </Box>
            <DialogActions>
            {/* <Typography variant="subtitle2" sx={{}}> click the button below to close </Typography> */}
            <Button type="Submit" onClick={formik.handleSubmit} variant="contained">Submit</Button>
            
            <Button onClick={()=>setDialog(!dialog)} variant="outlined">Close</Button>

            </DialogActions>
        </DialogContent>
    </>
  )
}

export default MyDialog