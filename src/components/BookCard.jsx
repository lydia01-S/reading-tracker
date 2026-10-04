function BookCard({ id, title, author, status, progress, onProgressChange, onDelete }) {
  const statusClass = `badge badge-${status.replace(/ /g, '-').toLowerCase()}`

  return (
    <article className="book-card">
      <h2>{title}</h2>
      <p>{author}</p>
      <span className={statusClass}>{status}</span>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => onProgressChange(id, Number(e.target.value))}
        aria-label={`Reading progress for ${title}`}
      />
      <p className="progress-label">{progress}% read</p>
      <button onClick={() => onDelete(id)}>Remove</button>
    </article>
  )
}

export default BookCard