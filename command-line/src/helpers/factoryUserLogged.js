function factoryUserLogged (body) {
  const { data } = body
  const { userExist, token } = data
  const { name, username } = userExist
  const userLogged = {
    name,
    username,
    token
  }
  return userLogged
}

export default factoryUserLogged
