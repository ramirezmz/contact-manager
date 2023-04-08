import Message from './helpers/message.js'

async function main () {
  console.clear()
  await Message.welcome()
  await Message.menu()
}

main()
