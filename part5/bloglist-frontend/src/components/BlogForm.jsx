import PropTypes from 'prop-types'

const BlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, addBlog }) => (
  <form onSubmit={addBlog}>
    <div>
      Title:
      <input
        type="text" 
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      Author:
      <input
        type="text" 
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      Url:
      <input
        type="url"
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
  setTimeout: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

BlogForm.displayName = 'BlogForm'

export default BlogForm
