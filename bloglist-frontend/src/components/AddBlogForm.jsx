// blogin luominen omana modulinaan
import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({ onBlogAdded, onError }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create(newBlog);
      onBlogAdded(savedBlog)
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
    } catch (exception) {
      onError('Creating a new blog failed')
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={newBlog.title}
          name="title"
          id="title"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author}
          name="author"
          id="author"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlog.url}
          name="url"
          id="url"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        likes
        <input
          type="number"
          value={newBlog.likes}
          name="likes"
          id="likes"
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">add blog</button>
    </form>
  )
}

export default CreateBlogForm