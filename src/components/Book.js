import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Book = ({ book, token, pk, featured, setFeatured }) => {
  const [selectedBook, setSelectedBook] = useState(book)
  const location = useLocation()

  const bookDetails =
     (selectedBook &&
       <div className='uk-flex uk-cover-container uk-flex-column'>
         <h3 className='uk-text-center'>{selectedBook.title}</h3>
       </div>
     )

  const handleFeatured = (e) => {
    e.preventDefault()
    axios.patch(`http://drf-library-api.herokuapp.com/api/books/${selectedBook.pk}`, {
      featured: !selectedBook.featured
    },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
    ).then(res => { setFeatured(!featured) })
  }

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
  }, [location.pathname, pk, token])

  return (
    <div>
      {location.pathname === '/'
        ? <h3>{selectedBook.title}</h3>
        : <>
          {bookDetails}
          <button className='uk-button uk-align-center' onClick={handleFeatured}>
            {selectedBook && selectedBook.featured ? 'Remove From Featured' : 'Add To Featured'}
          </button>
          </>}
    </div>
  )
}
