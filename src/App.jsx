import { useState, useEffect } from 'react'
import BookCard from './components/BookCard'
import AddBookForm from './components/AddBookForm'
import './App.css'

const initialBooks = [
  { id: 1, title: 'Pride and Prejudice', author: 'Jane Austen', progress: 100 },
  { id: 2, title: 'Dune', author: 'Frank Herbert', progress: 45 },
  { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', progress: 20 },
  { id: 4, title: 'Circe', author: 'Madeline Miller', progress: 0 },
  { id: 5, title: 'Normal People', author: 'Sally Rooney', progress: 100 },
]

const FILTERS = ['All', 'Reading', 'Finished', 'Want to read']

const getStatus = (p) => (p === 0 ? 'Want to read' : p === 100 ? 'Finished' : 'Reading')

function App() {
  // Load saved books if there are any, otherwise start with the sample list
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('books')
    return saved ? JSON.parse(saved) : initialBooks
  })
  const [filter, setFilter] = useState('All')

  // Save books every time they change
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  const updateProgress = (id, progress) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, progress } : b)))

  const addBook = (title, author) =>
    setBooks((prev) => [...prev, { id: Date.now(), title, author, progress: 0 }])

  const deleteBook = (id) =>
    setBooks((prev) => prev.filter((b) => b.id !== id))

  const visible =
    filter === 'All' ? books : books.filter((b) => getStatus(b.progress) === filter)

  return (
    <main>
      <h1>My Library</h1>

      <AddBookForm onAdd={addBook} />

      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={f === filter ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p>No books here yet.</p>
      ) : (
        <div className="book-grid">
          {visible.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              status={getStatus(book.progress)}
              progress={book.progress}
              onProgressChange={updateProgress}
              onDelete={deleteBook}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default App