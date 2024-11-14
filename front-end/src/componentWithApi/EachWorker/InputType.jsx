/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Box, FormControl, FormControlLabel, FormLabel, Grid2, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import CamelToSpaces from "../../components/CamelToSpaces"
import CloudUpload from '@mui/icons-material/CloudUpload'

function InputType(props) {
    const [data] = useState(props.data)
    const dialogData = props.dialogData
    // eslint-disable-next-line no-unused-vars
    const [message,setMessage] = useState('click or Drag and drop files')
    const v =props.v
    const i = props.i
    const inData = (Object.keys(data[dialogData])[i])
    // const handleChange = props.onChange
    // const formData = props.formData
    const formik = props.formik

    // const handleFileChange = (e)=>{
    //   console.log(e.target.value)
    // }

    function handleDrop(e){
      e.preventDefault();
      formik.setFieldValue(Object.keys(data[dialogData])[i], e.dataTransfer.files[0])
      setMessage(e.dataTransfer.files[0].name)
    }

    function handleDragOver(e){
      e.preventDefault();
      // console.log(e.target.files,'files')
      // console.log('dragover')
    }


if (typeof((data[dialogData])[v])=="boolean") {
    return (
      <>
    
    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
        <InputLabel id="dropdown-label">
        {/* {inData} */}
        <CamelToSpaces text ={inData} />
        </InputLabel>
        <Select name={Object.keys(data[dialogData])[i]} 
          labelId="dropdown-label"
          id="dropdown"
          value={formik.values[v]}
          onChange={formik.handleChange}
          label={<CamelToSpaces text ={inData} />}
        >
          <MenuItem value={true}>YES</MenuItem>
          <MenuItem value={false}>NO</MenuItem>
        </Select>
      </FormControl>
      
    
      </>
    )
}


//file input
else if((data[dialogData])[v].slice(0,5)=="s3://"){
  return(<>
    {/* <Typography variant="h5" sx={{display:"inline",mr:2}}>{Object.keys(data[dialogData])[i]}:</Typography> */}
    <label htmlFor={Object.keys(data[dialogData])[i]} onDrop={handleDrop} onDragOver={handleDragOver}>
        <Box sx={{p:0,
                  backgroundColor:'#f2f2f2',
                  border:'1px dashed blue',
                  cursor:'pointer'}}>

        <Grid2 container>
            <Grid2 size={{sm:2,md:3}} sx={{bgcolor:"",padding:'1% 3%'}}>
                <CloudUpload />
            </Grid2>

            <Grid2 size={{sm:10,md:8}} sx={{bgcolor:''}}>
              <Typography variant="h5">Upload {Object.keys(data[dialogData])[i]}</Typography>
              {/* <Typography>{message}</Typography> */}
            </Grid2>
        </Grid2>
        </Box>
        </label>
    <Input type="file" id={Object.keys(data[dialogData])[i]} name={Object.keys(data[dialogData])[i]} 
            onChange={e=>formik.setFieldValue(Object.keys(data[dialogData])[i], e.target.files[0])}
            sx={{display:'none'}}
            />

  
    
  </>)
}

else if(typeof((data[dialogData])[v])=="string"){
  // console.log(formik.values)
    return(<>
        {/* <TextField label={(Object.keys(data[dialogData])[i])} onChange={(e)=>handleChange(e,v)}  name={Object.keys(data[dialogData])[i]} fullWidth/> */}
        <TextField label={(Object.keys(data[dialogData])[i])} 
                   name= {Object.keys(data[dialogData])[i]} fullWidth 
                   onChange={e=>formik.setFieldValue(Object.keys(data[dialogData])[i], e.target.value)}
                   />
    </>
    
    )
}


}

export default InputType