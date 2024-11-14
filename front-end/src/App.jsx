/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Typography,List,ListItem,ListItemText,ListItemIcon } from '@mui/material';
import {Grid} from '@mui/material';
import Header from './components/Header';
import RecentWorkers from './componentWithApi/RecentWorkers';
import Try from './componentWithApi/Try';
import EachWorker from './componentWithApi/EachWorker';
import { Route, Router,Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Arabs from './componentWithApi/Arabs';
import Workers from './components/Workers';
import Footer from './components/Footer';
import Country from './componentWithApi/Country';
import Arabsbycountry from './componentWithApi/Arabsbycountry';
import { SnackbarProvider } from './components/SnackbarContext';



function App() {
  return (
    <>
    <SnackbarProvider>
      <Header/>
      <Container sx={{padding:{xs:1,sm:"30px",md:10,lg:10,xl:0}}} maxWidth={'xl'} >
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/arabsbycountry/:id' element={<Arabsbycountry/>}/>
        <Route path='/country' element={<Country/>}/>
        <Route path='/recentWorkers' element={<RecentWorkers/>}></Route>
        <Route path='/eachWorker/:id' element={<EachWorker />}></Route>
        <Route path='/try' element={<Try />}></Route>
        <Route path='/arabs' element={<Arabs />}></Route>
        <Route path='/workers/:id' element={<Workers/>}/>
      
    </Routes>
    </Container> 
    <Footer/>
  </SnackbarProvider>
    </>
    
  )
}

export default App;