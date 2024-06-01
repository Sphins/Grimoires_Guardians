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
                return data.fileType === 'Capacité';
            });

            return response.json({
                success: true,
                capacities: capacities
            });
        } catch (error) {
            console.error('Error fetching capacities:', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch capacities'
            });
        }
    }

    async getItemsByGame({ params, response }) {
        const { gameId } = params;

        try {
            const items = await Item.query().where('game_id', gameId).fetch();

            const formattedItems = items.toJSON().map(item => {
                return {
                    id: item.id,
                    data: JSON.parse(item.data),
                };
            });

            return response.status(200).json({ items: formattedItems });
        } catch (error) {
            console.error('Error fetching items:', error);
            return response.status(500).json({ error: 'Failed to fetch items' });
        }
    }
}

module.exports = ItemController;
