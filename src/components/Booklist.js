import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookForm } from './BookForm'
import { Book } from './Book'
import axios from 'axios'
import _ from 'lodash'

export const Booklist = ({ token, books, setBooks, featured, setFeatured }) => {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://drf-library-api.herokuapp.com/api/books', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${token}`
      }
    }
    ).then((res) => setBooks(res.data))
  }, [token, setBooks, submitted])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search !== '') {
      axios.get(`https://drf-library-api.herokuapp.com/api/books?search=${search}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `token ${token}`
        }
      }).then((res) => { setBooks(res.data); setSearch(''); setError('') })
    }
    return setError('Must add search term')
  }

  return (
    <div className='
    uk-cover-container
    uk-flex-middle
    uk-flex-column
    uk-margin'
    >
      <input
        type='text'
        className='uk-input uk-margin-bottom'
        placeholder='search by title'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='uk-button' onClick={e => handleSubmit(e)}>Search</button>
      {error !== '' ? <p style={{ color: 'red' }}>{error}</p> : null}
      {books && !_.isEmpty(books)
        ? books.map((book) => {
            return (
              <div key={book.pk} className='uk-flex uk-flex-column uk-align-center uk-width-1-2@m uk-card uk-card-default'>
                <div className='uk-card-body'>
                  {book.featured && <>Featured <i className='fas fa-trophy uk-margin-left' /></>}
                  <Book book={book} pk={book.pk} token={token} featured={featured} setFeatured={setFeatured} />
                  <Link to={`/books/${book.pk}`}>View Details</Link>
                </div>
              </div>
            )
          })
        : <div>No results found</div>}
      {token && <BookForm token={token} setBooks={setBooks} setSubmitted={setSubmitted} />}
    </div>
  )
}
