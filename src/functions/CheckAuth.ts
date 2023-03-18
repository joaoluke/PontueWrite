export function checkAuth() {
  const token = localStorage.getItem('token')
  return !!token
}
