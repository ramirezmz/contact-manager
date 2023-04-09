import { sleep } from '../utils/sleep.js'
import { spinner } from '../utils/spinner.js'
import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import inquirer from 'inquirer'

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
    console.log('Loginnnn')
  }
  if (answers.menu === 'Create an account') {
    console.log('Create an account')
    await register()
  }
  if (answers.menu === 'Exit') {
    await exitApp()
  }
  if (answers.menu === 'Sudo mode') {
    console.log('Sudo mode activated')
  }
}
const newUser = {}
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
  const sendFormWithSuccess = true
  if (sendFormWithSuccess) {
    await sleep()
    spinner.stop()
    console.log(`
    ${chalk.bgBlueBright.whiteBright('User created with successful!🥳🥳🥳')}`)
  } else {
    console.log(`
    ${chalk.bgRedBright.whiteBright('User not created!😢😢😢')}
    `)
  }
}
async function exitApp () {
  const rainbowTitle = chalkAnimation.pulse(
    'Thanks for using Contact App CLI by @ramirezmz \n'
  )
  await sleep()
  rainbowTitle.stop()
  process.exit(0)
}

export default {
  welcome,
  menu,
  register
}
