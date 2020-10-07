describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser('Application Tester', 'tester', 'test123')
    cy.createUser('Permission Tester','permtester','perm123')
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
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester',password:'test123' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#author').type('Cypress')
      cy.get('#title').type('E2E testing automation')
      cy.get('#url').type('localhost')
      cy.get('#submitButton').click()

      cy.contains('A new blog E2E testing automation by Cypress added')
      cy.get('.blog').contains('E2E testing automation')
    })
    it('A user can log out', function () {
      cy.contains('log out').click()
      cy.contains('Logged out Application Tester')
    })
    describe('and some blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ author: 'Cypress', title: 'E2E testing', url:'localhost', likes: 1 })
        cy.createBlog({ author: 'Cypress', title: 'React testing', url:'localhost', likes:2 })
        cy.createBlog({ author: 'Cypress', title: 'Electron, no thanks', url:'localhost', likes:3 })
      })
      it('User can like a blog', function () {
        cy.contains('E2E testing').as('firstBlog').find('button').click()
        cy.get('@firstBlog').contains('like').click()
        cy.get('@firstBlog').find('#blog-likes').should('contain.text','2')
      })
      it('Blog can be deleted', function () {
        cy.contains('E2E testing').as('firstBlog').find('button').click()
        cy.get('@firstBlog').contains('remove').click()
        cy.get('@firstBlog').should('not.exist')
      })
      it('Blog cannot be deleted by another user', function () {
        cy.login({ username: 'permtester', password: 'perm123' })
        cy.contains('E2E testing').as('firstBlog').find('button').click()
        cy.get('@firstBlog').should('not.contain', 'remove')
        //Just to be sure we test that the user can't contact API directly and delete
        cy.request('http://localhost:3001/api/blogs').then((resp) => {
          const deleteID = resp.body[0].id
          cy.request({
            method: 'DELETE',
            url: `http://localhost:3001/api/blogs/${deleteID}`,
            headers: {
              'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
            },
            failOnStatusCode: false
          }
          ).then((r => {
            expect(r.status).eq(401)
            expect(r.body).to.have.ownProperty('error')
          }))
        })
      })
    })
  })
})