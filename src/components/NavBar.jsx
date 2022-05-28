import React,{useState} from 'react'
import styled from 'styled-components'
import {ReactComponent as Logo} from '../assets/logo.svg';
import {FiSearch} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import Search from './Search';
import { Link } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DarkModeSwitch from './DarkModeSwitch';
import { useMediaQuery } from 'react-responsive'
import {useAppConfigContext} from '../context/appConfigContext';


const NavBar = () => {
  const [openSearch,setOpenSearch] = useState(false)
  const{openSidebar,changeTheme} = useAppConfigContext()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1200px)'
  })

 
  const NavSmallDevice = () =>{
    return (<Wrapper>
      <Link to = '/' className='logo'>
        <Logo/>
      </Link>
      <div className='links'>
        <FiSearch className='search' onClick={()=>setOpenSearch(!openSearch)}/>
        <GiHamburgerMenu className='menu' onClick={openSidebar}/>
      </div>
     {openSearch &&  <div className='search-section' >
      <Search place='nav' placeHolder='Search Images here'/>
      </div>}
    </Wrapper>)
  }
  const NavLargeDevice = () =>{
 return  (<Wrapper>

      <Link to='/' className='logo'>
        <Logo/>
      </Link>
  
      <div className='main-nav'>

        
        <div>
        <Search place='nav' placeHolder='Search Images here'/>
          
        </div>

        <div>
        <Link to='/explore' className='main-nav--link' >
          Explore
          
        </Link>

        <Link to='/collection' className='main-nav--link'>
          Collection
        </Link>

        <Link to='/community' className='main-nav--link'>
          Community
        </Link>
        </div>

      </div>
     
      <div className='mode'>
      <FormGroup>

      <FormControlLabel
        control={<DarkModeSwitch />}
      />

      </FormGroup>
      </div>

    </Wrapper>)
  }

  return (
    <>
      { isDesktopOrLaptop ? <NavLargeDevice/> : <NavSmallDevice/>}
    </>
    
  )
}

const Wrapper = styled.nav`
  display:flex;
  justify-content:space-between;
  align-items: center;
  padding: 1rem 0;
  box-shadow: 0 2px 2px -2px #000000;
  width:100%;
  .search-section{
    position:absolute;
    width:90%;
    padding:1rem;
    top:18%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:#fff;
  }
 .logo,.links{
   margin: 0 1rem ;
 }
  .search,.menu{
    font-size:2rem;
    margin: 0 .5rem;
    cursor: pointer;
  }
  .main-nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    &--link{
      margin: 0 1rem;
      padding: .7rem;
      transition: all .5s ease;
      &:hover{
        background:#e2e2e2;
      }
    }
  }
  
`

export default NavBar;