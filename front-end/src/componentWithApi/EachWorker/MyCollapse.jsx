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
                            <TableCell sx={{width:"100%"}}>
                                <Typography>
                                <CamelToSpaces text={keyValue}/>
                                {/* {keyValue} */}
                                : </Typography>
                            </TableCell>
                            <TableCell>
                            {data[keyValue]==null?'none':data[keyValue]==false?'false':data[keyValue]==true?'true':data[keyValue]}
                                {/* <Typography>a</Typography> */}
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