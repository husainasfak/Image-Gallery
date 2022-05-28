import React from 'react'
import styled from 'styled-components';
import { Header,GalleryLayout, Loader } from '../components';
import { useFetchImgContext } from '../context/fetchImgContext';
import {useSearchImgContext} from '../context/searchImgContext';
const Home = () => {
  const {images,isLoading} = useFetchImgContext();
  const {searchQuery,searchedImages,tags} = useSearchImgContext()
  return (
    <Wrapper>
      <Header/>
      {isLoading && <Loader/>}
      {
        searchQuery ==='' ? <GalleryLayout items={images} searchTerm=''/> : <GalleryLayout items={searchedImages} searchTerm={searchQuery} tags={tags}/>
      }
      
      
    </Wrapper>
  )
}
const Wrapper = styled.section`
`;
export default Home