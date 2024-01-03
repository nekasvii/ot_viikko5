// moduuli näyttää hallinnoi blogien listausta
import { useState } from 'react'
import blogService from '../services/blogs'
import Error from './error'
import Notification from './Notification'

const Blog = ({ blog, onDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const [detailsVisible, setDetailsVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleDelete = async () => {
    const confirmMessage = `Remove blog ${blog.title} by ${blog.author}`;
    if (window.confirm(confirmMessage)) {
      try {
        await blogService.remove(blog.id)
        onDelete(blog.id)
        setNotificationMessage('the blog has been deleted')
        setTimeout(() => {
        setNotificationMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('unable to delete the blog')
        setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
      }
    }
  } 

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      onUpdate(returnedBlog)
      setNotificationMessage('liked')
      setTimeout(() => {
      setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('like not working')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <div style={blogStyle}>
        <Notification message={notificationMessage} />
        <Error message={errorMessage} />

        <div style={hideWhenVisible}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog