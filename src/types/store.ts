export interface RootState {
  token: string | null
  idStudent: number | null
  formWordingOpen: boolean
  formWordingTitle: string
}

export interface LoginPayload {
  token: string
  idStudent: number
}
