function factoryUserLogged (body) {
  const { data } = body
  const { userExist, token } = data
  const { name, username, _id } = userExist
  const userLogged = {
    name,
    username,
    token,
    id: _id
  }
  return userLogged
}

export default factoryUserLogged
