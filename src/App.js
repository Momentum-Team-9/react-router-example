import { Login } from './components/Login'
import { Booklist } from './components/Booklist'
import { Navbar } from './components/Navbar'
import { Register } from './components/Register'
import { Book } from './components/Book'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'
import { Dashboard } from './components/Dashboard'

function App () {
  const [auth, setAuth, { removeItem }] = useLocalStorageState('token', '')
  const [books, setBooks] = useLocalStorageState('books', [])

  return (
    <Router>
      <Navbar token={auth} clearStorage={removeItem} />
      <Switch>
        <Route path='/login' component={() => <Login setAuth={setAuth} />} />
        <Route path='/register' component={() => <Register setAuth={setAuth} />} />
        <Route
          exact path='/' render={() => auth
            ? <Booklist token={auth} books={books} setBooks={setBooks} />
            : <Redirect to={{ pathname: '/login' }} />}
        />
        <Route path='/books/:id' component={(id) => <Book token={auth} pk={id} />} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App
