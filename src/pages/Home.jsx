import React,{useEffect} from 'react'
import styled from 'styled-components';
import { Header,GalleryLayout } from '../components';
import { useFetchImgContext } from '../context/fetchImgContext';
import {useSearchImgContext} from '../context/searchImgContext';
const Home = () => {
  const {images,isLoading} = useFetchImgContext();
  const {searchQuery,searchedImages} = useSearchImgContext()
  return (
    <Wrapper>
      <Header/>
      {
        searchQuery ==='' ? <GalleryLayout items={images}/> : <GalleryLayout items={searchedImages}/>
      }
      
      {isLoading && 'Loading'}
    </Wrapper>
  )
}
const Wrapper = styled.section`
`;
export default Home