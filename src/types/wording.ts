export interface Wording {
  id: string
  aluno: {
    nome_completo: string
    turma: {
      nome: string
    }
  }
  escola: {
    nome: string
  }
  numero: number
  created_at: string
}
