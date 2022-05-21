import React, {useEffect, useState, useRef} from 'react';
import jwt_decode from "jwt-decode";
import socketIOClient from "socket.io-client";
import { fetchOneUser } from '../http/userApi';

const MessagesSidebar = ({filtredChats}) => {
  const [user, setUser] = useState([])
  const id = jwt_decode(localStorage.getItem('token')).id
  let usersId = []
  let users = []

  useEffect(() => {

    
  }, [])

  return (
    <ul className="sidebar-list" >
      {filtredChats.map((user) => (
        <li className='sidebar-list__item' key={user.id} onClick={() => console.log(user.id)}>
          <h3>{user.id}</h3>
        </li>
      ))}
    </ul>
  )
}

export default MessagesSidebar