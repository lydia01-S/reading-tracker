import { useState } from 'react'

function AddBookForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !author.trim()) return
    onAdd(title.trim(), author.trim())
    setTitle('')
    setAuthor('')
  }

  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" aria-label="Title" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" aria-label="Author" />
      <button type="submit">Add book</button>
    </form>
  )
}

export default AddBookForm