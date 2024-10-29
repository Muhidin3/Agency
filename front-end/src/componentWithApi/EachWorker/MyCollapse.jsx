/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

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
                            <TableCell>
                                <Typography>{keyValue}:{data[keyValue]==null?'none':data[keyValue]==false?'false':data[keyValue]==true?'true':data[keyValue]} </Typography>
                            </TableCell>
                            <TableCell >
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