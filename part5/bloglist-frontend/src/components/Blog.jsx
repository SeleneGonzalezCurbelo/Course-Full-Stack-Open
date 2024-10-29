import { useRef, useState } from 'react'
import '../App.css'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blog = ({ blog, onShowDetails, showDetailsBlog, handleLike, handleRemove, handleUpdate, user }) => {
  const updateFormRef = useRef()
  const [updatedTitle, setUpdatedTitle] = useState(blog.title)
  const [updatedAuthor, setUpdatedAuthor] = useState(blog.author)
  const [updatedUrl, setUpdatedUrl] = useState(blog.url)

  const submitUpdate = (e) => {
    e.preventDefault()
    handleUpdate(String(blog.id), { id: blog.id, title: updatedTitle, author: updatedAuthor, url: updatedUrl })
    updateFormRef.current.toggleVisibility() 
  }

  return (
    <div className="blogStyle" id="blog-item" data-testid="blog-item"> 
      <div className="blog-title" data-testid="blog-title">
        <p>{blog.title} by {blog.author}</p>
      </div>
      <button  onClick={() => onShowDetails(blog.id)}>{showDetailsBlog ? 'Hide' : 'View'}</button>
      {showDetailsBlog && (
        <div className="blog-details">
          <p className="blog-url">URL: <a href={blog.url}>{blog.url}</a></p>
          <p id="likes-count" data-testid="likes-count" className="blog-likes">
            Likes: {blog.likes} 
            <button onClick={() => handleLike(blog.id)}>Like</button>
          </p>
          {user && blog.user && (typeof blog.user === 'string' ? user.id === blog.user : user.id === blog.user.id) && (
            <>
              <button className="buttonRemove" onClick={() => handleRemove(blog.id)}>Remove</button>
              <Togglable buttonLabel="Update" ref={updateFormRef}>
                <form onSubmit={submitUpdate} className="blog-edit-form">
                  <input 
                    data-testid="newTitle"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input 
                    data-testid="newAuthor"
                    value={updatedAuthor}
                    onChange={(e) => setUpdatedAuthor(e.target.value)}
                    placeholder="Author"
                  />
                  <input 
                    data-testid="newURL"
                    value={updatedUrl}
                    onChange={(e) => setUpdatedUrl(e.target.value)}
                    placeholder="URL"
                  />
                  <button type="submit">Save</button>
                </form>
              </Togglable>
            </>
          )}
        </div>
    )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.string, 
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    ]),
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
  showDetailsBlog: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
}

Blog.displayName = 'Blog'

export default Blog
