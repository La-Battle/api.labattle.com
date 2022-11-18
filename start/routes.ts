import Route from '@ioc:Adonis/Core/Route'

Route.get('/auth/check', 'AuthController.check')
Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')

Route.group(() => {
  Route.get('/auth/me', 'AuthController.me')
  Route.delete('/auth/logout', 'AuthController.logout')
}).middleware('auth')

Route.group(() => {
  Route.get('/', 'CategoriesController.index').as('index')
  Route.get('/:id', 'CategoriesController.show').as('show')
  Route.post('/', 'CategoriesController.store').as('store')
  Route.put('/:id', 'CategoriesController.update').as('update')
  Route.delete('/:id', 'CategoriesController.destroy').as('destroy')
})
  .prefix('/categories')
  .as('categories')
