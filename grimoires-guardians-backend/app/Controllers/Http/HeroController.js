'use strict'

const Hero = use('App/Models/Hero')
const Database = use('Database')

class HeroController {
    async getHeroes({ params, response }) {
        try {
            const heroes = await Hero.query().where('game_id', params.gameId).fetch();
            return response.status(200).json({ heroes: heroes.toJSON() });
        } catch (error) {
            console.error('Error fetching heroes:', error);
            return response.status(500).json({ error: 'Failed to fetch heroes' });
        }
    }

    async createHero({ request, response, params }) {
        const { name, fileType, type, parentId } = request.only(['name', 'fileType', 'type', 'parentId']);

        if (type === 'folder') {
            return response.status(201).json({
                message: 'Folder created successfully',
                hero: { id: `${Date.now()}`, name, type, children: [] }
            });
        }

        try {
            const hero = new Hero();
            hero.data = JSON.stringify({ name, fileType });
            hero.game_id = params.gameId;
            await hero.save();

            const newHeroObject = {
                id: hero.id,
                type: 'file',
                name: name,
                fileType: fileType,
                data: JSON.parse(hero.data)
            };

            return response.status(201).json({
                message: 'Hero created successfully',
                hero: newHeroObject
            });
        } catch (error) {
            console.error('Error creating hero:', error);
            return response.status(500).json({ error: 'Failed to create hero' });
        }
    }

    async loadHero({ params, response }) {
        const { heroId } = params;

        try {
            const hero = await Hero.find(heroId);
            if (!hero) {
                return response.status(404).json({ error: 'Hero not found' });
            }

            const heroData = JSON.parse(hero.data);
            const file = {
                id: hero.id,
                name: heroData.name,
                data: heroData,
                fileType: heroData.fileType
            };

            return response.status(200).json({ hero: file });
        } catch (error) {
            console.error('Error loading hero:', error);
            return response.status(500).json({ error: 'Failed to load hero' });
        }
    }

    async updateHero({ params, request, response }) {
        const { heroId } = params;
        const { name, data } = request.only(['name', 'data']);

        try {
            const hero = await Hero.find(heroId);
            if (!hero) {
                return response.status(404).json({ error: 'Hero not found' });
            }

            const currentData = JSON.parse(hero.data);
            hero.data = JSON.stringify({ name, fileType: currentData.fileType, ...data });
            await hero.save();

            return response.status(200).json({
                message: 'Hero updated successfully',
                hero: {
                    id: hero.id,
                    name: JSON.parse(hero.data).name,
                    data: JSON.parse(hero.data),
                    fileType: JSON.parse(hero.data).fileType
                }
            });
        } catch (error) {
            console.error('Error updating hero:', error);
            return response.status(500).json({ error: 'Failed to update hero' });
        }
    }

    async deleteHero({ params, response }) {
        const { gameId, heroId } = params;

        try {
            // Essayer de supprimer le héros de la base de données
            const hero = await Hero.find(heroId);
            if (hero) {
                await hero.delete();
                console.log(`Hero ${heroId} deleted from database`);
            } else {
                console.log(`Hero ${heroId} not found in database`);
            }

            // Récupération du jeu et de la structure
            const game = await Database.table('games').where('id', gameId).first();
            if (!game) {
                return response.status(404).json({ error: 'Game not found' });
            }

            const field = `character_files_structure`; // Utilisation de character_files_structure
            let structure = JSON.parse(game[field] || '[]');

            // Fonction récursive pour trouver et supprimer le héros
            const findAndRemoveHero = (items, id) => {
                return items.filter(item => {
                    if (item.id === id) {
                        return false;
                    }
                    if (item.children) {
                        item.children = findAndRemoveHero(item.children, id);
                    }
                    return true;
                });
            };

            structure = findAndRemoveHero(structure, heroId);

            // Mise à jour de la structure du jeu
            await Database.table('games').where('id', gameId).update({ [field]: JSON.stringify(structure) });
            console.log(`Hero ${heroId} deleted from structure`);

            return response.status(200).json({ message: 'Hero deleted successfully', structure });
        } catch (error) {
            console.error('Error deleting hero from structure:', error);
            return response.status(500).json({ error: 'Failed to delete hero from structure' });
        }
    }
}

module.exports = HeroController;
