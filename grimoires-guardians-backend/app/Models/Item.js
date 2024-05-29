'use strict';

const Model = use('Model');

class Item extends Model {
    game() {
        return this.belongsTo('App/Models/Game');
    }

    type() {
        return this.belongsTo('App/Models/ItemType', 'type_id', 'id');
    }

    hero() {
        return this.belongsTo('App/Models/Hero', 'hero_id', 'id');
    }
}

module.exports = Item;
