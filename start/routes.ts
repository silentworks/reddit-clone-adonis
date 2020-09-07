/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PostsController.index')
Route.resource('posts', 'PostsController').middleware({
    create: 'auth',
    edit: 'auth',
    update: 'auth',
    store: 'auth',
    destroy: 'auth'
})

Route.group(() => {
    Route.post('comments', 'CommentsController.store')

    Route.get('profile', 'UsersController.show')
    Route.get('profile/edit', 'UsersController.edit').as('profile.edit')
    Route.post('profile/edit', 'UsersController.update')
}).middleware('auth')

Route.on('login').render('auth/login')
Route.post('login', 'AuthController.login')
Route.on('register').render('auth/register')
Route.post('register', 'AuthController.register')
Route.get('signout', 'AuthController.signout')
