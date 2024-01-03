// Teht 5.1 blogilistan frontend step1 OK 
// frontendiin kirjautumisen mahdollistava toiminnallisuus
// Jos käyttäjä ei ole kirjautunut, sivulla näytetään pelkästään kirjautumislomake
// Kirjautuneelle käyttäjälle näytetään kirjautuneen käyttäjän nimi sekä blogien lista

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

  const handleLogin = async (event) => {

    event.preventDefault()
    
    try {      
      const user = await loginService.login({        
        username, password,      
      })      
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
       <p>{user.name} logged in</p>
      </div>
    } 

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App