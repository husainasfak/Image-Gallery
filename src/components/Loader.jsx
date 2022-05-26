import React,{useRef,useEffect} from 'react'
import Loading  from '../assets/loading.svg';
import { gsap } from "gsap";
import styled from 'styled-components';
const Loader = ({loadingText}) => {
     const loadAnimate = useRef()
     useEffect(() => {
          gsap.to(loadAnimate.current, {rotation: "+=360",repeat:-1 });
     });
  return (
    <Wrapper>
       
          <img src={Loading} ref={loadAnimate}/>
        
         
          <h3>{loadingText}</h3>
         
    </Wrapper>
  )
}
const Wrapper = styled.div`
    margin: 2rem auto;
    text-align: center;

`
export default Loader