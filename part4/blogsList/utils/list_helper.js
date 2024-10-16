const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null; 
    }
  
    const favorite = blogs.reduce((prev, current) => {
      return (prev.likes > current.likes) ? prev : current;
    });
  
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    };
  };
  
 const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null; 
    }
    
    const authorBlogCount = blogs.reduce((authorCount, blog) => {
        authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
        return authorCount;
    }, {})
    
    const mostBlogsAuthor = Object.keys(authorBlogCount).reduce((prevAuthor, currentAuthor) => {
        return authorBlogCount[prevAuthor] > authorBlogCount[currentAuthor] ? prevAuthor : currentAuthor
    })
    
    return {
        author: mostBlogsAuthor,
        blogs: authorBlogCount[mostBlogsAuthor]
    }
 }

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }