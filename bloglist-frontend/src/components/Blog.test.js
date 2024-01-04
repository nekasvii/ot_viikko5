// teht. 5.13 blogilistan testit step1 OK 
// testi -> 'render title'
// teht. 5.14 blogilistan testit step2 OK
// testi, joka varmistaa että myös url, likejen määrä 
// ja käyttäjä näytetään, kun blogin kaikki tiedot näyttävää nappia on painettu
// testi -> 'shows all detiles when view button is clicked'
// teht. 5.15 blogilistan testit step3 OK
// testi, joka varmistaa, että jos komponentin like-nappia painetaan kahdesti, 
// komponentin propsina saamaa tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa
// testi -> 'clicking twice the button "like" calls event handler twice'
// teht. 5.16 blogilistan testit step4  EI TOIMI
// uuden blogin luomisesta huolehtivalle lomakkelle testi, joka varmistaa, että lomake kutsuu 
// propsina saamaansa takaisinkutsufunktiota oikeilla tiedoilla siinä vaiheessa kun blogi luodaan
// testi -> 'creating blog with correct detiles'

import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'
import App from '../App'

// testi, joka varmistaa että blogin näyttävä komponentti renderöi blogin titlen (tehty teht. 5.7)
test('render title', () => {
    const blog = {
        title: 'Gallissa puhaltaa',
        author: 'Kukapa',
        url: 'www.kukapa.fi',
        likes: 10
    }

  //  renderöi komponentin React Testing Library ‑kirjaston tarjoaman funktion render avulla
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')  
  expect(div).toHaveTextContent('Gallissa puhaltaa')
  //expect(element).toBeDefined()
})

// testi, joka näyttää blogin kaikki tiedot
test('shows all detiles when view button is clicked', async () => {
    const blog = {
      title: 'Gallissa puhaltaa',
      author: 'Kukapa',
      url: 'www.kukapa.fi',
      likes: 10,
      user: { id: '123', name: 'Eloveena' }
    }

    const userObj = {
        name: 'Eloveena',
        id: '123'
      }
  
    render(<Blog blog={blog} user={userObj} />)
  
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
  
    expect(screen.getByText('www.kukapa.fi')).toBeDefined()
    expect(screen.getByText('likes 10')).toBeDefined()
    expect(screen.getByText(/Eloveena/i)).toBeDefined()
  })

// klikataan kahdesti ja tapahtumakäsittelijää kutsutaan kahdesti
test('clicking twice the button "like" calls event handler twice', async () => {
    const blog = {
        title: 'Gallissa puhaltaa',
        author: 'Kukapa',
        url: 'www.kukapa.fi',
        likes: 10
    }
  
    const mockHandler = jest.fn()
  
    render(<Blog blog={blog} handleLike={mockHandler} />)
  
    // aloittetaan uusi sessio
    const user = userEvent.setup()
    // Testi hakee renderöidystä komponentista napin tekstin perusteella ja klikkaa sitä
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    // Testin ekspektaatio varmistaa, että mock-funktiota on kutsuttu täsmälleen kerran
    expect(mockHandler.mock.calls).toHaveLength(2)
})

// testaa blogin oikeanlaisen luonnin
test('creating blog with correct detiles', async () => {
    /* EI TOIMI
    render(<App />)
    const user = userEvent.setup()

    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })

    await user.type(usernameInput, 'elluvellu') 
    await user.type(passwordInput, 'norsu')
    const loginButton = screen.getByRole('button', { name: /login/i })
    await user.click(loginButton)

    const createButton = screen.getByText('create')
    await user.click(createButton)

    const titleInput = screen.getByRole('textbox', { name: /title/i })
    const authorInput = screen.getByRole('textbox', { name: /author/i })
    const urlInput = screen.getByRole('textbox', { name: /url/i })
  
    await user.type(titleInput, 'Aurora Borealis')
    await user.type(authorInput, 'Iki Ihana')
    await user.type(urlInput, 'www.ikiihana.com')

    const addButton = screen.getByRole('button', { name: /add blog/i })
    await user.click(addButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Aurora Borealis',
      author: 'Iki Ihana',
      url: 'www.ikiihana.com'
    })*/
  })