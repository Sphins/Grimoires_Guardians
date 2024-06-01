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
            if (type == 'hero') {
                type = 'character'
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
        const { type } = request.only(['type']);

        try {
            const game = await Database.table('games').where('id', gameId).first();
            if (!game) {
                return response.status(404).json({ error: 'Game not found' });
            }
            if (type == 'hero') {
                type = 'character'
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
        const { name, fileType, type, parentId } = request.only(['name', 'fileType', 'type', 'parentId']);

        if (type === 'folder') {
            return response.status(201).json({
                message: 'Folder created successfully',
                item: { id: `${Date.now()}`, name, type, children: [] } // Crée un dossier avec un ID unique
            });
        }

        try {
            const item = new Item();
            item.game_id = gameId; // Assurez-vous que game_id est assigné ici
            item.data = JSON.stringify({ name, fileType });
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

    async deleteFile({ params, request, response }) {
        const { gameId, fileId } = params;
        let item;

        // Tentative de suppression dans la base de données
        try {
            item = await Item.find(fileId);
            if (item) {
                await item.delete();
            }
        } catch (error) {
            console.error('Error deleting item from database:', error);
        }

        // Suppression de la structure même si la suppression dans la base de données échoue
        try {
            const game = await Database.table('games').where('id', gameId).first();
            if (!game) {
                return response.status(404).json({ error: 'Game not found' });
            }

            const field = `item_files_structure`;
            let structure = JSON.parse(game[field] || '[]');

            const findAndRemoveItem = (items, id) => {
                return items.filter(item => {
                    if (item.id === id) {
                        return false;
                    }
                    if (item.children) {
                        item.children = findAndRemoveItem(item.children, id);
                    }
                    return true;
                });
            };

            structure = findAndRemoveItem(structure, fileId);

            await Database.table('games').where('id', gameId).update({ [field]: JSON.stringify(structure) });

            return response.status(200).json({ message: 'Item deleted successfully' });
        } catch (error) {
            console.error('Error deleting item from structure:', error);
            return response.status(500).json({ error: 'Failed to delete item from structure' });
        }
    }

    async loadItems({ params, response }) {
        const { gameId } = params;

        try {
            const items = await Item.query().where('game_id', gameId).fetch();
            return response.status(200).json({ items: items.toJSON() });
        } catch (error) {
            console.error('Error loading items:', error);
            return response.status(500).json({ error: 'Failed to load items' });
        }
    }
}

module.exports = FileStructureController;
