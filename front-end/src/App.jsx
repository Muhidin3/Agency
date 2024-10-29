/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Typography,List,ListItem,ListItemText,ListItemIcon } from '@mui/material';
import {Grid} from '@mui/material';
import Header from './components/Header';
// import DashBoard from './components/dashboard';
import RecentWorkers from './componentWithApi/RecentWorkers';
import Try from './componentWithApi/try';
import EachWorker from './componentWithApi/EachWorker';
import { Route, Router,Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Arabs from './componentWithApi/Arabs';
import Workers from './components/Workers';



function App() {
  return (
    <>
    <Header/>
    <Container >
    <Routes>
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/recentWorkers' element={<RecentWorkers/>}></Route>
      <Route path='/eachWorker/:id' element={<EachWorker />}></Route>
      <Route path='/try' element={<Try />}></Route>
      <Route path='/arabs' element={<Arabs />}></Route>
      <Route path='/workers/:id' element={<Workers/>}/>
    </Routes>
    
   </Container> 
    </>
    
  )
}

export default App;