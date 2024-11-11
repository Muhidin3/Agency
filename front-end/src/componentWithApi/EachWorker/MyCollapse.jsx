/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Collapse, Dialog, DialogTitle, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import CamelToSpaces from "../../components/CamelToSpaces";
import { Box } from "@mui/system";

function MyCollapse({data,collapse,handleClick}) {
    let a =[]
    for(let key in data){
        a.push(key)
    }


    function ShowFile(p) {
        if (p!=null && p!=undefined) {
            // console.log(p.text)

            if (data[p.text]!=false && data[p.text]!=true ) {
                
                if((data[p.text]).slice(0,5)=='s3://'){
                    // console.log(data[p.text])
                    if ((data[p.text]).slice(5).length > 5) {

                        return(<><Box onClick={()=>handleClick(data[p.text])}>
                                    <Link sx={{cursor:'pointer',color:'darkgreen'}}>see the file</Link>
                                  </Box></>)
                        
                    } else {
                        return(<p style={{color:'brown'}} >File not uploaded</p>)
                    }


                }else{//textdata
                    return(<p>{(data[p.text]).slice(5)}</p>)
                }
                
            }else{//for boolean
                return(<p>{data[p.text]==false?
                    '---':data[p.text]==true?
                    'Yes':(data[p.text]).slice(5)
                }</p>)
            } 


        }else{
            return(<p>undefined</p>)
        }
    }
    ShowFile()
  return (
    <>
        {a.map((keyValue,keyIndex)=>{

            
            return(
                <Collapse key={keyIndex}
                        in={collapse}
                        >
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography>
                                <CamelToSpaces text={keyValue}/>
                                {/* {keyValue} */}
                                : </Typography>
                            </TableCell>
                            <TableCell> 
                            <ShowFile text ={keyValue}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                

                </Collapse>
            )
            

        })}
        
        
    </>
    )
}

export default MyCollapse