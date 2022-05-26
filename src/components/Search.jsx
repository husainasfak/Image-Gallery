import React,{useEffect,useState} from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import './Search.css';
import data from '../searchData/autoComplete.json'
import { useSearchImgContext } from "../context/searchImgContext";
const Search = ({ placeHolder, place}) => {
  const {updateSeachQuery} = useSearchImgContext();
  const [term,setTerm] = useState('');
  const [searchResult,setSearchResult] = useState([])

  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      
        handleAutoComplete()
      
    },1000);
    return () =>{
         clearInterval(timeoutId)
    }
},[term])
  const handleAutoComplete = () =>{
    
 let autoCompleteData = data.filter(suggestions=>{
   
   return suggestions.query.toLowerCase().includes(term)
 })
  
  if(term === ''){
    setSearchResult([])

  }else{
    setSearchResult(autoCompleteData)
    updateSeachQuery(term)
  }
}
  const onSuggestion = (suggestion) =>{
    setTerm(suggestion)
  }
  return (
    <Wrapper>
      <SearchBar className={`${place=='nav'?'search-nav':'search-header'}`}>
      <FiSearch className="search-icon" />
      <input
        type="search"
        className={`search-input`}
        placeholder={placeHolder}
        value={term}
        name={term}
        onChange={(e)=>setTerm(e.target.value)}
      />
    </SearchBar>
  
    {
      searchResult.length>0 && <div className={`search-auto-complete ${place==='nav'?'search-nav':'search-header'}`}>
        {searchResult.map((result,index)=>{
          return <li key={index} onClick={()=>onSuggestion(result.query)} >{result.query}</li>
        })}
      </div>
    }
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .search-auto-complete{
    position: absolute;
    padding: 1rem;
    margin: .3rem;
    li{
      text-align: left;
      cursor: pointer;
      padding: .5rem;
      transition: all 0.4s ease;
      &:hover{
        background: #dbdbdb;
      }
    }
  }
`
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.9rem 1.5rem;
  height: 0.8rem;
  border: 1px solid #ececec;
  border-radius: 6px;

  .search-icon {
    font-size: 1.4rem;
  }
  .search-input {
     flex:1;
     padding: 0.9rem;
     background-color: transparent;
     outline: none;
     border: none;
     font-size:1.1rem
  }
`;

export default Search;
