import { createContext, useContext,useState } from "react";
import Snackbar from '@mui/material/Snackbar'
import { Alert } from "@mui/material";


const SnackbarContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = ()=>{
    return useContext(SnackbarContext);
};

// eslint-disable-next-line react/prop-types
export const SnackbarProvider = ({children})=>{
    const [snackbar,setSnackBar]= useState({open:false,message:'',severity:'info'});
    const showSnackbar =(message,severity='info')=>{
        setSnackBar({open:true,message,severity})
    };
    const handleClose = ()=>{
        setSnackBar({...snackbar,open:false})
    };
    return(
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <Snackbar open={snackbar.open} 
                      autoHideDuration={5000}
                      onClose={handleClose}
                      anchorOrigin={{vertical:"top",horizontal:'center'}}>
                <Alert onClose={handleClose} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};