import Route from '@ioc:Adonis/Core/Route'

Route.get('/auth/check', 'AuthController.check')
Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')

Route.group(() => {
  Route.get('/auth/me', 'AuthController.me')
  Route.delete('/auth/logout', 'AuthController.logout')
}).middleware('auth')
