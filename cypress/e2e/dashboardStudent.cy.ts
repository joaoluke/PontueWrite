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

  it('opens and closes add wording modal', () => {
    cy.get('.v-toolbar-items > :nth-child(1)').click()
    cy.get('.v-card-title').contains('Adicionar redação')
    cy.get('.v-card-actions > :nth-child(2)').click()
    cy.get('.modal').should('not.exist')
  })

  it('opens and closes edit wording modal', () => {
    cy.get(':nth-child(1) > :nth-child(3) > [style="background-color: rgb(187, 63, 148); color: white; margin-right: 5px;"]').first().click()
    cy.get('.v-card-title').contains('Editar redação')
    cy.get('.v-card-actions > :nth-child(2)').click()
    cy.get('.modal').should('not.exist')
  })

  it('opens and cancels remove wording modal', () => {
    cy.get(':nth-child(2) > :nth-child(3) > [style="background-color: rgb(167, 50, 102); color: white;"]').first().click()
    cy.get('.v-card-title').contains('Excluir Redação')
    cy.get('.v-card-actions > :nth-child(2)').click()
    cy.get('.modal').should('not.exist')
  })
})
