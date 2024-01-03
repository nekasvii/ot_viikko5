// Teht 5.5 blogilistan frontend step5 OK
// blogin luominen new note -nappulan takana
// Teht 5.6 blogilistan frontend step6 OK
// blogin luominen omaan komponenttiinsa
// Teht 5.7 blogilistan frontend step7 OK
// yksittäiselle blogille nappi, jonka avulla voi kontrolloida, 
// näytetäänkö kaikki blogiin liittyvät tiedot
// Uusi napin klikkaus pienentää näkymän
// Napin like ei tässä vaiheessa tarvitse tehdä mitään
// Teht 5.8 blogilistan frontend step8 OK
// uusi blogi, ei blogin lisääjän nimeä näytetä blogin tarkempien tietojen joukossa -> korjaa
// Teht 5.9 blogilistan frontend step9
// like-painikkeen toiminnallisuus
// like lisätään backendiin blogin yksilöivään urliin tapahtuvalla PUT-pyynnöllä
// Teht 5.10 blogilistan frontend step10 OK
// sovellus näyttää blogit likejen mukaisessa suuruusjärjestyksessä
// Teht 5.11 blogilistan frontend step11
// nappi blogin poistamiselle

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/error'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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

  const handleBlogAdded = (savedBlog) => {
    setBlogs(blogs.concat(savedBlog))
    setNotificationMessage('Blog added')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleBlogError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // blogin lisääminen create-nappulan takana
  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create</button>
        </div>
        <div style={showWhenVisible}>
          <AddBlogForm
            onBlogAdded={handleBlogAdded}
            onError={handleBlogError}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // blogien sorttaus liketyimmästä alkaen
  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

      {!user && <LoginForm onLogin={handleLoginSuccess} onError={handleLoginError} />}    
      {user && 
      <div>
       <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
       {blogForm()}
      </div>
      } 
      <br />
      {blogsSortedByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App