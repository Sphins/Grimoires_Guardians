'use strict'

const User = use('App/Models/User')
const Game = use('App/Models/Game')
const Hash = use('Hash')

class UserController {

    async getUser({ auth, response }) {
        try {
            const user = await auth.getUser();
            return response.json(user);
        } catch (error) {
            return response.status(500).json({
                message: 'Erreur lors de la récupération des informations de l\'utilisateur',
                error: error.message
            });
        }
    }

    async updateUsername({ request, auth, response }) {
        try {
            const user = await auth.getUser()
            const { username } = request.all()

            user.username = username
            await user.save()

            return response.json({
                message: 'Pseudo mis à jour avec succès',
                data: user
            })
        } catch (error) {
            console.error('Error updating username:', error)
            return response.status(500).json({
                message: 'Erreur lors de la mise à jour du pseudo',
                error: error.message
            })
        }
    }

    async updateEmail({ request, auth, response }) {
        try {
            const user = await auth.getUser()
            const { email } = request.all()

            user.email = email
            await user.save()

            return response.json({
                message: 'Adresse e-mail mise à jour avec succès',
                data: user
            })
        } catch (error) {
            console.error('Error updating email:', error)
            return response.status(500).json({
                message: 'Erreur lors de la mise à jour de l\'adresse e-mail',
                error: error.message
            })
        }
    }

    async updatePassword({ request, auth, response }) {
        try {
            const user = await auth.getUser()
            const { password } = request.all()

            user.password = await Hash.make(password)
            await user.save()

            return response.json({
                message: 'Mot de passe mis à jour avec succès',
                data: user
            })
        } catch (error) {
            console.error('Error updating password:', error)
            return response.status(500).json({
                message: 'Erreur lors de la mise à jour du mot de passe',
                error: error.message
            })
        }
    }

    async search({ request, response }) {
        const query = request.input('q', '');
        const users = await User.query()
            .where('username', 'LIKE', `%${query}%`)
            .fetch();
        return response.json({ users: users.toJSON() });
    }
}

module.exports = UserController
