import React,{useEffect} from 'react';
import {Home,Explore,Collection,Community} from './pages';
import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import { NavBar,Sidebar } from './components';
import { useAppConfigContext } from './context/appConfigContext';


const App = () =>{
  const {theme} = useAppConfigContext();
  useEffect(()=>{
   
      // document.documentElement.className = theme
    document.body.className = theme
    
  },[theme])
  return (
    <Router>
      <NavBar/>
      <Sidebar/>

     <>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/explore' element={<Explore/>}/>
        <Route exact path='/collection' element={<Collection/>}/>
        <Route exact path='/community' element={<Community/>}/>
      </Routes>
     </>
    </Router>
  );
}

export default App;
