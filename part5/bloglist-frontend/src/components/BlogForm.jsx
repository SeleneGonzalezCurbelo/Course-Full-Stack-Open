import React from 'react';

const BlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, handleCancel, addBlog }) => (
  <form onSubmit={addBlog}>
    <div>
      Title:
      <input
        type="text" 
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      Author:
      <input
        type="text" 
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
    <button type="button" onClick={handleCancel}>Cancel</button>
  </form>
)

export default BlogForm
