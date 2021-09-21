import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

export const Login = ({ setAuth }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('https://drf-library-api.herokuapp.com/auth/token/login',
      {
        username: username,
        password: password
      })
      .then(res => {
        if (res.data.auth_token) {
          setAuth(res.data.auth_token)
          history.push('/')
        }
        return null
      })
  }

  const handleChange = (inputType, event) => {
    if (inputType === 'username') {
      setUsername(event.target.value)
    }
    if (inputType === 'password') {
      setPassword(event.target.value)
    }
  }

  return (
    <div className='uk-container uk-flex uk-flex-center uk-flex-middle uk-height-large'>
      <form className='uk-form-horizontal' onSubmit={handleSubmit}>
        <label className='uk-form-label'>Username</label>
        <input
          className='uk-input'
          type='text'
          placeholder='email@domain.com or janedoge123'
          value={username}
          onChange={(e) => handleChange('username', e)}
        />
        <label className='uk-form-label'>Password</label>
        <input
          className='uk-input uk-margin-bottom'
          placeholder='password'
          type='password'
              // using state to pass a value to this attribute
              // makes this a controlled component
          value={password}
          onChange={(e) => handleChange('password', e)}
        />
        <div id='form-buttons'>
          <button
            className='uk-button uk-margin-right'
            type='submit'
          >Login
          </button>
          <span>New to Bookify? &nbsp;<Link to='/register'> <a className='uk-link uk-primary' href='#'>Register Now</a></Link></span>
        </div>
      </form>
    </div>
  )
}
