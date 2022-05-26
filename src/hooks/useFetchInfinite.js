import React,{useEffect,useState} from 'react'
import axios from 'axios'
export default function useFetchInfinite(endPoint,pageNumber,query=''){
     const [loading,setLoading] = useState(true)
     const [error,setError] = useState(false)
     const [items,setItems] = new useState([])
     useEffect(()=>{
          let source = new axios.CancelToken.source();
          let cancelReq = source.token
          axios({
               method:'get',
               baseURL:`https://api.unsplash.com/${endPoint}`,
               headers:{'Authorization': `Client-ID ${process.env.REACT_APP_UNSPLASH_SECRET_KEY}` },
               params:{query:query,page:pageNumber},
               cancelToken:cancelReq,
          }).then(res=>{
               setItems(prevItems=>{
                    return [...prevItems, res.data.map(data=>data)]
               })
               setLoading(false)
          }).catch(err=>{
               setError(true)

               setLoading(false)
          })
          return ()=> source.cancel('clean')
     },[query,pageNumber])
  return {loading,error,items}
}

