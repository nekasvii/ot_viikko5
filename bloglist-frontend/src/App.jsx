// Teht 5.1 blogilistan frontend step1 OK 
// frontendiin kirjautumisen mahdollistava toiminnallisuus
// Jos käyttäjä ei ole kirjautunut, sivulla näytetään pelkästään kirjautumislomake
// Kirjautuneelle käyttäjälle näytetään kirjautuneen käyttäjän nimi sekä blogien lista
// Teht 5.2 blogilistan frontend step2 OK
// kirjautumisesta "pysyvä" local storagen avulla
// mahdollisuus uloskirjautumiseen

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      // noteService.setToken(user.token)    
    }  
  }, [])

  const handleLogin = async (event) => { // käsitellään sisäänkirjautuminen

    event.preventDefault()
    
    try {      
      const user = await loginService.login({        
        username, password,      
      })      

      window.localStorage.setItem(  // käyttäjän tiedot local storageen
        'loggedBlogappUser', JSON.stringify(user)      
      ) 

      setUser(user)      
      setUsername('')      
      setPassword('')    
    } catch (exception) {      
      setErrorMessage('wrong credentials')      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)    
    }  
  }

  const handleLogout = () => { // käsitellään uloskirjautuminen
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {!user && loginForm()}      
      {user && <div>
       <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
       
      </div>
    } 

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App