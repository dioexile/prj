import React, { useEffect, useState } from 'react'
import '../css/buy-offer.css'
import {useParams} from 'react-router-dom'
import { fetchOneSellOffer} from '../http/SellOfferApi';
import { fetchOneUser } from '../http/userApi';
import Chat from '../components/Chat';
import Buyform from '../components/forms/Buyform';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import DeleteForm from '../components/forms/DeleteForm';


const BuyOffer = () => {
  const [buyOffer, setBuyOffer] = useState({})
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [deleteForm, setDeleteForm] = useState(false)
  const [owner, setOwner] = useState(false)
  const [img, setImg] = useState('')
  let navigate = useNavigate();
  const userId = jwt_decode(localStorage.getItem('token')).id

  useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 100);
  }, [])

  const {id} = useParams()

  useEffect(() => {
    fetchOneSellOffer(id).then(data => {
      setBuyOffer(data)
      if(userId === data.userId){
        setOwner(true)
      }
      fetchOneUser(data.userId).then(user => setUser(user))
      setImg(`${process.env.REACT_APP_API_URL + 'static/' + user.img}`)
    })
  }, [])
  const showModal = () => {
    if(visible){
      return <Buyform visible={visible} setVisible={setVisible} user={user} buyOffer={buyOffer}/>
    } else{
      return null
    }
  }
  const showDelete = () => {
    if(deleteForm){
      return <DeleteForm setDeleteForm={setDeleteForm} id={id}/>
    } else{
      return null
    }
  }

  const isOwner = () => {
    if(owner){
      return(
        <div className="offer-controls">
          <button className='edit'>Edit</button>
          <button className='delete' onClick={() => setDeleteForm(true)}>Delete</button>
        </div>
      )
    } else {
      return(
        <div className="about-btn">
          <button type='submit' onClick={() => setVisible(true)}>Buy</button>
        </div>
      )
    }
  }

  if(loading){
    return <div className="spinner"></div>
  }

  return (

    <div className="container">
      
      <div className="buy-offer">
        <div className="offer-about">
          <div className="about-title">
            <h1>Checkout</h1>
          </div>
          <div className="row">
            <div className="project">
              <h6>Project:</h6>
              <p>{buyOffer.project}</p>
            </div>
            <div className="about-price">
              <h6>Price:</h6>
              <p>{buyOffer.price}</p>
            </div>
          </div>
          <div className="about-description">
            <h6>Short description:</h6>
            <p>{buyOffer.shortDescription}</p>
          </div>
          <div className="about-description">
            <h6>Full Description:</h6>
            <p>{buyOffer.fullDescription}</p>
          </div>
          {isOwner()}
        </div>
        
        <div className="comments">
            <div className="about-title">
              <h1>
                Comments
              </h1>
            </div>
            <ul className="comments-list">
              <li className="comments-list_item">
                <div className="comments-user-info">
                  <img src="/img/user.png" alt="" style={{width: '40px'}}/>
                  <span className="comments-username">username</span>
                </div>
                <div className="comments-text">
                  <p>
                    vse ahuenno chel krasava
                  </p>
                </div>
              </li>
              <li className="comments-list_item">
                <div className="comments-user-info">
                  <img src="/img/user.png" alt="" style={{width: '40px'}}/>
                  <span className="comments-username">sad</span>
                </div>
                <div className="comments-text">
                  <p>
                    vse ahuenno chel krasavavse ahuenno chel krasavavse ahuenno chel krasava
                  </p>
                </div>
              </li>
            </ul>
          </div>
      </div>
      {showDelete()}
      {showModal()}
    </div>
  )
}

export default BuyOffer