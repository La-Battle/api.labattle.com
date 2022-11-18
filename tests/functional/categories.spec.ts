import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { CategoryFactory } from 'Database/factories/CategoryFactory'

test.group('Category | Adding and validating query data ', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('Should add a category to the database', async ({ client }) => {
    const response = await client.post('/categories').json({
      name: 'Example of a category',
    })

    response.assertStatus(201)
  })

  test('Should assure us, that we are not registering an existing category', async ({ client }) => {
    await CategoryFactory.merge({ name: 'Example of a category' }).create()

    const response = await client.post('/categories').json({
      name: 'Example of a category',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'name',
          rule: 'unique',
          message: 'A category already exists with this name.',
        },
      ],
    })
  })

  test('Should ensure that the minimum number of characters required for adding an category is respected', async ({
    client,
  }) => {
    const response = await client.post('/categories').json({
      name: 'Cat',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'name',
          rule: 'minLength',
          message: 'Your category name must be at least 4 characters long.',
        },
      ],
    })
  })

  test('Should ensure that the maximum number of characters required to add a category is respected', async ({
    client,
  }) => {
    const response = await client.post('/categories').json({
      name: 'The category name cannot exceed 25 characters.',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'name',
          rule: 'maxLength',
          message: 'The category name cannot exceed 25 characters.',
        },
      ],
    })
  })
})

test.group('Category | Other CRUD operations', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('Should return the list of categories', async ({ client }) => {
    const response = await client.get('/categories')

    response.assertStatus(200)
  })

  test('Should return data from a specific category', async ({ client }) => {
    const category = await CategoryFactory.create()

    const response = await client.get(`/categories/${category?.id}`)

    response.assertStatus(200)
  })

  test('Should modify a specific category', async ({ client }) => {
    const category = await CategoryFactory.create()

    const response = await client.put(`/categories/${category?.id}`).json({
      name: 'category edit',
    })

    response.assertStatus(200)
  })

  test('Should delete a specific category', async ({ client }) => {
    const category = await CategoryFactory.create()
    const response = await client.delete(`/categories/${category?.id}`)

    response.assertStatus(200)
  })
})
