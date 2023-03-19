describe('DashboardTableStudent', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[name="email"]').type('nuno.alcantara@pontue.com.br')
    cy.get('input[name="password"]').type('123456@pontue')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  it('renders the table header correctly', () => {
    cy.get('th').eq(0).contains('Número')
    cy.get('th').eq(1).contains('Data de criação')
    cy.get('th').eq(2).contains('Ações')
  })
})
