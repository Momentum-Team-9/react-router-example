import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Book = ({ book, token, pk }) => {
  const [selectedBook, setSelectedBook] = useState(book)
  const location = useLocation()

  const bookTitle = <h3>{book && book.title}</h3>

  useEffect(() => {
    if (location.pathname.includes('/books/')) {
      axios.get(`https://drf-library-api.herokuapp.com/api/books/${pk.match.params.id}`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
        .then((res) => {
          setSelectedBook(res.data)
        })
    }
  }, [pk, book, token, location])

  return (
    <div className='uk-cover-container uk-flex uk-flex-center'>
      {location.pathname === '/'
        ? bookTitle
        : <h3>{selectedBook && selectedBook.title}</h3>}
    </div>
  )
}
