import React, { useEffect, useState, useCallback } from 'react'
import '../css/profile.css'
import { fetchOneUser } from '../http/userApi';
import {useParams} from 'react-router-dom'
import { fetchOffers } from '../http/offerApi';
import { Link } from 'react-router-dom'
import {uploadAvatar} from "../http/userApi";
import jwt_decode from "jwt-decode";


const Profile = () => {

  const [user, setUser] = useState({})
  const [regData, setRegDate] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  let [offerList, setOfferList] = useState([])
  const [file, setFile] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const {id} = useParams()
  const [vis, setVis] = useState(false)
  const [active, setActive] = useState(true)
  const [img, setImg] = useState('')


  let listStyles = []


  

  const isOwner = () => {
    if (user.id === jwt_decode(localStorage.getItem('token')).id){
      return(
        <form>
          <input type="file" name='img' accept='image/*' className='uploadFile' id="input__file" onChange={selectFile}/>
          <label htmlFor="input__file" className='uploadFile-button'>Upload image</label>
          <button onClick={sendFile} className="fileSubmit" disabled={active}>Submit</button>
        </form>
      )
    } else{
      return null
    }
  }
  useEffect(() => {
    fetchOneUser(id).then(data => {
      setUser(data)
      setImg(`${process.env.REACT_APP_API_URL + 'static/' + data.img}`)
      setRegDate(data.createdAt)
    })

  }, [avatar])

  if(vis){
    listStyles = ['vis']
  } else {
    listStyles = ['none']
  }

  const showOffers = () => {
    fetchOffers().then(data => setOfferList(data))
    setIsDisabled(true)
    setVis(!vis)
  }
  
  const offerFilter = (offer) => {
    return offer.userId === user.id
  }
  const selectFile = (e) => {
    setFile(e.target.files[0])
    setActive(false)
  }

  const sendFile = useCallback((e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('img', file)
    console.log(formData)
    uploadAvatar(user.id, formData).then(res => setAvatar(res.formData))
    
  }, [file, user.id])
  

  const renderOffers = () => {
    offerList = offerList.filter(offerFilter)
    return (
      <div className={listStyles.join(' ')}>
        <div className="columns">
          <ul className='columns-list'>
            <li className='columns-nick'>
              Project
            </li>
            <li className='columns-rating'>
              Rating
            </li>
            <li className='columns-description'>
              Description
            </li>
            <li className='columns-price'>
              Price
            </li>
          </ul>
        </div>
        <ul className='profile-offers__list'>
          {offerList.map(item => 
            <li className="market-list__item" key={item.id}>
              <p className='offer-project'>{item.project}</p>
              <p className='offer-rating'>0.00</p>
              <p className='offer-description'>{item.shortDescription}</p>
              <p className='offer-price'>{item.price}</p>
              <Link to={`/buy-offer/${item.id}`} >
                <p className='offer-button_btn'>Buy</p>
              </Link>
            </li>
          )} 
        </ul>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="profile">
        <div className="profile-info">
          <div className="user">
            <div className="profile-img" onClick={() => console.log(user)}>
              <img src={img} alt="" />
            </div>
            <div className="profile-name">
              <span className='username'>{user.username}</span>
              <div className="upload-wrapper">
              {isOwner()}
              </div>
            </div>
          </div>
          <div className="reg-info email">
            <h3>Email:</h3>
            <p>{user.email}</p>
          </div>
          <div className="reg-info">
            <h3>Registration date:</h3>
            <p>{regData.substring(0, 10)}</p>
          </div>
          <div className="reg-info">
            <h3>Rating:</h3>
            <p>10000000</p>
          </div>
        </div>
        <div className="profile-offers">
          <div className="profile-offers__title">
            <button onClick={showOffers} disabled = {isDisabled}>{`Show ${user.username}'s offers`} </button>
          </div>
          {renderOffers()}
        </div>
      </div>
    </div>
  )
}

export default Profile


