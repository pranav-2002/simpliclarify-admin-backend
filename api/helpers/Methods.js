'use strict'
import bcrypt from 'bcryptjs'

const Methods = {
  comparePasswords
}

export default Methods

async function comparePasswords (passwordEntered, hash) {
  const match = await bcrypt.compare(passwordEntered, hash)
  return match
}
