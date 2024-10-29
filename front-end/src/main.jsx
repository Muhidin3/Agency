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
      main:"#1890ff"
    },
    secondary:{
      main:"#f0f0f0"
    }
  }
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
