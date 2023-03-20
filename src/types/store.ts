import type { WordingsAdmin } from './wordingAdmin'

export interface RootState {
  token: string | null
  idStudent: number | null
  formWordingOpen: boolean
  formWordingMode: string
  formWordingTitle: string
  wordings: WordingsAdmin[]
}

export interface LoginPayload {
  token: string
  idStudent: number
}
