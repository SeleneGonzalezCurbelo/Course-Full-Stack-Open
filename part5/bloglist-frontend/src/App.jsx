import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setUsername('')
      setPassword('')

      setSuccessMessage('Logged out successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Logout failed. Please try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const handleBlogChange = (event) => {
    setNewNote(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
          <input
            type="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
      </div>
      <div>
        Author:
          <input
            type="author"
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

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={errorMessage} isSuccess={false} />
      <Notification message={successMessage} isSuccess={true} />
      
      {user === null ?
        loginForm() :
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>{user.name} logged in </p>
            <button onClick={handleLogout}>logout</button>
          </div>

          <h2>Create new</h2>

          {blogForm()}

          <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          </ul>
        </div>
      }
    </div>
  )
}

export default App