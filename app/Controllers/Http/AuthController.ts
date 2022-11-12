import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    const user = await User.create(payload)
    await auth.login(user)

    return response.created()
  }
}
