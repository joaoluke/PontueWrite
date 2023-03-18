export interface RootState {
  token: string | null
  idStudent: number | null
}

export interface LoginPayload {
  token: string
  idStudent: number
}
