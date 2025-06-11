import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { BadRequestException, NotFoundException } from '@nestjs/common'

describe('Auth Service', () => {
  let service: AuthService
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    // create a fake copy of the users service
    const users: User[] = []
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email)
        return Promise.resolve(filteredUsers)
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
        } as User
        users.push(user)
        return Promise.resolve(user)
      },
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile()

    service = module.get(AuthService)
  })

  it('can create an instance of auth service', () => {
    expect(service).toBeDefined()
  })

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signUp('asdf@asdf.com', 'asdf')
    expect(user.password).not.toEqual('asdf')
    const [salt, hash] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signUp('asdf@asdf.com', 'asdf')
    await expect(service.signUp('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    )
  })

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signIn('haha@gmail.com', 'haha')).rejects.toThrow(
      NotFoundException,
    )
  })

  it('throws if an invalid password is provided', async () => {
    await service.signUp('sdsd@gmail.com', 'password')
    await expect(service.signIn('sdsd@gmail.com', 'sdsdsd')).rejects.toThrow(
      BadRequestException,
    )
  })

  it('returns a user if correct password is provided', async () => {
    await service.signUp('asdf@asdf.com', 'password')

    const user = await service.signIn('asdf@asdf.com', 'password')
    expect(user).toBeDefined()
  })
})
