describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Application Tester',
      username: 'tester',
      password: 'test123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#login-form').should('contain', 'username').and('contain', 'password')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type('tester')
      cy.get('input[name="Password"]').type('test123')
      cy.get('#login-button').click()
      cy.contains('Application Tester')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('tester')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)') //red
    })
  })
})