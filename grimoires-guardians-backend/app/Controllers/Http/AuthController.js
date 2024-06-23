'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({ request, auth, response }) {
        const { username, email, password } = request.all()

        // Create the user
        const user = await User.create({
            username,
            email,
            password
        })

        // Generate token for user
        const token = await auth.generate(user)

        return response.json({
            message: 'User registered successfully',
            data: user,
            token
        })
    }

    async login({ request, auth, response }) {
        const { email, password } = request.all()

        // Validate user credentials and generate token
        const token = await auth.attempt(email, password)

        return response.json({
            message: 'User logged in successfully',
            token
        })
    }
}

module.exports = AuthController
