import '../App.css'

const Blog = ({ blog, onShowDetails, showDetailsBlog, handleLike }) => {
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
      </div>
    )}
    </div>
  )
}

export default Blog
