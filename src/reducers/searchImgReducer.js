import {FETCH_IMG_BEGIN,FETCH_IMG_ERROR,CURRENT_PAGE,UPDATE_SEARCH_QUERY, FETCH_IMG_AFTER_SEARCH } from '../action';


const searchImgReducer = (state,action) =>{
     switch(action.type){
          case FETCH_IMG_BEGIN:
               return {...state,isLoading:true}
          case FETCH_IMG_AFTER_SEARCH:
               return {...state, searchedImages:[action.payload],isLoading:false,imgFetchError:false}
          case FETCH_IMG_ERROR:
               return{...state,imgFetchError:true,isLoading:false}
          case CURRENT_PAGE:
               return {...state,currentPage:action.payload}
          case UPDATE_SEARCH_QUERY:
               return {...state,searchQuery:action.payload}
          default:
               return state
     }
}
export default searchImgReducer