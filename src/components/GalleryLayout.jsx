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

const GalleryLayout = ({items,searchTerm,tags}) => {

     const observer = useRef()
     const {updateCurrentPage,isLoading,currentPage} = useFetchImgContext()
     const {updateCurrentSearchPage,searchQuery,currentSearchPage,updateSeachQuery} = useSearchImgContext()
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

     const handleTagSearch = (tag) =>{
          updateSeachQuery(tag)
     }
     return (
          <Wrapper>
               {searchTerm !=='' ? <h1 className='searchTerm'>{searchTerm}</h1> : null}
               
               <div className="tags">
               {tags && tags?.map((tag,index)=><li onClick={(e)=>{
                    e.preventDefault()
                    handleTagSearch(tag)
         }} className='tag' key={index}>{tag}</li>)}
               </div>

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
     flex-direction:column;
     .searchTerm{
          font-size:3rem;
          margin:1rem;
     }
     .masonry-grid {
          display: flex;
          width: auto;
          justify-content: space-around;
     }
          .masonry-grid_column {
               padding: 15px;
               background-clip: padding-box;
}
.tags{
    display: flex;
    flex-wrap: wrap;
    margin:1rem;
    .tag{
      background:#e2e2e2;
      padding: .6rem 1rem;
      border-radius: 5px;
      margin:.2rem;
      cursor:pointer;
      transition:all .3s ease;
      &:hover{
        background:#dddcdc;
      }
    }
  }
`
export default GalleryLayout