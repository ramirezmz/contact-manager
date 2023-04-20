function findUserByName (contacts, contactChoosed) {
  const foundedUser = contacts.find(contact => contact.name === contactChoosed)
  return foundedUser
}

export default findUserByName
