'use strict'

const Model = use('Model')
const Database = use('Database')

class Game extends Model {
    mj() {
        return this.belongsTo('App/Models/User', 'mj_id', 'id')
    }

    players() {
        return this.belongsToMany('App/Models/User').pivotTable('game_user')
    }

    async setChatHistory(chatHistory) {
        if (chatHistory) {
            console.log('Entrée dans setChatHistory');
            const chatHistoryString = JSON.stringify(chatHistory);
            console.log('this.chat_history:', chatHistoryString);

            // Vérification que chatHistoryString n'est pas vide
            if (!chatHistoryString) {
                throw new Error('Chat history is empty after JSON.stringify');
            }

            try {
                // Utiliser Knex pour mettre à jour la base de données
                await Database.table('games')
                    .where('id', this.id)
                    .update({ chat_history: chatHistoryString });

                console.log('Chat history saved successfully');
            } catch (error) {
                console.error('Error saving chat history:', error);

                // Afficher les informations de requête SQL
                console.error('SQL:', `update games set chat_history = '${chatHistoryString}' where id = ${this.id}`);
            }
        } else {
            throw new Error('Chat history is required');
        }
    }

    getChatHistory() {
        return JSON.parse(this.chat_history || '[]')
    }
}

module.exports = Game
