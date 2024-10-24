import '../App.css'
import PropTypes from 'prop-types'

const Blog = ({ blog, onShowDetails, showDetailsBlog, handleLike, handleRemove, user }) => {

  return (
    <div className="blogStyle">
      <div className="blog-title">
        <p>{blog.title} by {blog.author}</p>
      </div>
      <button onClick={() => onShowDetails(blog.id)}>{showDetailsBlog ? 'Hide' : 'View'}</button>
      {showDetailsBlog && (
        <div className="blog-details">
          <p className="blog-url">URL: <a href={blog.url}>{blog.url}</a></p>
          <p className="blog-likes">
            Likes: {blog.likes} 
            <button onClick={() => handleLike(blog.id)}>Like</button>
          </p>
          {user && blog.user && user.id === blog.user.id && ( 
            <button className="buttonRemove" onClick={() => handleRemove(blog.id)}>Remove</button>
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
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
  showDetailsBlog: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
}

Blog.displayName = 'Blog'

export default Blog
