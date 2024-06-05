'use strict'

const Item = use('App/Models/Item')

class ItemController {

    async getCapacities({ params, response }) {
        try {
            const items = await Item.query()
                .where('game_id', params.gameId)
                .fetch();
            const capacities = items.toJSON().filter(item => {
                const data = JSON.parse(item.data);
                console.log('data:', data); // log 3
                return data.fileType == 'Capacité';
            });

            return response.json({
                success: true,
                capacities: capacities
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch capacities'
            });
        }
    }

    async getPaths({ params, response }) {
        try {
            const items = await Item.query()
                .where('game_id', params.gameId)
                .fetch();
            const paths = items.toJSON().filter(item => {
                const data = JSON.parse(item.data);
                console.log('data:', data); // log 3
                return data.fileType == 'Voie';
            });

            return response.json({
                success: true,
                paths: paths
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch paths'
            });
        }
    }

    async getProfiles({ params, response }) {

        try {
            const items = await Item.query()
                .where('game_id', params.gameId)
                .fetch()
            const profiles = items.toJSON().filter(item => {
                const data = JSON.parse(item.data);
                return data.fileType == 'Profil';
            });

            return response.json({
                success: true,
                profiles: profiles
            });
        } catch (error) {
            console.error('Error fetching profiles:', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch profiles'
            });
        }
    }

    async getRaces({ params, response }) {

        try {
            const items = await Item.query()
                .where('game_id', params.gameId)
                .fetch()
            const races = items.toJSON().filter(item => {
                const data = JSON.parse(item.data);
                return data.fileType == 'Peuple';
            });

            return response.json({
                success: true,
                profiles: races
            });
        } catch (error) {
            console.error('Error fetching races:', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch races'
            });
        }
    }

    async getItems({ params, response }) {
        try {
            const items = await Item.query()
                .where('game_id', params.gameId)
                .fetch();
            const equipmentItems = items.toJSON().filter(item => {
                const data = JSON.parse(item.data);
                const allowedTypes = ['Arme', 'Armure', 'Accessoire', 'Autre'];
                return allowedTypes.includes(data.fileType);
            });

            return response.json({
                success: true,
                items: equipmentItems
            });
        } catch (error) {
            console.error('Error fetching equipment items:', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch equipment items'
            });
        }
    }
}

module.exports = ItemController;