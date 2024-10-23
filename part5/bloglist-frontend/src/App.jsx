import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
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
  const [visibilityAdd, setVisibilityAdd] = useState(false)

  useEffect(() => {
    setVisibilityAdd(false)
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
      setErrorMessage('Logout failed. Please try again')
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
        setVisibilityAdd(false)
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

  

  const handleAdd = () => {
    setVisibilityAdd(!visibilityAdd)
  }

  const handleCancel = () => {
    setVisibilityAdd(false) 
    setTitle('') 
    setAuthor('') 
    setUrl('') 
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={errorMessage} isSuccess={false} />
      <Notification message={successMessage} isSuccess={true} />
      
      {user === null ?
        <LoginForm 
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        /> :
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>{user.name} logged in </p>
            <button onClick={handleLogout}>logout</button>
          </div>

          {!visibilityAdd && (
            <button onClick={handleAdd}>
              New Blog
            </button>
          )}
        
          {visibilityAdd && (
            <div>
              <h2>Create new</h2>
              <BlogForm
                title={title}
                author={author}
                url={url}
                setTitle={setTitle} 
                setAuthor={setAuthor} 
                setUrl={setUrl} 
                handleCancel={handleCancel}
                addBlog={addBlog}
              />
            </div>
          )}
          
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