// teht. 5.13 blogilistan testit step1 OK 
// testi -> 'render title'

import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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