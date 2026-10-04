function BookCard({ id, title, author, status, progress, onProgressChange }) {
  return (
    <article className="book-card">
      <h2>{title}</h2>
      <p>{author}</p>
      <p>{status}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => onProgressChange(id, Number(e.target.value))}
        aria-label={`Reading progress for ${title}`}
      />
      <p>{progress}% read</p>
    </article>
  )
}

export default BookCard