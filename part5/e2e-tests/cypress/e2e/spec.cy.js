describe('Blog app', function() {
  let user1
  let authToken
  beforeEach(function() {
    const userResponse1 = cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'userPrueba',
      name: 'User Test',
      password: 'prueba'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user).then((response) => {
      user1 = response.body  
    })

    const userLogin = {
      username: 'userPrueba',
      password: 'prueba'
    }
    cy.request('POST', 'http://localhost:3001/api/login', userLogin).then((response) => {
      authToken = response.body.token  
    })

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
    let blog
    beforeEach(function() {
      cy.visit('http://localhost:5173')
      cy.contains('Show Login').click()
      cy.get('#username').type('userPrueba')
      cy.get('#password').type('prueba')
      cy.get('#login-button').click()

      blog = {
        title: 'Blog A',
        author: 'Author A',
        url: 'http://localhost/blog-a',
        likes: 10,
        user: user1.id 
      }
      const headers = {
        'Authorization': `Bearer ${authToken}`, 
        'Content-Type': 'application/json'       
      }
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        headers: headers,
        body: blog,
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
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

    it('A blog can be liked', function() {
      cy.visit('http://localhost:5173')

      cy.contains('Blog A by Author A').should('be.visible')
      cy.contains('Blog A by Author A')
      .closest('[data-testid="blog-item"]') 
      .find('button')
      .contains('View')
      .click()
      
      cy.get('[data-testid="likes-count"]').should('contain', `Likes: ${blog.likes}`)

      cy.contains('Blog A by Author A')
      .closest('[data-testid="blog-item"]') 
      .find('button')
      .contains('Like')
      .click()    

      cy.get('[data-testid="likes-count"]').should('contain', `Likes: ${blog.likes+1}`)
    })

    it('A blog can be delete', function() {
      cy.visit('http://localhost:5173')
      cy.contains('Blog A by Author A').should('be.visible')
      cy.contains('Blog A by Author A')
      .closest('[data-testid="blog-item"]') 
      .find('button')
      .contains('View')
      .click()
      
      cy.contains('Blog A by Author A').should('be.visible')
      cy.contains('Blog A by Author A')
      .closest('[data-testid="blog-item"]') 
      .find('button')
      .contains('Remove')
      .click()

      cy.on('window:confirm', (msg) => {
        expect(msg).to.equal('Are you sure you want to delete this blog?')
        return true
      })

      cy.get('.MessageAdd').should('contain', 'Blog deleted successfully')
      cy.get('.MessageAdd').should('have.css', 'border-style', 'solid')
      cy.get('.MessageAdd').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('Only the creator can see the delete button', function() {
      const user = {
        username: 'userPrueba2',
        name: 'User Test2',
        password: 'prueba'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)

      cy.visit('http://localhost:5173')
      cy.contains('logout').click()
      cy.contains('Show Login').click()
      cy.get('#username').type('userPrueba2')
      cy.get('#password').type('prueba')
      cy.get('#login-button').click()

      cy.contains('Blog A by Author A').should('be.visible')
      cy.contains('Blog A by Author A')
      .closest('[data-testid="blog-item"]') 
      .find('button')
      .contains('View')
      .click()
      
      cy.contains('Blog A by Author A').should('be.visible')
      cy.contains('Blog A by Author A')
      .closest('[data-testid="blog-item"]') 
      .find('button')
      .contains('Remove')
      .should('not.exist')
    })
  })
})