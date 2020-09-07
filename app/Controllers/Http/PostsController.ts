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

  public async edit({ view }: HttpContextContract) {
    return view.render('posts/edit')
  }

  public async update(ctx: HttpContextContract) {
    ctx.params
  }

  public async destroy(ctx: HttpContextContract) {
    ctx.params
  }
}
