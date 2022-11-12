import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'

test.group('Users', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('ensure we can get logged in user details', async ({ assert, client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/auth/me').loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().id, user.id)
  })

  test('ensure auth check returns correct status when guest', async ({ client }) => {
    const response = await client.get('/auth/check')

    response.assertStatus(200)
    response.assertBodyContains({ authenticated: false })
  })

  test('ensure auth check returns correct status when auth', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/auth/check').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({ authenticated: true })
  })
})

test.group('Users | Register', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('ensure user can register', async ({ client }) => {
    const response = await client.post('/auth/register').json({
      email: 'romain.lanz@example.com',
      username: 'romainlanz',
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })

    response.assertStatus(201)
  })

  test('ensure user cannot register with an existing email', async ({ client }) => {
    await UserFactory.merge({ email: 'romain.lanz@example.com' }).create()

    const response = await client.post('/auth/register').json({
      email: 'romain.lanz@example.com',
      username: 'romainlanz',
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          rule: 'unique',
          message: 'An account already exists with the provided email.',
        },
      ],
    })
  })

  test('ensure user cannot register with an invalid email', async ({ client }) => {
    const response = await client.post('/auth/register').json({
      email: 'romain.lanz',
      username: 'romainlanz',
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          rule: 'email',
          message: 'Your email is not valid.',
        },
      ],
    })
  })

  test('ensure user cannot register with a short password', async ({ client }) => {
    const response = await client.post('/auth/register').json({
      email: 'romain.lanz@example.com',
      username: 'romainlanz',
      password: 'secret',
      password_confirmation: 'secret',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'password',
          rule: 'minLength',
          message: 'Your password needs to be at least 8 characters long.',
        },
      ],
    })
  })

  test('ensure user cannot register with a password that does not match', async ({ client }) => {
    const response = await client.post('/auth/register').json({
      email: 'romain.lanz@example.com',
      username: 'romainlanz',
      password: 'secret1234',
      password_confirmation: 'secret12345',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'password_confirmation',
          rule: 'confirmed',
          message: 'Passwords do not match.',
        },
      ],
    })
  })

  test('ensure user cannot register with a username that is already taken', async ({ client }) => {
    await UserFactory.merge({ username: 'romainlanz' }).create()

    const response = await client.post('/auth/register').json({
      email: 'romain.lanz@example.com',
      username: 'romainlanz',
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'username',
          rule: 'unique',
          message: 'An account already exists with the provided username.',
        },
      ],
    })
  })

  test('ensure user cannot register with a username that is too short', async ({ client }) => {
    const response = await client.post('/auth/register').json({
      email: 'romain.lanz@example.com',
      username: 'rom',
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'username',
          rule: 'minLength',
          message: 'Your username needs to be at least 4 characters long.',
        },
      ],
    })
  })

  test('ensure user cannot register with a username that is too long', async ({ client }) => {
    const response = await client.post('/auth/register').json({
      email: 'romain.lanz@example.com',
      username: 'romainlanzromainlanzromainlanzromainlanzromainlanzromainlanz',
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'username',
          rule: 'maxLength',
          message: 'Your username cannot be longer than 25 characters.',
        },
      ],
    })
  })
})
