/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import CamelToSpaces from "../../components/CamelToSpaces";

function MyCollapse(props) {
    const data = props.data
    const collapse = props.collapse
    
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
                    return(<h4>see the file</h4>)
                }else{
                    return(<p>{(data[p.text]).slice(5)}</p>)
                }

            }else{
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
                            {/* {data[keyValue]==false?'-':data[keyValue]==true?'Yes':(data[keyValue]).slice(5)} */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                

                </Collapse>
            )
            

        })}
        {/* {showData()} */}
    </>
    )
}

export default MyCollapse