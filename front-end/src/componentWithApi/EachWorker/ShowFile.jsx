/* eslint-disable react/prop-types */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import MyLoading from './MyLoading'

// eslint-disable-next-line no-unused-vars
import image from 'c:/Users/HP/Documents/Export/Photos/smile walpaper.png'


// eslint-disable-next-line react/prop-types
function ShowFile({state,title,url,handleClick}) {
    //const [istate,setIstate] = useState(state)
    const [imgurl,setImgurl] = useState('')
    const hosturl = import.meta.env.VITE_HOST
    const id = url.slice(5)

    useEffect(()=>{
        async function fetchdata() {
            if (id == '') {
                return
            }
            try {
                const res = await axios.get(hosturl+'api/getfile/'+ id)
                setImgurl(res.data)
                // console.log(res.data)
            } catch (error) {
                console.log('error happend fetching the file',error.message)
                return
            }
            
        } 
        fetchdata()
    },[id])


  return (
      <Dialog open={state} sx={{backgroundColor:'rgba(255,255,255,0.1)',backdropFilter:'invert(3%)'}}>
        <DialogTitle >
            <Typography>{title}</Typography>
        </DialogTitle>
        
        <DialogContent >
        {imgurl==''?
                <Box sx={{position:"fixed",left:'48%',top:'47%'}}><MyLoading/></Box>:    
            <img alt="image of the file" src={imgurl} width={500}/>
        }

            {/* <img alt="image of the fileeeee" src={image} width={500} /> */}
        </DialogContent>

        <DialogActions>
            <Button variant="contained" onClick={()=>handleClick('')}>close</Button>
        </DialogActions>
      </Dialog>
    )
}

export default ShowFile