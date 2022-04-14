describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Petteri Kivelä',
      username: 'pkivela',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('pkivela')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Petteri Kivelä logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('pkivela')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'wrong username or password')

      cy.get('html').should('not.contain', 'Petteri Kivelä logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('#username').type('pkivela')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Pepe')
      cy.get('#url').type('iltasanomat.fi')
      cy.get('#create').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('Pepe')
        cy.get('#url').type('iltasanomat.fi')
        cy.get('#create').click()
      })

      it('A blog can be liked', function () {
        cy.get('#view').click()
        cy.get('#like').click()
        cy.contains('1 likes')
      })

      it('A blog can be removed', function () {
        cy.get('#view').click()
        cy.get('#remove').click()
        cy.get('html').should('not.contain', 'a blog created by cypress')
      })
    })
  })
})
