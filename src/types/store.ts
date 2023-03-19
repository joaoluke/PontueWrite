export interface RootState {
  token: string | null
  idStudent: number | null
  formWordingOpen: boolean
}

export interface LoginPayload {
  token: string
  idStudent: number
}
