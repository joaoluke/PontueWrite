import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import { storeMock } from '@/__mocks__/store';
import DashboardTableStudent from '@/components/DashboardTableStudent.vue';

const exampleData = [
  {
    id: 'test-id-1',
    numero: 1,
    created_at: '2023-03-20 22:25:12',
  },
  {
    id: 'test-id-2',
    numero: 2,
    created_at: '2023-03-21 22:25:12',
  },
];

describe('DashboardTableStudent', () => {
  it('renders the table header properly', async () => {
    storeMock.state.wordings = exampleData;
    const wrapper = mount(DashboardTableStudent, {
      global: {
        plugins: [storeMock],
      },
    });

    await wrapper.vm.updatePaginatedWordings();

    expect(wrapper.vm.paginatedWordings.length).toBe(exampleData.length);
  });

  it('renders the table headers properly', async () => {
    storeMock.state.wordings = exampleData;
    const wrapper = mount(DashboardTableStudent, {
      global: {
        plugins: [storeMock],
      },
    });

    const tableHeader = wrapper.find('thead');
    expect(tableHeader.text()).toContain('Número');
    expect(tableHeader.text()).toContain('Data de criação');
    expect(tableHeader.text()).toContain('Ações');
  });
});
