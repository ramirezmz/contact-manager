import chalkAnimation from 'chalk-animation'
import { sleep } from '../../utils/sleep.js'

async function exit () {
  const rainbowTitle = chalkAnimation.pulse(
    'Thanks for using Contact App CLI by @ramirezmz \n'
  )
  await sleep()
  rainbowTitle.stop()
  process.exit(0)
}

export default {
  exit
}
