import React, { useContext, useEffect, useReducer } from 'react'
import fetchImgReducer from '../reducers/fetchImgReducer';
import { FETCH_IMG,FETCH_IMG_BEGIN,FETCH_IMG_ERROR,CURRENT_PAGE } from '../action';
import axios from 'axios';
const initialState = {
     isLoading:false,
     images:[],
     imgFetchError:false,
     currentPage:1,
     endPoint:'photos',
     
}
const FetchImgContext = React.createContext();

export const FetchImgProvider = ({children}) =>{
     const [state,dispatch] = useReducer(fetchImgReducer,initialState);

    const updateCurrentPage = (page) =>{
          dispatch({type:CURRENT_PAGE,payload:page})
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
               dispatch({type:FETCH_IMG,payload:response.data})
               
          }).catch(err=>{
               dispatch({type:FETCH_IMG_ERROR})
          })
          return ()=> source.cancel('clean')
     },[state.endPoint,state.currentPage,state.searchQuery])

     return (
          <FetchImgContext.Provider value={{...state,updateCurrentPage}}>
               {children}
          </FetchImgContext.Provider>
     )
}


// make custom hook for easy access of context
export const useFetchImgContext = () => {
     return useContext(FetchImgContext)
}


