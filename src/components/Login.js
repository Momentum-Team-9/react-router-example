import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const Login = ({ setAuth }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errors, setErrors] = useState('')
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('https://drf-library-api.herokuapp.com/auth/token/login',
      {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res)
        if (res.data.auth_token) {
          setAuth(res.data.auth_token)
          history.push('/')
        }
        setErrors('Incorrect credentials provided')
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
    <>
      <div className='logo'>
        <p
          className='has-text-primary has-text-centered'
        >
          Pug.ly
        </p>
        <i className='fas fa-paw' />
      </div>
      {/* Show the user a validation error if there is one */}
      {errors &&
        <p>{errors}</p>}
      <form className='form' onSubmit={handleSubmit}>
        <label className='label'>Username</label>
        <input
          className='input'
          type='text'
          placeholder='email@domain.com or janedoge123'
          value={username}
          onChange={(e) => handleChange('username', e)}
        />
        <label className='label'>Password</label>
        <input
          className='input'
          type='password'
              // using state to pass a value to this attribute
              // makes this a controlled component
          value={password}
          onChange={(e) => handleChange('password', e)}
        />
        <div id='form-buttons'>
          <button
            className='button is-primary'
            type='submit'
          >Login
          </button>
          {/* <span>New to Pug.ly? &nbsp; <a className='has-text-primary' onClick={() => history.push('/signup')}>Register Now</a></span> */}
        </div>
      </form>
    </>
  )
}
