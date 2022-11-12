import Route from '@ioc:Adonis/Core/Route'

Route.post('/auth/register', 'AuthController.register')
Route.get('/auth/check', 'AuthController.check')

Route.get('/auth/me', 'AuthController.me').middleware('auth')
