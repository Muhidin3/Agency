/* eslint-disable react/prop-types */
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import MyLoading from './MyLoading'
import { useSnackbar } from '../../components/SnackbarContext'

function MyDelete({id,loading,name,isarab=false}) {
    const url = import.meta.env.VITE_HOST
    const [dialog,setDialog] = useState(false)
    const [dialogloading,setLoading] = useState(false)
    const showSnack = useSnackbar();

    async function handleClick(){
        setLoading(true)
        try {
            if(isarab){
                const res = await axios.delete(`${url}api/arabs/${id}`)
                // console.log('deleted',res.data)
                showSnack(res.data,'info')
                loading(true)
            }
            else{
                const res = await axios.delete(`${url}api/workers/${id}`)
                // console.log('deleted',res.data)
                showSnack(res.data)
                loading(true)
            }

            
        } catch (error) {
            console.log('connection error',error.message)
            showSnack('Error deleting worker','error')
        }
        loading(false)
        setLoading(false)

    }


  return (
    <>
        <DeleteIcon sx={{cursor:'pointer',
                         ':hover':{
                            scale:1.2
                         }}}
                    onClick={()=>setDialog(true)}
                         />
        <Dialog open={dialog}>

            <DialogTitle sx={{bgcolor:'primary.main',color:'white',mb:3}}>
                <Typography variant='h4'>Delete Worker</Typography>
            </DialogTitle>
            <DialogContent >
                    <Typography sx={{display:dialogloading?'none':'block'}} variant='h5'>Delete {name}?</Typography>
                    <Box sx={{display:dialogloading?'block':'none',margin:'auto 40% auto 40%'}}>
                    <MyLoading />

                    </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setDialog(false)} variant='outlined'>cancel</Button>
                <Button  variant='contained' sx={{backgroundColor:'red'}} onClick={()=>handleClick()}>Delete</Button>
            </DialogActions>
        </Dialog>
        
    </>
  )
}

export default MyDelete