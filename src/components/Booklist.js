import { useEffect, useState } from 'react'
import { BookForm } from './BookForm'
import axios from 'axios'
import { Book } from './Book'

export const Booklist = ({ token }) => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    axios.get('https://drf-library-api.herokuapp.com/api/books', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${token}`
      }
    }).then((res) => setBooks(res.data))
  }, [token])
  return (
    <div className='uk-cover-container uk-margin'>
      {books && books.map((book) => <Book key={book.pk} book={book} />)}
      {token && <BookForm token={token} />}
    </div>
  )
}
