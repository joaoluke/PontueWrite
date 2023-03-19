import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import FormLogin from '@/components/LoginForm.vue'

describe('FormLogin', () => {
  it('renders email and password fields properly', () => {
    const wrapper = mount(FormLogin)

    const emailField = wrapper.find('#email')
    expect(emailField.exists()).toBe(true)

    const passwordField = wrapper.find('#password')
    expect(passwordField.exists()).toBe(true)
  })
})
