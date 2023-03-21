import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { storeMock } from '@/__mocks__/store'
import DeleteModal from '@/components/DeleteConfirmationModal.vue'

describe('DeleteModal.vue', () => {
  it('renders the DeleteModal component', () => {
    const wrapper = mount(DeleteModal, {
      global: {
        plugins: [storeMock]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
