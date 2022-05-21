import React, {useContext, useState} from 'react';
import { registration } from '../../../http/userApi';
import cl from './login.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";


const Login = observer(({visible, setVisible}) => {

  const {user} = useContext(Context)

  const rootClasses = [cl.overlay]
  if (visible){
    rootClasses.push(cl.active);
  }
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async (e) => {
    try {
      let data;
      e.preventDefault()
      data = await registration(email, password, username)
      console.log(data)
      user.setUser(user)
      user.setIsAuth(true)
      setVisible(false)
      setPassword('')
      setEmail('')
      setUsername('')
    } catch (error) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.modalLogin} onClick = {(e) => e.stopPropagation()}>
        <h3 className={cl.modalTitle} onClick={()=> console.log(user.isAuth)}>LOGIN</h3>
        <form method="post" onSubmit={login}>
          <div className={cl.formInput}>
            <label>USERNAME</label>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='USERNAME' name='username' className={cl.modalInput}/>
            <label>EMAIL</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' type='email' name='email'  className={cl.modalInput} />
            <label>PASSWORD</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='PASSWORD'  type='password' name='password' className={cl.modalInput} />
          </div>
          <button className={cl.regbtn}>Log in</button>
        </form>
      </div>
    </div>
  )
})

export default Login


