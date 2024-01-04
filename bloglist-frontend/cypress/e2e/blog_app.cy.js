// Teht 5.17 blogilistan end to end ‑testit step1 OK
// testataan, että kirjoutumisform näytetään
// Teht 5.18 blogilistan end to end ‑testit step2 OK
// kirjautumiselle, testaa sekä onnistunut että epäonnistunut kirjautuminen
// Teht 5.19 blogilistan end to end ‑testit step3 OK
// kirjaantunut käyttäjä pystyy luomaan blogin
// Teht 5.20 blogilistan end to end ‑testit step4 OK
// testi, joka varmistaa, että blogia voi likettää
// Teht 5.21 blogilistan end to end ‑testit step5 OK
// testi, joka varmistaa, että blogin lisännyt käyttäjä voi poistaa blogin
// Teht 5.22 blogilistan end to end ‑testit step6 OK
// testi, joka varmista, että vain blogin lisännyt käyttäjä näkee blogin poistonapin
// Teht 5.23 blogilistan end to end ‑testit step7 OK
// testi, joka varmistaa, että blogit järjestetään likejen mukaiseen järjestykseen, 
// eniten likejä saanut blogi ensin

describe('Blog ', function() {

  beforeEach(function() {    
    cy.visit('http://localhost:5173')  })

  // testataan sivun avautuminen
  it('front page can be opened', function() {
    cy.contains('username')
  })

  // testataan, että kirjoutumisform näytetään
  it('loginForm is shown', function() {
    cy.contains('blogs')
  })

  // testataan blogin liketys
  it('blog can be liked', function() {
    cy.contains('view').click() 
    cy.contains('like').click() 
    cy.contains('liked')
  })

  // testataan, että blogit ovat likejen mukaisessa järjestyksessä
  it('sorted by likes', function() {
    let likes = []

    cy.get('.blog').each(($el) => {
      const likesCount = parseInt($el.text())
      likes.push(likesCount)
    }).then(() => {
      const sortedLikes = [...likes].sort((a, b) => b - a)
      expect(likes).to.deep.equal(sortedLikes)
    })
  })

  describe('Login',function() {
    // testataan sisäänkirjautumista
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('elluvellu')
      cy.get('input:last').type('norsu')
      cy.contains('login').click()
    })

    // testataan epäonnistuva sisäänkirjautumista
    it('fails with wrong credentials', function() {
      cy.get('input:first').type('Hilla Pelto')
      cy.get('input:last').type('väärä salasana')
      cy.contains('login').click()
      cy.contains('wrong credentials')
    })
  })  

  // testit, jotka vaativat sisäänkirjautumisen
  describe('when logged in', function() {    
    beforeEach(function() {         
      cy.get('input:first').type('elluvellu')      
      cy.get('input:last').type('norsu')      
      cy.contains('login').click()   
    })

    // kirjaantunut käyttäjä pystyy luomaan blogin
    it('a new blog can be created', function() {      
      cy.contains('create').click()      
      cy.get('#title').type('Testing Cypruss')      
      cy.get('#author').type('Tester')  
      cy.get('#url').type('www.testurli.fi')  
      cy.contains('add blog').click()      
      cy.contains('Testing Cypruss')    
    })  

    // kirjautunut käyttäjä näkee delete-napin
    it('user can see delete button', function() {
      cy.contains('view').click() 
      cy.contains('delete')
    })

    // kirjautunut käyttäjä pystyy poistamaan aiemmin luodun blogin
    it('user can delete its own blog', function() {
      const blogTitle = "Testing Cypruss"

      cy.contains(blogTitle).parents('.blog').within(() => {
        cy.contains('view').click();
        cy.contains('delete').click();
      })

      cy.contains(blogTitle).should('not.exist')
    })
  })
})