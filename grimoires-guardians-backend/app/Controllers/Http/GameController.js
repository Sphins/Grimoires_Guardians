'use strict'

const Game = use('App/Models/Game')
const User = use('App/Models/User')
const { validate } = use('Validator')

class GameController {
    async create({ request, auth, response }) {
        try {
            const { name, description } = request.all()
            const user = await auth.getUser()

            const game = await Game.create({
                name,
                description,
                mj_id: user.id
            })

            return response.status(201).json({
                message: 'Partie créée avec succès',
                data: game
            })
        } catch (error) {
            console.error('Error creating game:', error)
            return response.status(500).json({
                message: 'Erreur lors de la création de la partie',
                error: error.message
            })
        }
    }

    async getMjGames({ auth, response }) {
        try {
            const user = await auth.getUser()
            const games = await Game.query().where('mj_id', user.id).fetch()

            return response.json({
                message: 'Parties récupérées avec succès',
                data: games
            })
        } catch (error) {
            console.error('Error fetching MJ games:', error)
            return response.status(500).json({
                message: 'Erreur lors de la récupération des parties',
                error: error.message
            })
        }
    }

    async getPlayerGames({ auth, response }) {
        try {
            const user = await auth.getUser()
            const games = await user.games().fetch()

            return response.json({
                message: 'Parties récupérées avec succès',
                data: games
            })
        } catch (error) {
            console.error('Error fetching player games:', error)
            return response.status(500).json({
                message: 'Erreur lors de la récupération des parties',
                error: error.message
            })
        }
    }

    async deleteGame({ params, response }) {
        try {
            const game = await Game.findOrFail(params.id);
            await game.delete();

            return response.json({
                success: true,
                message: 'Game deleted successfully'
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to delete game',
                error: error.message
            });
        }
    }

    async updateGame({ params, request, auth, response }) {
        try {
            const user = await auth.getUser()
            const { name, description } = request.all()

            console.log(`Attempting to update game with id ${params.id} by user ${user.id}`)

            const game = await Game.query().where('id', params.id).where('mj_id', user.id).first()

            if (!game) {
                console.log(`Game not found or not authorized for user ${user.id}`)
                return response.status(404).json({
                    message: 'Partie non trouvée ou non autorisée'
                })
            }

            game.name = name || game.name
            game.description = description || game.description

            await game.save()
            console.log(`Game with id ${params.id} updated successfully`)

            return response.json({
                message: 'Partie mise à jour avec succès',
                data: game
            })
        } catch (error) {
            console.error('Error updating game:', error)
            return response.status(500).json({
                message: 'Erreur lors de la mise à jour de la partie',
                error: error.message
            })
        }
    }

    async saveChatHistory({ request, params, auth, response }) {
        const rules = {
            history: 'required|array'
        }
        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(400).json({
                message: 'Validation failed',
                errors: validation.messages()
            })
        }

        try {
            const user = await auth.getUser()
            const game = await Game.find(params.id)

            if (game.mj_id !== user.id && !await game.players().where('user_id', user.id).first()) {
                return response.status(403).json({
                    message: 'Access forbidden'
                })
            }
            const chatHistory = request.input('history')
            console.log('chatHistoryController', chatHistory)
            await game.setChatHistory(chatHistory)

            return response.json({
                message: 'Chat history saved successfully',
                data: chatHistory
            })
        } catch (error) {
            console.error('Error saving chat history:', error)
            return response.status(500).json({
                message: 'Error saving chat history',
                error: error.message
            })
        }
    }



    async getChatHistory({ params, auth, response }) {
        try {
            const user = await auth.getUser()
            const game = await Game.find(params.id)

            if (game.mj_id !== user.id && !await game.players().where('user_id', user.id).first()) {
                return response.status(403).json({
                    message: 'Access forbidden'
                })
            }

            const chatHistory = game.getChatHistory() || []

            return response.json({
                message: 'Historique du chat récupéré avec succès',
                data: chatHistory
            })
        } catch (error) {
            console.error('Error getting chat history:', error)
            return response.status(500).json({
                message: 'Erreur lors de la récupération de l\'historique du chat',
                error: error.message
            })
        }
    }

    async addUser({ request, params, response }) {
        try {
            const { userId } = request.only(['userId']);
            const game = await Game.findOrFail(params.id);
            const user = await User.findOrFail(userId);

            await game.users().attach([user.id]);

            return response.json({
                success: true,
                message: 'User added successfully'
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to add user',
                error: error.message
            });
        }
    }

    async removeUser({ params, response }) {
        try {
            const game = await Game.findOrFail(params.id);
            const user = await User.findOrFail(params.userId);

            await game.users().detach([user.id]);

            return response.json({
                success: true,
                message: 'User removed successfully'
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to remove user',
                error: error.message
            });
        }
    }

    async getMembers({ params, response }) {
        try {
            const game = await Game.findOrFail(params.id);
            const members = await game.users().fetch();

            return response.json({
                success: true,
                members: members.toJSON()
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch members',
                error: error.message
            });
        }
    }

}

module.exports = GameController
