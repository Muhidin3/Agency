import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import App from './chatgpt/App2.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'




const theme = createTheme({
  palette:{
    primary:{
      main:"#001F3F", //dark blue,
      light:"#DBE2EF",
      dark:'#F9F7F7'
    },
    secondary:{
      main:"#3F72AF", //light blue
    },
    
    text:{
      main:"#DBE2EF",
      primary:"#001F3F",
      secondary:'#5f5f5f'
    }

  
  },
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ThemeProvider theme={theme}>
  <BrowserRouter>
    <App />

  </BrowserRouter>
  </ThemeProvider>
  </StrictMode>,
)
