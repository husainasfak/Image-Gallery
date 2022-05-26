import React,{useRef,useCallback} from 'react'
import Masonry from 'react-masonry-css';
import ImageCard from './ImageCard'
import styled from 'styled-components';
import { useFetchImgContext } from '../context/fetchImgContext';
import { useSearchImgContext } from '../context/searchImgContext';
const breakpointColumns = {
     default: 3,
     1100: 2,
     500: 1
   };

const GalleryLayout = ({items}) => {
     
     const observer = useRef()
     const {updateCurrentPage,isLoading,currentPage} = useFetchImgContext()
     const {updateCurrentSearchPage,searchQuery,currentSearchPage} = useSearchImgContext()
     const lastImage = useCallback(node=>{
          if(isLoading) return
          if (observer.current) observer.current.disconnect()
          observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
               if(searchQuery === ''){
                    updateCurrentPage(currentPage+1)
               }else{
                    updateCurrentSearchPage(currentSearchPage+1)
               }
            }
          })
          if (node) observer.current.observe(node)
     },[isLoading])
     return (
          <Wrapper>
          <Masonry className="masonry-grid" breakpointCols= {breakpointColumns} columnClassName="masonry-grid_column">
               {items?.map((item)=>{
                    return item.map((currentPageItem,index)=>{
                         if(item.length ===index + 1){
                              return <ImageCard ref={lastImage} key={currentPageItem.id} img={currentPageItem} />
                          }else{
                              return <ImageCard key={currentPageItem.id} img={currentPageItem} />
                          }
                    })
                    
               })}
    
          </Masonry>
     </Wrapper>
       )
}

const Wrapper = styled.section`
     display: flex;
     justify-content: center;
     .masonry-grid {
          display: flex;
          width: auto;
          justify-content: space-around;
     }
          .masonry-grid_column {
               padding: 15px;
               background-clip: padding-box;
}
`
export default GalleryLayout