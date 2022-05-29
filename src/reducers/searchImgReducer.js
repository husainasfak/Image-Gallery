import {FETCH_IMG_BEGIN,FETCH_IMG_ERROR,CURRENT_PAGE,UPDATE_SEARCH_QUERY, FETCH_IMG_AFTER_SEARCH,TAGS } from '../action';


const searchImgReducer = (state,action) =>{
     switch(action.type){
          case FETCH_IMG_BEGIN:
               return {...state,isLoading:true}
          case FETCH_IMG_AFTER_SEARCH:
               return {...state, searchedImages:[...state.searchedImages,action.payload],isLoading:false,imgFetchError:false}
          case FETCH_IMG_ERROR:
               return{...state,imgFetchError:true,isLoading:false}
          case CURRENT_PAGE:
               return {...state,currentSearchPage:action.payload}
          case UPDATE_SEARCH_QUERY:
               state.searchedImages = []
               if(state.searchQuery !== action.payload){
                    state.currentSearchPage = 1;
               }
               return {...state,searchQuery:action.payload}
          case TAGS:
               return {...state,tags:[...new Set(action.payload)]}
          default:
               return state
     }
}
export default searchImgReducer