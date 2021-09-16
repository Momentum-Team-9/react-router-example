import '../styles.css'
import { Link } from 'react-router-dom'

export const Navbar = ({ token, setAuth, clearStorage }) => {
  return (
    <nav className='uk-navbar uk-navbar-container' uk-navbar>
      <div className='uk-navbar-left'>
        <a className='uk-logo uk-margin-left' href='#'>Bookify</a>
      </div>
      <div className='uk-navbar-right uk-flex'>
        <ul className='uk-navbar-nav'>
          <li className='uk-margin-right'>
            {token
              ? <a onClick={() => clearStorage('token')}>Logout</a>
              : <Link to='/login'>Login</Link>}
          </li>
          {/* this value is hard-coded, but eventually I will pass
         username as a prop to this component from App.js */}
          <li className='uk-margin-right'><a>Hello, username!</a></li>
        </ul>
      </div>

    </nav>
  )
}
