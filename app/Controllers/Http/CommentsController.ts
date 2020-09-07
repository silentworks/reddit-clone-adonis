import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Comment from 'App/Models/Comment'

export default class CommentsController {
    public async store({ request, auth, response, session }: HttpContextContract) {
        const commentSchema = schema.create({
            body: schema.string({ trim: true }),
            postId: schema.number()
          })
      
          const commentDetails = await request.validate({
            schema: commentSchema
          })
      
          // Create a new Post
          const comment = new Comment()
          comment.body = commentDetails.body
          comment.postId = commentDetails.postId
      
          await comment.related('user').associate(auth.user!)
          session.flash('success', 'Comment created successfully')
          response.redirect().back()
    }
    
    public async destroy({ request }: HttpContextContract) {}
}
