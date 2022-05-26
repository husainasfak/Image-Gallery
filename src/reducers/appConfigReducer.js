import {SIDEBAR_OPEN,SIDEBAR_CLOSE,FETCH_HEADER_IMG,FETCH_HEADER_IMG_BEGIN, FETCH_HEADER_IMG_ERROR,CHANGE_THEME} from '../action';


const appConfigReducer = (state,action) =>{
     switch(action.type){
          case SIDEBAR_OPEN:
               return {...state,isSidebarOpen:true}
          case SIDEBAR_CLOSE:
               return {...state,isSidebarOpen:false}
          case FETCH_HEADER_IMG_BEGIN:
               return {...state,isLoading:true}
          case FETCH_HEADER_IMG:
               return {...state,featuredHeaderImg:action.payload,isLoading:false}
          case FETCH_HEADER_IMG_ERROR:
               return{...state,featuredHeaderImgError:true,isLoading:false}
          case CHANGE_THEME:
               return {...state,lightMode:!state.lightMode}
          default:
               return state
     }
}
export default appConfigReducer