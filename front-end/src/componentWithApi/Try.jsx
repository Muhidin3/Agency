/* eslint-disable no-unused-vars */
import { Button, FormControl, Input, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import InputType from "./EachWorker/InputType"

function Try() {
  return(<>
    <Typography variant="h1">The Input</Typography>
    {/* <FormControl >
      <Input type="file"></Input>
    </FormControl> */}

    {/* <form action="http://localhost:4000/try" method="post" encType="multipart/form-data">
      
      <input type="file" name="file"/>
      <br/>
      <br/>
      <button type="submit">Submit</button>
    </form> */}

    <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              
              <TableCell width={"100px"} sx={{border:0}}>

              <form action="http://localhost:4000/try" method="post" encType="multipart/form-data">
              
              <Input type="file" name="file" />
              <Input type="text" name="name" placeholder="name"/>
              <Input type="text" name="id" placeholder="id"/>
              <Button type="submit" variant="outlined">Submit</Button>
              
              </form>
              </TableCell>

            </TableRow>
          </TableBody>
        </Table>
    </TableContainer>

  </>)
}

export default Try