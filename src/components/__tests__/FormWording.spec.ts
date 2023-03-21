import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import FormWording from '@/components/FormWording.vue'
import { storeMock } from '@/__mocks__/store'

describe('FormWording', () => {
  it('renders the dialog properly', () => {
    const wrapper = mount(FormWording, {
      global: {
        provide: {
          store: storeMock
        }
      }
    })

    expect(wrapper.find('v-dialog').exists()).toBe(true)
  })
})
