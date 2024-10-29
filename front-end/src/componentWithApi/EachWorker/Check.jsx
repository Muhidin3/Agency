/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';


function Check({data,keyI,keyV}) {
    // data={data} keyI={keyIndex} keyV={keyValue}

    const keys = Object.keys(data[keyV])  // array of keys i.e [cv,passport,id]
    // const [state,setState] = useState(keys.map(()=>false))
    const state = (keys.map(()=>false))

    // console.log(keys)


    function handleChange(i) {
            state[i] = true
    }
    keys.map((v,i)=>{

        if (typeof(data[keyV][v])=='boolean') {
            if (data[keyV][v] == true) {
               handleChange(i)
                // console.log(`yes`)
            }
        }
        else{
            if (data[keyV][v]!='None') {
                handleChange(i)
            }
        }
        
        // console.log(v,':',data[keyV][v])
        // console.log(state)
    })

    // console.log(state)
    let checktrue = state.every((v)=>v==true)
    // console.log("checktrue:",checktrue)
    
if (checktrue) {
    return (
      <>
          {/* <CloseIcon sx={{position:"relative",top:7}}/> */}
          <CheckIcon sx={{position:"relative",top:7,color:'green'}}/>
      </>
    )
    
} else {
    return (
      <>
          <CloseIcon sx={{position:"relative",top:7,color:'red'}}/>
          {/* <CheckIcon sx={{position:"relative",top:7}}/> */}
      </>
    )
    
}
}

export default Check