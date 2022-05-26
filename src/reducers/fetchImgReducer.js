import { FETCH_IMG,FETCH_IMG_BEGIN,FETCH_IMG_ERROR,CURRENT_PAGE} from '../action';


const fetchImgReducer = (state,action) =>{
     switch(action.type){
          case FETCH_IMG_BEGIN:
               return {...state,isLoading:true}
          case FETCH_IMG:
               return {...state,images:[...state.images,action.payload],isLoading:false,imgFetchError:false}


          case FETCH_IMG_ERROR:
               return{...state,imgFetchError:true,isLoading:false}
          case CURRENT_PAGE:
               return {...state,currentPage:action.payload}

 
          default:
               return state
     }
}
export default fetchImgReducer