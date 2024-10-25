import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog component', () => {
    test('renders the title and author, but not URL or likes by default', () => {
        const blog = {
            id: '1',
            title: 'New Blog Post',
            author: 'New Author',
            url: 'http://example.com/newblog',
            likes: 2,
            user: { id: "671317426e84477ead8c92f1" }
        }

        const mockHandleLike = vi.fn()
        const mockHandleRemove = vi.fn()
        const mockOnShowDetails = vi.fn()

        render(
            <Blog 
                blog={blog}
                onShowDetails={mockOnShowDetails} 
                showDetailsBlog={false} 
                handleLike={mockHandleLike} 
                handleRemove={mockHandleRemove} 
                user={{ id: '671317426e84477ead8c92f1' }} 
            />
        )

        const titleElement = screen.getByText(/New Blog Post by New Author/i)
        expect(titleElement).toBeInTheDocument()

        const urlElement = screen.queryByText('http://example.com/newblog')
        const likesElement = screen.queryByText(/Likes: 2/i)
        expect(urlElement).not.toBeInTheDocument()
        expect(likesElement).not.toBeInTheDocument()
    })

    test('shows URL and likes when the "View" button is clicked', () => {
        const blog = {
            id: '1',
            title: 'New Blog Post',
            author: 'New Author',
            url: 'http://example.com/newblog',
            likes: 2,
            user: { id: "671317426e84477ead8c92f1" }
        }

        const mockHandleLike = vi.fn()
        const mockHandleRemove = vi.fn()
        const mockOnShowDetails = vi.fn()

        render(
            <Blog 
                blog={blog}
                onShowDetails={mockOnShowDetails} 
                showDetailsBlog={true}  
                handleLike={mockHandleLike} 
                handleRemove={mockHandleRemove} 
                user={{ id: '671317426e84477ead8c92f1' }} 
            />
        )

        const titleElement = screen.getByText(/New Blog Post by New Author/i)
        expect(titleElement).toBeInTheDocument()

        const urlElement = screen.queryByText('http://example.com/newblog')
        const likesElement = screen.queryByText(/Likes: 2/i)
        expect(urlElement).toBeInTheDocument()
        expect(likesElement).toBeInTheDocument()
    })

    test('calls event handler twice when the like button is clicked twice', () => {
        const blog = {
            id: '1',
            title: 'New Blog Post',
            author: 'New Author',
            url: 'http://example.com/newblog',
            likes: 2,
            user: { id: "671317426e84477ead8c92f1" }
        }

        const mockHandleLike = vi.fn()
        const mockHandleRemove = vi.fn()
        const mockOnShowDetails = vi.fn()

        render(
            <Blog 
                blog={blog}
                onShowDetails={mockOnShowDetails} 
                showDetailsBlog={true}  
                handleLike={mockHandleLike} 
                handleRemove={mockHandleRemove} 
                user={{ id: '671317426e84477ead8c92f1' }} 
            />
        )

        const likeButton = screen.getByText('Like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(mockHandleLike).toHaveBeenCalledTimes(2)
    })
})

describe('BlogForm component', () => {
    test('calls the addBlog handler with the correct details when a new blog is created', () => {
      const mockSetTitle = vi.fn()
      const mockSetAuthor = vi.fn()
      const mockSetUrl = vi.fn()
      const mockAddBlog = vi.fn()
  
      render(
        <BlogForm 
          title="" 
          author="" 
          url="" 
          setTitle={mockSetTitle} 
          setAuthor={mockSetAuthor} 
          setUrl={mockSetUrl} 
          addBlog={mockAddBlog} 
        />
      )
  
      const titleInput = screen.getByLabelText(/title/i)
      const authorInput = screen.getByLabelText(/author/i)
      const urlInput = screen.getByLabelText(/url/i)
      const form = screen.getByRole('form')
  
      fireEvent.change(titleInput, { target: { value: 'New Blog Title' } })
      fireEvent.change(authorInput, { target: { value: 'New Author' } })
      fireEvent.change(urlInput, { target: { value: 'http://example.com' } })
  
      fireEvent.submit(form)
  
      expect(mockSetTitle).toHaveBeenCalledWith('New Blog Title')
      expect(mockSetAuthor).toHaveBeenCalledWith('New Author')
      expect(mockSetUrl).toHaveBeenCalledWith('http://example.com')
  
      expect(mockAddBlog).toHaveBeenCalledTimes(1)
    })
})