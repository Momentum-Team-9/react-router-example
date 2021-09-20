import { useEffect, useState } from 'react'
import { BookForm } from './BookForm'
import axios from 'axios'
import { Book } from './Book'

export const Booklist = ({ token }) => {
  const [books, setBooks] = useState([])
  const [submitted, setSubmitted] = useState(false)
  useEffect(() => {
    // if (submitted || token) {
    axios.get('https://drf-library-api.herokuapp.com/api/books', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${token}`
      }
    }
    ).then((res) => setBooks(res.data))
    // }
  }, [token, submitted])

  return (
    <div className='uk-cover-container uk-margin'>
      {books && books.map((book) => <Book key={book.pk} book={book} />)}
      {token && <BookForm token={token} setBooks={setBooks} setSubmitted={setSubmitted} />}
    </div>
  )
}
