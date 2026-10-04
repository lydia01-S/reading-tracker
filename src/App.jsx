import { useState } from 'react'
import BookCard from './components/BookCard'
import './App.css'

// Renamed from "books" to "initialBooks", and "status" removed,
// because status is now worked out from progress
const initialBooks = [
  { id: 1, title: 'Pride and Prejudice', author: 'Jane Austen', progress: 100 },
  { id: 2, title: 'Dune', author: 'Frank Herbert', progress: 45 },
  { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', progress: 20 },
  { id: 4, title: 'Circe', author: 'Madeline Miller', progress: 0 },
  { id: 5, title: 'Normal People', author: 'Sally Rooney', progress: 100 },
]

const FILTERS = ['All', 'Reading', 'Finished', 'Want to read']

// Outside App because it doesn't need state, just a plain helper
const getStatus = (p) => (p === 0 ? 'Want to read' : p === 100 ? 'Finished' : 'Reading')

function App() {
  const [books, setBooks] = useState(initialBooks)
  const [filter, setFilter] = useState('All')

  const updateProgress = (id, progress) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, progress } : b)))

  const visible =
    filter === 'All' ? books : books.filter((b) => getStatus(b.progress) === filter)

  return (
    <main>
      <h1>My Library</h1>

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
          />
        ))}
      </div>
    </main>
  )
}

export default App