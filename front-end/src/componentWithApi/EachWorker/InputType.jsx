/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { FormControl, FormControlLabel, FormLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import CamelToSpaces from "../../components/CamelToSpaces"
function InputType(props) {
    const [data] = useState(props.data)
    const dialogData = props.dialogData
    const v =props.v
    const i = props.i
    const inData = (Object.keys(data[dialogData])[i])
    // const handleChange = props.onChange
    // const formData = props.formData
    const formik = props.formik

    // const handleFileChange = (e)=>{
    //   console.log(e.target.value)
    // }


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


else if((data[dialogData])[v].slice(0,5)=="s3://"){
  return(<>
    <Typography variant="h5" sx={{display:"inline",mr:2}}>{Object.keys(data[dialogData])[i]}:</Typography>
    <Input type="file" name={Object.keys(data[dialogData])[i]} 
            onChange={e=>formik.setFieldValue(Object.keys(data[dialogData])[i], e.target.files[0])}/>

  
    
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