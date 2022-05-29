import React, { useContext, useEffect, useReducer } from 'react'
import appConfigReducer from '../reducers/appConfigReducer';
import unsplash from '../api/unsplash';
import { SIDEBAR_OPEN,SIDEBAR_CLOSE,FETCH_HEADER_IMG,FETCH_HEADER_IMG_BEGIN, FETCH_HEADER_IMG_ERROR,CHANGE_THEME } from '../action';

const initialState = {
     isSidebarOpen:false,
     isLoading:false,
     featuredHeaderImg:{},
     featuredHeaderImgError:false,
     theme:'light-theme'
}

const AppConfigContext = React.createContext();

export const AppConfigProvider = ({children}) =>{
     const [state,dispatch] = useReducer(appConfigReducer,initialState);
     
     const changeTheme = (theme) =>{
          dispatch({type:CHANGE_THEME,payload:theme})
     }

     const openSidebar = () => {
          dispatch({type:SIDEBAR_OPEN})
     }

     const closeSidebar = () =>{
          dispatch({type:SIDEBAR_CLOSE})
     }

     const fetchHeaderImg = async (params) =>{
          dispatch({type:FETCH_HEADER_IMG_BEGIN});
          try{
               const response = await unsplash.get(params)
               dispatch({type:FETCH_HEADER_IMG,payload:response.data})
          }catch(error){
               dispatch({type:FETCH_HEADER_IMG_ERROR})
          }
     }

     useEffect(()=>{
          fetchHeaderImg('photos/random')
     },[])

     return (
          <AppConfigContext.Provider value={{...state,openSidebar,closeSidebar,fetchHeaderImg,changeTheme}}>
               {children}
          </AppConfigContext.Provider>
     )

}


// make custom hook for easy access of context
export const useAppConfigContext = () => {
     return useContext(AppConfigContext)
}