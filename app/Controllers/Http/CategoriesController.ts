import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const categories = await Category.all()

    return response.ok(categories)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CategoryValidator)

    const newCategory = await Category.create(payload)

    response.created(newCategory)
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const category = await Category.findByOrFail('id', params.id)

      response.ok(category)
    } catch (error) {
      response.notFound('This category does not excite in the database')
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const payload = await request.validate(CategoryValidator)

      const categogy = await Category.findByOrFail('id', params.id)

      const updatecategogy = await categogy.merge(payload).save()

      response.ok(updatecategogy)
    } catch (error) {
      response.notFound('This category does not excite in the database')
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const categogy = await Category.findByOrFail('id', params.id)

      await categogy.delete()

      return response.ok('The category has been successfully removed')
    } catch (error) {
      response.notFound('This category does not excite in the database')
    }
  }
}
