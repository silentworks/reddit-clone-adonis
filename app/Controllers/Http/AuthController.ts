import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    public async signin({ auth, request, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        await auth.attempt(email, password)

        response.redirect('/')
    }

    public async signup({ request, auth, response }: HttpContextContract) {
        const validationSchema = schema.create({
            name: schema.string.optional({ trim: true }),
            email: schema.string({ trim: true }, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email' }),
            ]),
            password: schema.string({ trim: true }, [
                rules.confirmed()
            ])
        })

        const userDetails = await request.validate({
            schema: validationSchema
        })
        // Create a new user
        const user = new User()
        user.name = userDetails.name
        user.email = userDetails.email
        user.password = userDetails.password
        await user.save()

        await auth.login(user)
        response.redirect('/')
    }

    public async signout({ auth, response }: HttpContextContract) {
        await auth.logout()
        response.redirect('/')
    }
}
