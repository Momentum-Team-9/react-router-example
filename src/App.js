import { useState, useEffect } from 'react'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

function App () {
  const [auth, setAuth] = useState('')

  useEffect(() => { console.log(auth) }, [auth]
  )

  // return (
  //   <>
  //     {auth ? <Dashboard /> : <Login setAuth={setAuth} />}
  //   </>
  // )

  return (
    <Router>
      <Switch>
        <Route path='/login' component={() => <Login setAuth={setAuth} />} />
        <Route
          exact path='/' render={() => auth
            ? <Dashboard />
            : <Redirect to={{ pathname: '/login' }} />}
        />
      </Switch>
    </Router>
  )
}

export default App
