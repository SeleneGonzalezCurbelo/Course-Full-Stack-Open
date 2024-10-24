import '../App.css'

const Blog = ({ blog, onShowDetails, showDetailsBlog }) => {
  return (
    <div className="blogStyle">
      {blog.title}
      <button onClick={() => onShowDetails(blog.id)}>{showDetailsBlog ? 'Hide' : 'View'}</button>

    {showDetailsBlog && (
      <div>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes} <button>Like</button></p>
      </div>
    )}
    </div>
  )
}

export default Blog
