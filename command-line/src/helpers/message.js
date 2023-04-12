import { sleep } from '../utils/sleep.js'
import { spinner } from '../utils/spinner.js'
import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import inquirer from 'inquirer'
import API from '../services/api.js'
import factoryUserLogged from '../helpers/factoryUserLogged.js'
import Command from './commands/index.js'

const newUser = {}
const userLogged = {}
let contacts = []

async function welcome () {
  const rainbowTitle = chalkAnimation.rainbow(
    'Welcome to Contact App CLI by @ramirezmz \n'
  )
  await sleep()
  rainbowTitle.stop()

  console.log(`
  ${chalk.bgGreenBright.black('🚀WHY DO YOU WANT TO USE THIS APP?')}
    This application is a simple contact manager that allows you to create, read, update and delete contacts.
  `)
}
async function menu () {
  const answers = await inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: [
      'Login to your account',
      'Create an account',
      'Exit',
      'Sudo mode'
    ]
  })
  if (answers.menu === 'Login to your account') {
    await login()
  }
  if (answers.menu === 'Create an account') {
    await register()
  }
  if (answers.menu === 'Exit') {
    await Command.exit()
  }
  if (answers.menu === 'Sudo mode') {
    console.log('Sudo mode activated')
  }
}
async function register () {
  const answers = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is your name?',
      default () {
        return 'Player'
      }
    },
    {
      name: 'username',
      type: 'input',
      message: 'What will be your username?',
      default () {
        return 'Player-wins'
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'What will be your password?',
      mask: '*',
      default () {
        return '123456'
      },
      validate (value) {
        if (value.length < 6) {
          return 'The password must be at least 6 characters'
        }
        Object.assign(newUser, { password: value })
        return true
      }
    },
    {
      name: 'confirmation',
      type: 'password',
      message: 'Please, type your password again?',
      mask: '*',
      default () {
        return '123456'
      },
      validate (value) {
        if (value !== newUser.password) {
          return 'The passwords do not match'
        }
        return true
      }
    }
  ])
  spinner.start()
  Object.assign(newUser, answers)
  const sendForm = await API.createAccount(newUser.name, newUser.username, newUser.password)
  if (sendForm.statusCode === 201) {
    await sleep()
    spinner.stop()
    console.log(`
    ${chalk.bgBlueBright.whiteBright('User created with successful!🥳🥳🥳')}`)
    await menu()
  } else {
    await sleep()
    spinner.stop()
    console.log(`
    ${chalk.bgRedBright.whiteBright(`${sendForm.body.name}🤬🤬🤬`)}
    `)
    await menu()
  }
}

async function login () {
  const answers = await inquirer.prompt([
    {
      name: 'username',
      type: 'input',
      message: 'Please, type your username: ',
      default () {
        return 'Player-wins'
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Please, type your password: ',
      mask: '*',
      default () {
        return '123456'
      }
    }
  ])
  spinner.start()
  const sendForm = await API.login(answers.username, answers.password)
  const { statusCode, body } = sendForm

  if (statusCode === 400) {
    await sleep()
    spinner.stop()
    console.log(`
    ${chalk.bgRedBright.whiteBright('Username or password incorrect!🤬🤬🤬')}
    ${chalk.bgBlueBright.whiteBright('Please, try again!🧐🧐🧐')}
    `)
    await login()
  } else {
    if (statusCode === 200) {
      Object.assign(userLogged, factoryUserLogged(body))
      await sleep()
      spinner.stop()
      console.log(`
    ${chalk.bgBlueBright.whiteBright('User logged in with successful!🥳🥳🥳')}`)
      await menuLogged()
    } else {
      await sleep()
      spinner.stop()
      console.log(`
    ${chalk.bgGray.whiteBright('User not logged in!😢😢😢')}
    `)
      await menu()
    }
  }
}
async function menuLogged () {
  const answers = await inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: `Hello ${userLogged.username}, what do you want to do?`,
    choices: ['Create a contact', 'Read all contacts', 'Update a contact', 'Delete a contact', 'Exit']
  })
  if (answers.menu === 'Create a contact') {
    await createContact()
  }
  if (answers.menu === 'Read all contacts') {
    const allContacts = await API.readAllContacts(userLogged.token)
    // TODO: melhorar a visualização dos dados
    if (allContacts.body.data.length === 0) {
      console.log('No contacts found')
      await menuLogged()
    }
    contacts = allContacts.body.data
    console.table(allContacts.body.data)
    await menuLogged()
  }
  if (answers.menu === 'Update a contact') {
    console.log('Update a contact')
  }
  if (answers.menu === 'Delete a contact') {
    console.log('Delete a contact')
    await deleteContact()
  }
  if (answers.menu === 'Exit') {
    await menu()
  }
}
async function createContact () {
  const answers = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the name of the contact?',
      default () {
        return 'Player'
      }
    },
    {
      name: 'phone',
      type: 'input',
      message: 'What is the phone number of the contact?',
      default () {
        return '998876565'
      }
    },
    {
      name: 'email',
      type: 'input',
      message: 'What is the email of the contact?',
      default () {
        return 'test@mail.com'
      }
    }
  ])
  spinner.start()
  const contact = await API.createContact(answers.name, answers.phone, answers.email, userLogged.id)
  const { statusCode, body } = contact
  if (statusCode === 201) {
    await sleep()
    spinner.stop()
    console.log(`
    ${chalk.bgBlueBright.whiteBright('Contact created with successful!🥳🥳🥳')}`)
    await menuLogged()
  } else {
    await sleep()
    spinner.stop()
    console.log(`
    ${chalk.bgRedBright.whiteBright(`${body.message}🤬🤬🤬`)}
    `)
    await menuLogged()
  }
}

async function deleteContact () {
  if (contacts.length === 0) {
    const allContacts = await API.readAllContacts(userLogged.token)
    contacts = allContacts.body.data
  }
  if (contacts.length === 0) {
    console.log('No contacts found')
    await menuLogged()
  }
  const choicesContact = contacts.map(contact => ({
    name: contact.name,
    value: { id: contact._id, name: contact.name }
  }))
  const answers = await inquirer.prompt({
    type: 'list',
    name: 'contact',
    message: 'Choose a contact to delete:',
    choices: choicesContact
  })
  spinner.start()
  const contact = await API.deleteContact(answers.contact.id, userLogged.token)
  const { statusCode, body } = contact
  if (statusCode === 200) {
    await sleep()
    spinner.stop()
    console.log(`
    ${chalk.bgBlueBright.whiteBright(`Contact ${answers.contact.name} deleted with successful!🥳🥳🥳`)}`)
    await menuLogged()
  }
  if (statusCode === 404) {
    await sleep()
    spinner.stop()
    console.log(`
    ${chalk.bgRedBright.whiteBright(`${body.message}🤬🤬🤬`)}
    `)
    await menuLogged()
  }
}

export default {
  welcome,
  menu,
  register
}
