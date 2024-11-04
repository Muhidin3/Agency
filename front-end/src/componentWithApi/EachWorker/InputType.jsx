/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material"
import { useState } from "react"
import CamelToSpaces from "../../components/CamelToSpaces"
function InputType(props) {
    const [data] = useState(props.data)
    const dialogData = props.dialogData
    const v =props.v
    const i = props.i
    const inData = (Object.keys(data[dialogData])[i])
    const handleChange = props.onChange
    const formData = props.formData



if (typeof((data[dialogData])[v])=="boolean") {
    return (
      <>
    
    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
        <InputLabel id="dropdown-label">
        {/* {inData} */}
        <CamelToSpaces text ={inData} />
        </InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          value={formData[v]}
          onChange={(e)=>handleChange(e,v)}
          label={<CamelToSpaces text ={inData} />}
        >
          <MenuItem value={true}>YES</MenuItem>
          <MenuItem value={false}>NO</MenuItem>
        </Select>
      </FormControl>
      
    
      </>
    )
}
else if(typeof((data[dialogData])[v])=="string"){
    return(<>
        <TextField label={(Object.keys(data[dialogData])[i])}
            onChange={(e)=>handleChange(e,v)}  name={Object.keys(data[dialogData])[i]} fullWidth/>

    </>

    )
}
else if(typeof((data[dialogData])[v])=="object"){
  return(<>
    data
  </>)
}



//1000295750263
//placeholder={data[dialogData][v]==false? "false" :data[dialogData][v]}



}

export default InputType