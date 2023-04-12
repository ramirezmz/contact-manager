import dotenv from 'dotenv'

dotenv.config()

const API_URL = process.env.API_URL || 'http://localhost:3000'

async function createAccount (name, username, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, username, password })
  })
  if (response.status === 200) {
    return response.json()
  }
  return false
}

async function login (username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  if (response.status === 200) {
    return response.json()
  }
  return false
}

async function createContact (name, phone, email, userId) {
  const response = await fetch(`${API_URL}/contact/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, phone, email })
  })
  if (response.status === 200) {
    return response.json()
  }
  return false
}

async function readAllContacts (token) {
  const response = await fetch(`${API_URL}/me/contacts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }
  })
  if (response.status === 200) {
    return response.json()
  }
  return false
}

async function deleteContact (id) {
  const response = await fetch(`${API_URL}/me/contact/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.status === 200) {
    return response.json()
  }
  return false
}

export default {
  createAccount,
  login,
  createContact,
  readAllContacts,
  deleteContact
}
