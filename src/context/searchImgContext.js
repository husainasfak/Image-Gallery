import React, { useContext, useEffect, useReducer } from 'react'
import searchImgReducer from '../reducers/searchImgReducer';
import { FETCH_IMG_AFTER_SEARCH,FETCH_IMG_BEGIN,FETCH_IMG_ERROR,CURRENT_PAGE,UPDATE_SEARCH_QUERY } from '../action';
import axios from 'axios';
const initialState = {
     isLoading:false,
     serchedImages:[],
     imgFetchError:false,
     searchQuery:'',
     currentSearchPage:1,
     endPoint:'search/photos',
     
}
const SearchImgContext = React.createContext();

export const SearchImgProvider = ({children}) =>{
     const [state,dispatch] = useReducer(searchImgReducer,initialState);

    const updateCurrentSearchPage = (page) =>{
          dispatch({type:CURRENT_PAGE,payload:page})
     }
     const updateSeachQuery = (term) => {
          dispatch({type:UPDATE_SEARCH_QUERY,payload:term})
     }
     useEffect(()=>{
          dispatch({type:FETCH_IMG_BEGIN});
          let source = new axios.CancelToken.source();
          let cancelReq = source.token
          axios({
               method:'get',
               baseURL:`https://api.unsplash.com/${state.endPoint}`,
               headers:{'Authorization': `Client-ID ${process.env.REACT_APP_UNSPLASH_SECRET_KEY}` },
               params:{query:state.searchQuery,page:state.currentPage},
               cancelToken:cancelReq,
          }).then(response=>{
               dispatch({type:FETCH_IMG_AFTER_SEARCH,payload:response.data.results})
               
          }).catch(err=>{
               dispatch({type:FETCH_IMG_ERROR})
          })
          return ()=> source.cancel('clean')
     },[state.currentSearchPage,state.searchQuery])

     return (
          <SearchImgContext.Provider value={{...state,updateCurrentSearchPage,updateSeachQuery}}>
               {children}
          </SearchImgContext.Provider>
     )
}


// make custom hook for easy access of context
export const useSearchImgContext = () => {
     return useContext(SearchImgContext)
}


