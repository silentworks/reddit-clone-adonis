import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
    public async show({ view, auth }: HttpContextContract) {
        const { id } = auth.user!
        const user = await User.query().where({ id })
            .preload('posts')
            .first()
        
        return view.render('users/show', { user })
    }
    
    public async edit({ view, auth }: HttpContextContract) {
        const { id } = auth.user!
        const user = await User.find(id)
        return view.render('users/edit', { user })
    }
    
    public async update({ request, auth, session, response}: HttpContextContract) {
        const userSchema = schema.create({
            name: schema.string.optional({ trim: true }),
            email: schema.string({ trim: true }, [
                rules.email()
            ]),
        })
    
        const userDetails = await request.validate({
            schema: userSchema
        })
    
        // Update user profile
        const user = await User.findOrFail(auth.user!.id)
        user.name = userDetails.name
        user.email = userDetails.email
        await user.save()
    
        session.flash('success', 'Profile updated successfully')
        response.redirect().toRoute('profile.edit')
    }
}
