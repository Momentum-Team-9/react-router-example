import '../styles.css'
import { Link, useHistory } from 'react-router-dom'

export const Navbar = ({ token, setAuth, clearStorage }) => {
  const history = useHistory()
  return (
    <nav className='uk-navbar uk-navbar-container' uk-navbar>
      <div className='uk-navbar-left'>
        <Link className='uk-logo uk-margin-left' to='/' onClick={() => history.push('/')}>Bookify</Link>
      </div>
      <div className='uk-navbar-right uk-flex'>
        <ul className='uk-navbar-nav'>
          <li className='uk-margin-right'>
            {token
              ? <Link to='/login' onClick={() => { clearStorage('token'); clearStorage('books') }}>Logout</Link>
              : <Link to='/login'>Login</Link>}
          </li>
          {/* this value is hard-coded, but eventually I will pass
         username as a prop to this component from App.js */}
          <li className='uk-margin-right'><Link to='/dashboard'>Hello, username!</Link></li>
        </ul>
      </div>

    </nav>
  )
}
