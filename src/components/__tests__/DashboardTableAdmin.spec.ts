import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import DashboardTableAdmin from '@/components/DashboardTableAdmin.vue'

describe('DashboardTable', () => {
  it('renders the table header properly', () => {
    const wrapper = mount(DashboardTableAdmin)

    const headers = wrapper.findAll('th')
    expect(headers[0].text()).toContain('Aluno')
    expect(headers[1].text()).toContain('Turma')
    expect(headers[2].text()).toContain('Escola')
    expect(headers[3].text()).toContain('Número')
    expect(headers[4].text()).toContain('Data de criação')
    expect(headers[5].text()).toContain('Ações')
  })

  it('renders the table with data properly', async () => {
    const testWordings = [
      {
        id: '1',
        aluno: { nome_completo: 'John Doe', turma: { nome: 'A' } },
        escola: { nome: 'School A' },
        numero: 1,
        created_at: '2023-01-01T00:00:00',
      },
      {
        id: '2',
        aluno: { nome_completo: 'Jane Smith', turma: { nome: 'B' } },
        escola: { nome: 'School B' },
        numero: 2,
        created_at: '2023-01-02T00:00:00',
      },
    ]
  
    const wrapper = mount(DashboardTableAdmin, {
      props: {
        wordings: testWordings,
      },
    })
  
    wrapper.vm.paginatedWordings = testWordings
  
    await wrapper.vm.$nextTick()
  
    const tableRows = wrapper.findAll('tbody tr')
    expect(tableRows.length).toBe(2)
  
    const firstRowColumns = tableRows[0].findAll('td')
    expect(firstRowColumns[0].text()).toContain('John Doe')
    expect(firstRowColumns[1].text()).toContain('A')
    expect(firstRowColumns[2].text()).toContain('School A')
    expect(firstRowColumns[3].text()).toContain('1')
    expect(firstRowColumns[4].text()).toContain('01/01/2023')
  
    const secondRowColumns = tableRows[1].findAll('td')
    expect(secondRowColumns[0].text()).toContain('Jane Smith')
    expect(secondRowColumns[1].text()).toContain('B')
    expect(secondRowColumns[2].text()).toContain('School B')
    expect(secondRowColumns[3].text()).toContain('2')
    expect(secondRowColumns[4].text()).toContain('02/01/2023')
  })
})