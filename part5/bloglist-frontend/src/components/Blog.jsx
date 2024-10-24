import '../App.css'

const Blog = ({ blog, onShowDetails, showDetailsBlog, handleLike, handleRemove, user }) => {

  return (
    <div className="blogStyle">
      {blog.title}
      <button onClick={() => onShowDetails(blog.id)}>{showDetailsBlog ? 'Hide' : 'View'}</button>
      {showDetailsBlog && (
        <div>
          <p>URL: <a href={blog.url}>{blog.url}</a></p>
          <p>
            Likes: {blog.likes} 
            <button onClick={() => handleLike(blog.id)}>Like</button>
          </p>
          <p>Author: {blog.author}</p>
          {user && blog.user && user.id === blog.user.id && ( 
            <button className="buttonRemove" onClick={() => handleRemove(blog.id)}>Remove</button>
          )}
        </div>
    )}
    </div>
  )
}

export default Blog
