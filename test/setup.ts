/* eslint-disable @typescript-eslint/no-unused-vars */
import { rm } from 'fs/promises'
import { join } from 'path'

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'))
    // eslint-disable-next-line prettier/prettier
  } catch (err) { /* empty */ }
})
