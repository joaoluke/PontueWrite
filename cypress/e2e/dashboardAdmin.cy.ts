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

  it('opens and closes edit wording modal', () => {
    cy.get(':nth-child(1) > :nth-child(6) > [style="background-color: rgb(187, 63, 148); color: white; margin-right: 5px;"]').first().click()
    cy.get('.v-card-title').contains('Editar redação')
    cy.get('.v-card-actions > :nth-child(2)').click()
    cy.get('.modal').should('not.exist')
  })

  it('opens and cancels remove wording modal', () => {
    cy.get(':nth-child(1) > :nth-child(6) > [style="background-color: rgb(167, 50, 102); color: white;"]').first().click()
    cy.get('.v-card-title').contains('Excluir Redação')
    cy.get('.v-card-actions > :nth-child(2)').click()
    cy.get('.modal').should('not.exist')
  })
})
