/* eslint-disable react/prop-types */
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function MyAlert(props) {
  const [open, setOpen] = React.useState(true);



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={props.msg}
        onClick={()=>setOpen(false)}
      />
      
    </div>
  );
}