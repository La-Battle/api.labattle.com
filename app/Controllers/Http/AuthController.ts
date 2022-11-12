import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public me({ auth }: HttpContextContract) {
    return auth.user
  }

  public async check({ auth, response }: HttpContextContract) {
    return response.ok({ authenticated: auth.isAuthenticated })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      await auth.attempt(email, password)
    } catch (error) {
      if (error.code === 'E_INVALID_AUTH_UID') {
        // Fake a hash mismatch to prevent user enumeration
        await Hash.verify(
          '$argon2id$v=19$t=3,m=4096,p=1$TpxPHHoMR5IA5g+4adkH7A$iGkuktlTTM/gKLao8A8h0hOPWmvdoR6uHyA3o2kd88Y',
          'secret1234'
        )
      }

      throw error
    }

    return response.noContent()
  }

  public async register({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    const user = await User.create(payload)
    await auth.login(user)

    return response.created()
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.noContent()
  }
}
