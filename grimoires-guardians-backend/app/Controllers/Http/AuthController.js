'use strict'

const User = use('App/Models/User')
const Logger = use('Logger')

class AuthController {
    async register({ request, auth, response }) {
        try {
            Logger.info('Register endpoint hit')
            const { username, email, password } = request.all()
            Logger.info('Received data: %j', { username, email })

            // Create the user
            const user = await User.create({
                username,
                email,
                password
            })
            Logger.info('User created: %j', user)

            // Generate token for user
            const token = await auth.generate(user)
            Logger.info('Token generated')

            return response.json({
                message: 'User registered successfully',
                data: user,
                token
            })
        } catch (error) {
            Logger.error('Error in register method: %j', error)
            return response.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    }

    async login({ request, auth, response }) {
        try {
            Logger.info('Login endpoint hit')
            const { email, password } = request.all()
            Logger.info('Login data received: %j', { email })

            // Validate user credentials and generate token
            const token = await auth.attempt(email, password)
            Logger.info('Token generated for login')

            return response.json({
                message: 'User logged in successfully',
                token
            })
        } catch (error) {
            Logger.error('Error in login method: %j', error)
            return response.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    }
}

module.exports = AuthController
