describe('Login', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('shows an error message if login fails', () => {
      cy.get('#email').type('invalid@example.com')
      cy.get('#password').type('invalidPassword')
  
      cy.get('#submit').click()
  
      cy.contains('p', 'Erro ao fazer login, verifique suas credenciais e tente novamente').should('be.visible')
    })
  
    it('navigates to the dashboard if login is successful', () => {
      const email = 'admin@pontue.com'
      const password = '123456@pontue'
  
      cy.get('#email').type(email)
      cy.get('#password').type(password)
  
      cy.intercept('POST', 'https://desafio.pontue.com.br/auth/login', {
        statusCode: 200,
        body: {
          access_token: 'fakeAccessToken',
          aluno_id: 'fakeStudentId',
        },
      })
  
      cy.get('#submit').click()
  
      cy.location('pathname').should('eq', '/dashboard')
    })
  })