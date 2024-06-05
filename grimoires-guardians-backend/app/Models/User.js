'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  /**
   * A relationship on games created by the user as MJ.
   *
   * @method games
   *
   * @return {Object}
   */
  games() {
    return this.hasMany('App/Models/Game', 'id', 'mj_id')
  }

  /**
   * A relationship on games the user is participating in.
   *
   * @method participatedGames
   *
   * @return {Object}
   */
  participatedGames() {
    return this.belongsToMany('App/Models/Game').pivotTable('game_user')
  }

  games() {
    return this.belongsToMany('App/Models/Game')
      .pivotTable('game_user');
  }
}

module.exports = User
