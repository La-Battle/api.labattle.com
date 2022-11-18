import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.minLength(4),
      rules.maxLength(25),
      rules.unique({ table: 'categories', column: 'name' }),
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'You need to specify a name.',
    'name.unique': 'A category already exists with this name.',
    'name.minLength': 'Your category name must be at least 4 characters long.',
    'name.maxLength': 'The category name cannot exceed 25 characters.',
  }
}
