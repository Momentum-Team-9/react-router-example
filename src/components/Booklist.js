import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookForm } from './BookForm'
import { Book } from './Book'
import axios from 'axios'
import _ from 'lodash'

export const Booklist = ({ token, books, setBooks }) => {
  const [submitted, setSubmitted] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://drf-library-api.herokuapp.com/api/books', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${token}`
      }
    }
    ).then((res) => setBooks(res.data))
  }, [token, setBooks])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(`https://drf-library-api.herokuapp.com/api/books?search=${search}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `token ${token}`
      }
    }).then((res) => { setBooks(res.data); setSearch('') })
  }

  return (
    <div className='uk-cover-container uk-margin'>
      <input
        type='text'
        className='uk-input'
        placeholder='search by title'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='uk-button' onClick={e => handleSubmit(e)}>Search</button>
      {books && !_.isEmpty(books)
        ? books.map((book) => {
            return (
              <div key={book.pk}>
                <Book book={book} pk={book.pk} token={token} />
                <Link to={`/books/${book.pk}`}>View Details</Link>
              </div>
            )
          })
        : <div>No results found</div>}
      {token && <BookForm token={token} setBooks={setBooks} setSubmitted={setSubmitted} />}
    </div>
  )
}
