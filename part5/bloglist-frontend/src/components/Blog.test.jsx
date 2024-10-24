import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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

    test('renders the title, author, URL and likes', () => {
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
})
