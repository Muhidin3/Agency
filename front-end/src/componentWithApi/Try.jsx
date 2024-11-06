/* eslint-disable no-unused-vars */
import { Button, FormControl, Input, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useFormik } from 'formik'
// import InputType from "./EachWorker/InputType"

function Try() {
  const [file,setFile]= useState([])
  const [text,setText]= useState({})

  const formik = useFormik({
    initialValues:{
      name:'',
      id:"",
      file1:'',
      file2:''
    },
    onSubmit:async (values)=>{
      const formdata = new FormData()
      formdata.append('name',values.name)
      formdata.append('id',values.id)
      formdata.append('file1',values.file1)
      formdata.append('file2',values.file2)
      
      await axios.post("http://localhost:4000/try",formdata).then(res=>{}).catch(er=>console.log(er))
      console.log(values)
      
    }
  })

  async function handleSubmit(e){

    const formData = 
    
    formData.append('cv',file[0])
    formData.append('pass',file[1])
    formData.append('name','muhidin')
    formData.append('lname','shemsu')

    await axios.post("http://localhost:4000/try",formData)
    .then(res => {})
    .catch(er=>console.log(er))  
    console.log('m')

    

  }
  function handleChange(e,n){
    setText((prev)=>({...prev,[n]:e.target.value}))  
  }
  function handlFileChange(e) {
    setFile((prev)=>([...prev,e.target.files[0]]))
    console.log(file)
  }

  function see() {
    const dta = new FormData()
    Object.keys(text).map((v,i)=>{
      dta.append('aa',text[v])
      console.log(dta)
    })
    
  }
  // console.log(formik.values)
  
  return(<>
    <Typography variant="h1">The Input</Typography>
      
      <form onSubmit={formik.handleSubmit} 
      encType="multipart/form-data"
      >
      <Input type="file" name="file1" onChange={(e=>formik.setFieldValue('file1', e.target.files[0]))} /><br/><br/>

      <Input type="file" name="file2" onChange={(e=>formik.setFieldValue('file2', e.target.files[0]))} /><br/><br/>

      <TextField type="text" label='name' name="name"  onChange={formik.handleChange} value={formik.values.name}/>
      <TextField type="text" name="id" label="id" onChange={formik.handleChange} value={formik.values.id}/>
      <Button type="submit" variant="outlined">Submit</Button>
      <Button variant="outlined" onClick={see}>See</Button>


      </form>


    
             

  </>)
}

export default Try