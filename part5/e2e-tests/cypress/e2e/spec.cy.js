describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'userPrueba',
      name: 'User Test',
      password: 'prueba'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    
    cy.visit('http://localhost:5173')
    cy.contains('Show Login').click()
  })

  it('Login form is shown', function() {
    cy.get('#loginForm').should('be.visible') 
    cy.get('#login-button').should('be.visible') 
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('userPrueba')
      cy.get('#password').type('prueba')
      cy.get('#login-button').click()
      cy.get('.MessageAdd').should('contain', 'Login successful')
      cy.get('.MessageAdd').should('have.css', 'border-style', 'solid')
      cy.get('.MessageAdd').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('userPrueba2')
      cy.get('#password').type('prueba')
      cy.get('#login-button').click()
      cy.get('.MessageError').should('contain', 'Wrong username or password')
      cy.get('.MessageError').should('have.css', 'border-style', 'solid')
      cy.get('.MessageError').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: 'userPrueba',
        name: 'User Test',
        password: 'prueba'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      
      cy.visit('http://localhost:5173')
      cy.contains('Show Login').click()
      cy.get('#username').type('userPrueba')
      cy.get('#password').type('prueba')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#title').type('blogPrueba')
      cy.get('#author').type('Author Test')
      cy.get('#url').type('http://localhost:5173/')
      cy.contains('Create').click()
      cy.get('.MessageAdd').should('contain', 'A new blog blogPrueba by Author Test')
      cy.get('.MessageAdd').should('have.css', 'border-style', 'solid')
      cy.get('.MessageAdd').should('have.css', 'color', 'rgb(0, 128, 0)')
    })
  })
})
