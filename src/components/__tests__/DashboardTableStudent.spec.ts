import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import DashboardTableStudent from '@/components/DashboardTableStudent.vue';

describe('DashboardTableStudent', () => {
  it('renders the table header properly', () => {
    const wrapper = mount(DashboardTableStudent);

    const headers = wrapper.findAll('th');
    expect(headers[0].text()).toContain('Número');
    expect(headers[1].text()).toContain('Data de criação');
    expect(headers[2].text()).toContain('Ações');
  });

  it('renders the table with data properly', async () => {
    const testWordings = [
      {
        id: '1',
        numero: 1,
        created_at: '2023-01-01T00:00:00',
      },
      {
        id: '2',
        numero: 2,
        created_at: '2023-01-02T00:00:00',
      },
    ];

    const wrapper = mount(DashboardTableStudent, {
      props: {
        wordings: testWordings,
      },
    });

    wrapper.vm.paginatedWordings = testWordings;

    await wrapper.vm.$nextTick();

    const tableRows = wrapper.findAll('tbody tr');
    expect(tableRows.length).toBe(2);

    const firstRowColumns = tableRows[0].findAll('td');
    expect(firstRowColumns[0].text()).toContain('1');
    expect(firstRowColumns[1].text()).toContain('01/01/2023');

    const secondRowColumns = tableRows[1].findAll('td');
    expect(secondRowColumns[0].text()).toContain('2');
    expect(secondRowColumns[1].text()).toContain('02/01/2023');
  });
});
