'use strict';

const Model = use('Model');
const Database = use('Database');

class Game extends Model {

    users() {
        return this.belongsToMany('App/Models/User')
            .pivotTable('game_user');
    }

    mj() {
        return this.belongsTo('App/Models/User', 'mj_id', 'id');
    }

    players() {
        return this.belongsToMany('App/Models/User').pivotTable('game_user');
    }

    async setChatHistory(chatHistory) {
        if (chatHistory) {
            const chatHistoryString = JSON.stringify(chatHistory);

            if (!chatHistoryString) {
                throw new Error('Chat history is empty after JSON.stringify');
            }

            try {
                await Database.table('games')
                    .where('id', this.id)
                    .update({ chat_history: chatHistoryString });
            } catch (error) {
                console.error('Error saving chat history:', error);
            }
        } else {
            throw new Error('Chat history is required');
        }
    }

    getChatHistory() {
        return JSON.parse(this.chat_history || '[]');
    }

    async setFileStructure(type, structure) {
        if (structure) {
            const structureString = JSON.stringify(structure);

            if (!structureString) {
                throw new Error(`${type} structure is empty after JSON.stringify`);
            }

            try {
                const updateData = {};
                updateData[`${type}_files_structure`] = structureString;

                await Database.table('games')
                    .where('id', this.id)
                    .update(updateData);
            } catch (error) {
                console.error(`Error saving ${type} structure:`, error);
            }
        } else {
            throw new Error(`${type} structure is required`);
        }
    }

    getFileStructure(type) {
        const structureField = this[`${type}_files_structure`];
        return JSON.parse(structureField || '[]');
    }
}

module.exports = Game;
