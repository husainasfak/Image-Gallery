import React from "react";
import styled from "styled-components";
import { useAppConfigContext } from "../context/appConfigContext";
import Loader from "./Loader";
import Search from "./Search";

const Header = () => {
  const { featuredHeaderImg, isLoading } = useAppConfigContext();
  return (
    <Wrapper>
      {isLoading ? (
        <Loader loadingText="Loading some awesome Images.." />
      ) : (
        <div
          className="header"
          style={{

            background: `linear-gradient(rgba(0, 0, 0, 0.574), rgba(0, 0, 0, 0.67)),url(${featuredHeaderImg?.urls?.full})`,
           
          }}
        >
          <div>
          <h1>Download High Quality Images by creators</h1>
          <p>Over 2.4 million+ stock Images by our talented community</p>
          </div>

          <div className='search-bar'>
               <Search placeHolder='Search high resolution Images, categories, wallpapers' header/>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .header {
    margin: 0;
    height: 60vh;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 14px;
    padding-top: 14px;
    h1,
    p {
      margin: 0;
      color:#ecf0f1;
      letter-spacing: 1.5px;
      margin:1rem 0;
    }
    h1{
         font-size: 2.2rem;
    }
    .search-bar{
         width:70%;

    }
  }
`;
export default Header;
