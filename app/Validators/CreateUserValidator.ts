import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string([
      rules.trim(),
      rules.minLength(4),
      rules.maxLength(25),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    email: schema.string([
      rules.trim(),
      rules.lowercase(),
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.minLength(8), rules.confirmed()]),
  })

  public messages: CustomMessages = {
    'username.required': 'You need to specify a username.',
    'username.unique': 'An account already exists with the provided username.',
    'username.minLength': 'Your username needs to be at least 4 characters long.',
    'username.maxLength': 'Your username cannot be longer than 25 characters.',
    'email.required': 'You need to specify an email.',
    'email.unique': 'An account already exists with the provided email.',
    'email.maxLength': 'Your email cannot be longer than 255 characters.',
    'email.email': 'Your email is not valid.',
    'password.required': 'You need to specify a password.',
    'password.minLength': 'Your password needs to be at least 8 characters long.',
    'password_confirmation.confirmed': 'Passwords do not match.',
  }
}
