function factoryAllContacts (data) {
  const arrayContact = data.body.data
  const finalArray = arrayContact.map((contact) => {
    return {
      id: contact._id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      createdAt: formatDate(contact.createdAt)
    }
  })
  return finalArray
}

function formatDate (dateValue) {
  const date = new Date(dateValue)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${day}/${month}/${year} at ${hour}:${minutes}:${seconds}`
}
export default factoryAllContacts
