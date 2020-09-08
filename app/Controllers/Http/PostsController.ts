import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.query().preload('user')
    return view.render('posts/index', { posts })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('posts/new')
  }

  public async store({ request, auth, response, session }: HttpContextContract) {
    const postSchema = schema.create({
      title: schema.string({ trim: true }),
      url: schema.string({ trim: true })
    })

    const postDetails = await request.validate({
      schema: postSchema
    })

    // Create a new Post
    const post = new Post()
    post.title = postDetails.title
    post.url = postDetails.url

    await post.related('user').associate(auth.user!)
    session.flash('success', 'Post created successfully')
    response.redirect().back()
  }

  public async show({ view, params }: HttpContextContract) {
    const { id } = params
    const post = await Post.query().where({ id })
      .preload('user')
      .preload('comments', (query) => {
        query.preload('user')
      })
      .first()
    
    return view.render('posts/show', { post })
  }

  public async edit({ view, params }: HttpContextContract) {
    const { id } = params
    const post = await Post.findOrFail(id)
    return view.render('posts/edit', { post })
  }

  public async update({ request, auth, response, session, params }: HttpContextContract) {
    const postSchema = schema.create({
      title: schema.string({ trim: true }),
      url: schema.string({ trim: true })
    })

    const postDetails = await request.validate({
      schema: postSchema
    })

    // Update Post
    const { id } = params
    const user = auth.user!
    const post = await Post.query().where('id', id)
      .where('userId', user.id)
      .firstOrFail()
    post.title = postDetails.title
    post.url = postDetails.url
    await post.save()

    session.flash('success', 'Post updated successfully')
    response.redirect().back()
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const { id } = params
    const user = auth.user!
    await Post.query().where('id', id)
      .where('userId', user.id).delete()
    response.redirect('/')
  }
}
