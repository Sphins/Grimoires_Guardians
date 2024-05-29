'use strict';

const Item = use('App/Models/Item');
const Database = use('Database');

class FileStructureController {
    async saveStructure({ request, response, params }) {
        const { gameId } = params;
        const { type, structure } = request.only(['type', 'structure']);

        try {
            const game = await Database.table('games').where('id', gameId).first();
            if (!game) {
                return response.status(404).json({ error: 'Game not found' });
            }

            const field = `${type}_files_structure`;
            const updatedData = { [field]: JSON.stringify(structure) };
            await Database.table('games').where('id', gameId).update(updatedData);

            return response.status(200).json({ message: 'Structure saved successfully' });
        } catch (error) {
            console.error('Error saving structure:', error);
            return response.status(500).json({ error: 'Failed to save structure' });
        }
    }

    async loadStructure({ params, request, response }) {
        const { gameId } = params;
        const { type } = request.only(['type']); // Assurez-vous de récupérer le type correctement

        try {
            const game = await Database.table('games').where('id', gameId).first();
            if (!game) {
                return response.status(404).json({ error: 'Game not found' });
            }

            const field = `${type}_files_structure`;
            const structure = JSON.parse(game[field] || '[]');

            return response.status(200).json({ structure });
        } catch (error) {
            console.error('Error loading structure:', error);
            return response.status(500).json({ error: 'Failed to load structure' });
        }
    }

    async createFile({ request, response, params }) {
        const { gameId } = params;
        const { name, fileType, data } = request.only(['name', 'fileType', 'data']);

        try {
            const item = new Item();
            item.game_id = gameId; // Assurez-vous que game_id est assigné ici
            item.data = JSON.stringify({ name, fileType, ...data });
            await item.save();

            const newItemObject = {
                id: item.id,
                type: 'file',
                name: name,
                fileType: fileType,
                data: JSON.parse(item.data)
            };

            return response.status(201).json({
                message: 'Item created successfully',
                item: newItemObject
            });
        } catch (error) {
            console.error('Error creating item:', error);
            return response.status(500).json({ error: 'Failed to create item' });
        }
    }

    async loadFile({ params, response }) {
        const { fileId } = params;

        try {
            const item = await Item.find(fileId);
            if (!item) {
                return response.status(404).json({ error: 'Item not found' });
            }

            const itemData = JSON.parse(item.data);
            const file = {
                id: item.id,
                name: itemData.name,
                data: itemData,
                fileType: itemData.fileType
            };

            return response.status(200).json({ item: file });
        } catch (error) {
            console.error('Error loading item:', error);
            return response.status(500).json({ error: 'Failed to load item' });
        }
    }

    async updateFile({ params, request, response }) {
        const { fileId } = params;
        const { name, data } = request.only(['name', 'data']);

        try {
            const item = await Item.find(fileId);
            if (!item) {
                return response.status(404).json({ error: 'Item not found' });
            }

            const currentData = JSON.parse(item.data);
            item.data = JSON.stringify({ name, fileType: currentData.fileType, ...data });
            await item.save();

            return response.status(200).json({
                message: 'Item updated successfully',
                item: {
                    id: item.id,
                    name: JSON.parse(item.data).name,
                    data: JSON.parse(item.data),
                    fileType: JSON.parse(item.data).fileType
                }
            });
        } catch (error) {
            console.error('Error updating item:', error);
            return response.status(500).json({ error: 'Failed to update item' });
        }
    }
}

module.exports = FileStructureController;
