/// <reference types="cypress" />

describe('Dashboard Table', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[name="email"]').type('admin@pontue.com')
    cy.get('input[name="password"]').type('123456@pontue')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  it('renders the table header properly', () => {
    cy.get('th').eq(0).should('contain', 'Aluno')
    cy.get('th').eq(1).should('contain', 'Turma')
    cy.get('th').eq(2).should('contain', 'Escola')
    cy.get('th').eq(3).should('contain', 'Número')
    cy.get('th').eq(4).should('contain', 'Data de criação')
    cy.get('th').eq(5).should('contain', 'Ações')
  })
})
