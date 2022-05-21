import React from 'react'
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom'

const ProfileHeader = ({user}) => {
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    console.log(user.isAuth)
  }
  const id = jwt_decode(localStorage.getItem('token')).id
  
  return (
    <div className="account-row">
      <div className="account-row__item">
        <img src="/img/favorites.svg" alt="" />
      </div>
      <div className="account-row__item" >
        <Link to={'/messages'}><img src="/img/message.svg" alt="" /></Link>
      </div>
      <div className="account-row__item mt9">
        <Link to={`/profile/${id}`}><img src="/img/profile.png" alt="" /></Link>
      </div>
      <div className="account-row__item">
        <span onClick={logOut}>Logout</span>
      </div>
    </div>
  )
}

export default ProfileHeader