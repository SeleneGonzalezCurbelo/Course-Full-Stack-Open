import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [detailsId, setDetailsId] = useState(null)
  
  const blogFormRef = useRef() 
  const loginFormRef = useRef()
  
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    })  
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Login successful')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    setDetailsId(null)
    setSuccessMessage('Logged out successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0, 
      user: user.id
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setUrl('')
        setSuccessMessage(`A new blog '${returnedBlog.title}' by '${returnedBlog.author}'`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      .catch(() => {
        setErrorMessage('Error adding blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const onShowDetails = (id) => {
    setDetailsId(detailsId === id ? null : id)
  }

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.id
    }

    try {
      await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog).sort((a, b) => b.likes - a.likes))
    } catch (error) {
      setErrorMessage('Error updating likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setSuccessMessage('Blog deleted successfully')
      } catch (error) {
        setErrorMessage('Error deleting blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={errorMessage} isSuccess={false} />
        <Notification message={successMessage} isSuccess={true} />
        <Togglable buttonLabel="Login" ref={loginFormRef}>
          <LoginForm 
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          /> 
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} isSuccess={false} />
      <Notification message={successMessage} isSuccess={true} />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          addBlog={addBlog}
        />
      </Togglable>

      <ul>
        {blogs.map(blog => 
          <Blog 
            key={blog.id} 
            blog={blog} 
            onShowDetails={onShowDetails} 
            showDetailsBlog={detailsId === blog.id}
            handleLike ={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        )}
      </ul>
    </div>
  )
}

export default App