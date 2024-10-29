import PropTypes from 'prop-types'

const BlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, addBlog }) => (
  <form className="blog" id="blog-item" data-testid="blog-item" onSubmit={addBlog} role="form">
    <div>
      <label htmlFor="title">Title:</label>
      <input
        data-testid="blog-title"
        type="text" 
        id="title"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      <label htmlFor="author">Author:</label>
      <input
        data-testid="author"
        type="text" 
        id="author"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      <label htmlFor="url">Url:</label>
      <input
        data-testid="url"
        type="url"
        id="url"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">Create</button>
  </form>
)


BlogForm.propTypes = {
  setTitle: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

BlogForm.displayName = 'BlogForm'

export default BlogForm
