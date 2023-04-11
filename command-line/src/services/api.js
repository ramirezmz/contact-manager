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
  } else {
    return false
  }
}

export default {
  createAccount
}
