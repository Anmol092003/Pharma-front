const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  })
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed (${response.status})`)
  }
  if (response.status === 204) return null
  return response.json()
}
export const getMedicines = (search = '') => request(`/medicines${search ? `?search=${encodeURIComponent(search)}` : ''}`)
export const createMedicine = (medicine) => request('/medicines', { method: 'POST', body: JSON.stringify(medicine) })
export const updateMedicine = (id, medicine) => request(`/medicines/${id}`, { method: 'PUT', body: JSON.stringify(medicine) })
export const deleteMedicine = (id) => request(`/medicines/${id}`, { method: 'DELETE' })
