'use strict'

const Game = use('App/Models/Game')

class FileStructureController {
    async saveStructure({ request, params, response }) {
        console.log('saveStructure')
        const { gameId } = params
        const { type, structure } = request.only(['type', 'structure'])

        if (!['character', 'item', 'note'].includes(type)) {
            return response.status(400).json({ error: 'Invalid type' })
        }

        try {
            const game = await Game.findOrFail(gameId)
            await game.setFileStructure(type, structure)
            return response.json({ message: 'Structure saved successfully' })
        } catch (error) {
            return response.status(500).json({ error: 'Failed to save structure' })
        }
    }

    async loadStructure({ params, request, response }) {
        const { gameId } = params
        const { type } = request.get()

        if (!['character', 'item', 'note'].includes(type)) {
            return response.status(400).json({ error: 'Invalid type' })
        }

        try {
            const game = await Game.findOrFail(gameId)
            const structure = game.getFileStructure(type)
            return response.json({ structure })
        } catch (error) {
            return response.status(500).json({ error: 'Failed to load structure' })
        }
    }
}

module.exports = FileStructureController
