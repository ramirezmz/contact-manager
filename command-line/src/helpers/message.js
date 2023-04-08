import { sleep } from '../utils/sleep.js'
import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'

async function welcome () {
  const rainbowTitle = chalkAnimation.rainbow(
    'Welcome to Contact App CLI by @ramirezmz \n'
  )
  await sleep()
  rainbowTitle.stop()

  console.log(`
  ${chalk.bgGreenBright.black('WHY DO YOU WANT TO USE THIS APP?')}
    You can use this app to:
    - Add a new contact
    - List all contacts
    - Search a contact by name
    - Delete a contact
    - Update a contact
  `)
}

export default {
  welcome
}
