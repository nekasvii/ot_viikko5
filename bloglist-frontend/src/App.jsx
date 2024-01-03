// Teht 5.5 blogilistan frontend step5
// blogin luominen new note -nappulan takana
// Teht 5.6 blogilistan frontend step6
// blogin luominen omaan komponenttiinsa
// Teht 5.7 blogilistan frontend step7
// yksittäiselle blogille nappi, jonka avulla voi kontrolloida, 
// näytetäänkö kaikki blogiin liittyvät tiedot
// Uusi napin klikkaus pienentää näkymän
// Napin like ei tässä vaiheessa tarvitse tehdä mitään
// Teht 5.8 blogilistan frontend step8
// uusi blogi, ei blogin lisääjän nimeä näytetä blogin tarkempien tietojen joukossa -> korjaa
// Teht 5.9 blogilistan frontend step9
// like-painikkeen toiminnallisuus
// like lisätään backendiin blogin yksilöivään urliin tapahtuvalla PUT-pyynnöllä
// Teht 5.10 blogilistan frontend step10
// sovellus näyttää blogit likejen mukaisessa suuruusjärjestyksessä
// Teht 5.11 blogilistan frontend step11
// nappi blogin poistamiselle

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/error'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {  // tarkistetaan local storagen tila, josko käyttäjä on kirjautuneena 
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])

  // onnistuneen kirjautumisen handle
  const handleLoginSuccess = (user) => {
    setUser(user)
    blogService.setToken(user.token)
    setNotificationMessage(user.name + ' signed in')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  // epäonnistuneen kirjautumisen handle
  const handleLoginError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogout = () => { // käsitellään uloskirjautuminen
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null)
    setNotificationMessage(user.name + ' signed out')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
  }

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const addBlog = async (event) => { // lisää uuden blogimerkinnän
    event.preventDefault();
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
      setNotificationMessage('Blog added')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('creating a new blog failed')
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)   
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        likes
        <input
          type="number"
          value={newBlog.likes}
          name="likes"
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">add blog</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

      {!user && <LoginForm onLogin={handleLoginSuccess} onError={handleLoginError} />}    
      {user && 
      <div>
       <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
       {user && blogForm()} 
      </div>
      } 
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App