import { Login } from './components/Login'
import { Booklist } from './components/Booklist'
import { Navbar } from './components/Navbar'
import { Register } from './components/Register'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'

function App () {
  const [auth, setAuth, { removeItem }] = useLocalStorageState('token', '')

  return (
    <Router>
      <Navbar token={auth} clearStorage={removeItem} />
      <Switch>
        <Route path='/login' component={() => <Login setAuth={setAuth} />} />
        <Route path='/register' component={() => <Register setAuth={setAuth} />} />
        <Route
          exact path='/' render={() => auth
            ? <Booklist token={auth} />
            : <Redirect to={{ pathname: '/login' }} />}
        />
      </Switch>
    </Router>
  )
}

export default App
