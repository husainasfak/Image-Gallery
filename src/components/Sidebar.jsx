import React from 'react'
import styled from 'styled-components'
import {useAppConfigContext} from '../context/appConfigContext';
import {MdCancel} from 'react-icons/md'
import {ReactComponent as Logo} from '../assets/logo.svg';
import {ReactComponent as LogoLight} from '../assets/logo-light.svg';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DarkModeSwitch from './DarkModeSwitch';
import { Link } from 'react-router-dom';
const Sidebar = () => {

const { isSidebarOpen,closeSidebar,changeTheme,theme} = useAppConfigContext();
const handleThemeChange = () =>{
  changeTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme')
  closeSidebar()

}

  return (
    <SidebarContainer>
           <div className={`${isSidebarOpen?'sidebar show-sidebar':'sidebar'} ${theme==='dark-theme'?'sidebar-dark':''}`}>
              <div className='sidebar-header'>
              <Link to = '/' className='logo'>
                {theme==='dark-theme'? <LogoLight onClick={closeSidebar}/> : <Logo onClick={closeSidebar}/>}

              </Link>

             
                  <MdCancel color='#c0392b' fontSize={30} cursor="pointer"
                  onClick={closeSidebar}
                  />
                
              </div>
              
              <div className="sidebar-links">
                <div className='mode'>
      <FormGroup>

      <FormControlLabel
        control={<DarkModeSwitch onChange={handleThemeChange} checked={theme === 'dark-theme'}  />}
      />

      </FormGroup>
      </div>
              <Link to='/explore' className={`link ${theme==='dark-theme'?'link-dark':""}`} onClick={closeSidebar}>
          Explore
          
        </Link>

        <Link to='/collection' className={`link ${theme==='dark-theme'?'link-dark':""}`} onClick={closeSidebar}>
          Collection
        </Link>

        <Link to='/community' className={`link ${theme==='dark-theme'?'link-dark':""}`} onClick={closeSidebar}>
          Community
        </Link>
              </div>
           </div>
    </SidebarContainer>
 
  )
}
const SidebarContainer = styled.div`
  .sidebar {
    position: fixed;
    box-shadow:0 2px 6px rgba(0,0,0,0.4);
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    background: #fff;
    transition: .5s all ease;
    transform: translate(300%);
    z-index: -1;


  }
  .show-sidebar {
    transform: translate(45%);
    z-index: 999;
  }
  .sidebar-dark{
    background: #000;
  }
  .sidebar-header{
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding: 1rem;
  }
  .sidebar-links{
    padding: 1rem;
    display: flex;
    flex-direction: column;
   
    
    .link{
      margin: .5rem 0;
      padding: .7rem;
      transition: all .5s ease;
      &:hover{
        background:#e2e2e2;
      }
    }
    .link-dark{
      color:#fff;
      &:hover{
        background:#1c1c1c;
      }
    }
  }
  .mode{
    padding: .7rem;
  }
`
export default Sidebar;