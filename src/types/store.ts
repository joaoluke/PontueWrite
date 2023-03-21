import type { WordingsAdmin } from './wordingAdmin'
import type { WordingsStudent } from './wordingStudent'

export interface RootState {
  token: string | null
  idStudent: number | null
  formWordingOpen: boolean
  formWordingMode: string
  formWordingTitle: string
  wordings: WordingsAdmin[] | WordingsStudent[]
  deleteModalOpen: boolean
  wordingId: null | string
  isLoading: boolean
  urlId: string
}

export interface LoginPayload {
  token: string
  idStudent: number
}
