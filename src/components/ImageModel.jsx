import * as React from 'react';
import Box from '@mui/material/Box';
import {CgClose} from 'react-icons/cg'
import {AiOutlineShareAlt,AiOutlineInfoCircle,AiOutlineInstagram} from 'react-icons/ai'
import {AiFillLike} from 'react-icons/ai';
import {FiTwitter} from 'react-icons/fi';
import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'


function ImageModal({close,imgData}) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 1200px)'
  })
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isDesktopOrLaptop ? 300 : 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:3
  };
  
  const {urls, likes, user: {name,first_name,location,links:{html} ,social:{instagram_username,twitter_username},profile_image} , links} = imgData;
  return (
    <Wrapper>
        <Box sx={style}>
              <div className='close-btn'>
                <CgClose onClick={close}  fontSize={30}/>
              </div>    
              <div className={`img-details ${isDesktopOrLaptop ? 'img-details-small' : ''}`}>
                  <img src={urls.small}/>

                  <div className='img-action-btn'>
                  <div className='img-actions'>
                    <div className='img-action'>
                        <button onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}>
                            <AiOutlineShareAlt/>
                            <h5>Share</h5>
                        </button>
                        <a href={`${links.html}/?client_id=${process.env.REACT_APP_UNSPLASH_SECRET_KEY}`} target="__blank">
                        <button>
                            <AiOutlineInfoCircle/>
                            <h5>Info</h5>
                        </button>
                        </a>
                    </div>
                    <div className='img-downlaod'>
                      <a href={links.download} target="__blank">
                        <button>Download</button>
                      </a>
                    </div>
                  </div>
                  </div>
              </div>  
              <div className={`main-img--description ${isDesktopOrLaptop ? 'main-img--description-small':''}`}>

           <div className='description-profile'>
              <div  className='description-profile--img'>
                <img src={profile_image.medium} alt={name} />
              </div>
              <div  className='description-profile--text'>
                <h3>{name}</h3>
                <p>@{first_name}</p>
              </div>
              <div className='description-profile--social'>
              {twitter_username ? <p> <FiTwitter/> / <span>{twitter_username}</span> </p> : instagram_username?  <p> <AiOutlineInstagram/> / <span>{instagram_username}</span></p> : null}
              {location && <p><GoLocation/> / <span>{location}</span></p>}
              </div>
           </div>

           <div className='description-likes'>
              <AiFillLike fontSize={30}/>
              <div>{likes}</div>
           </div>
         </div>   
        </Box>
    
    </Wrapper>
  );
}
const Wrapper  = styled.div`
  .img-details{
    position:relative;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    img{
      width:100%;
      height: 30rem;
      object-fit: cover;
      border-radius-top-right: 10px;
      border-radius-top-left: 10px;
      background-blend-mode: darken;
    }
    .img-action-btn{
      width:100%;
      position:absolute;
      bottom:0;
      .img-actions,button{
      display:flex;
      justify-content: space-between;
      button{
        background:transparent;
        padding: 1rem 1.5rem;
        margin:.5rem;
        font-size:1rem;
        border-radius:5px;
        border:none;
        outline:none;
        background-color: #fbfbfb;
        cursor: pointer;
        h5{
          margin:0 .3rem;
        }
      }
      .img-action{
        display: flex;
      }
      .img-downlaod{
        button{
          background-color: green;
          color:#fff;
        }
      }
    }
    }
  }
  .img-details-small{
    position:relative;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    img{
      
      height: 20rem;
     
    }
    .img-action-btn{
      .img-actions{
        flex-direction:column;
      }
      button{
        background:transparent;
        padding: .4rem 1rem;
        margin:.2rem;
        font-size:.8rem;
        border-radius:5px;
        border:none;
        outline:none;
        background-color: #fbfbfb;
        cursor: pointer;
        h5{
          margin:0 .3rem;
        }
      }
      .img-action{
        display: flex;
        
      }
      
    }
    }
  
  .close-btn{
    background-color: #fff;
    border-radius: 50%;
    position:absolute;
    color:#000;
    top:-12px;
    right: -12px;
    padding:.3rem;
    cursor:pointer;
    z-index:10000;
  }
  .main-img--description{
    padding: .7rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .description-profile{
      display: flex;
      align-items: center;
        &--img{
          img{
            border-radius: 50%;
            margin: 0 .3rem;
          }
        }
        &--text{
          h3,p{
            margin: 5px;
          }
        }
        &--social{
          display: flex;align-items:center;
          p{
            font-size:1rem;
            margin:1rem;
            display:flex;
            align-items: center;
          }
        }
    }
    .description-likes{
      display: flex;
      align-items: center;
      margin: 0 1rem;
      div{
        margin: 0 .5rem;
        font-size: 1.2rem;
      }
    }
   
  }
  .main-img--description-small{
    flex-direction: column;
    .description-profile{
       flex-direction: column;
      align-items:center; 
      text-align:center;
    }
  }
`

export default ImageModal;