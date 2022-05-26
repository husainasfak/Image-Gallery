import React,{useState} from 'react'
import styled from 'styled-components'
import {AiFillLike} from 'react-icons/ai';

import ImageModel from './ImageModel'
import Modal from '@mui/material/Modal';
const ImageCard = React.forwardRef((props,ref) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {urls, likes, user: {name,social:{instagram_username,twitter_username},profile_image}} = props.img ;

  


  return (
    <Wrapper ref={ref} >
         <img onClick={handleOpen} width="300px" className='main-img'  src={urls.small} alt={name}/>

         <div className='main-img--description'>

           <div className='description-profile'>
              <div  className='description-profile--img'>
                <img src={profile_image.medium} alt={name} />
              </div>
              <div  className='description-profile--text'>
                <h3>{name}</h3>
                {twitter_username ? <p>@ {twitter_username} </p> : instagram_username?  <p> # {instagram_username}</p> : null}
              </div>
           </div>

           <div className='description-likes'>
              <AiFillLike fontSize={30}/>
              <div>{likes}</div>
           </div>
         </div>

        <Modal open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
            <ImageModel close={handleClose} imgData={props.img} />
        </Modal>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  background-color: #ecf0f1;
  border-radius:  .6rem;
  margin: 20px 0;
  box-shadow: 0 0 7px rgba(0,0,0,0.5);
  .main-img{
    width: 100%;
    border-radius: .6rem .6rem 0 0;
    cursor: pointer;
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

 
`
export default ImageCard