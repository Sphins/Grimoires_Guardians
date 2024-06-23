'use strict'

const Map = use('App/Models/Map')
const Drive = use('Drive')
const Helpers = use('Helpers')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')
const fs = require('fs')

class MapController {
  async index({ request, response, params }) {
    const { game_id } = params
    const maps = await Map.query().where('game_id', game_id).fetch()
    return maps
  }

  async store({ request, response }) {
    const file = request.file('file', {
      types: ['image', 'video'],
      size: '100mb' // Adjust as needed
    })

    const { name, description, game_id } = request.only(['name', 'description', 'game_id'])

    const fileName = `${uuidv4()}.${file.extname}`
    const filePath = `maps/${fileName}`
    const savePath = Helpers.publicPath(`img/${filePath}`)

    // Ensure directory exists
    this.ensureDirectoryExists(Helpers.publicPath('img/maps'))

    if (file.subtype === 'jpeg' || file.subtype === 'png') {
      // Convert image to WebP and save
      const imageBuffer = await sharp(file.tmpPath).webp().toBuffer()
      await Drive.put(savePath, imageBuffer)
    } else {
      // Save the file directly
      await file.move(Helpers.publicPath('img/maps'), {
        name: fileName,
        overwrite: true
      })
    }

    // Create a new map record in the database
    const map = await Map.create({
      name,
      description,
      file_path: fileName,
      game_id
    })

    return response.json({
      status: 'success',
      message: 'Map uploaded and saved!',
      map
    })
  }

  async update({ params, request, response }) {
    const { id } = params
    const map = await Map.find(id)
    if (!map) {
      return response.status(404).json({ error: 'Map not found' })
    }

    const { name, description } = request.only(['name', 'description'])
    map.merge({ name, description })
    await map.save()

    return response.json({
      status: 'success',
      message: 'Map updated!',
      map
    })
  }

  async show({ params, request, response }) {
    const { id } = params
    const map = await Map.find(id)
    if (!map) {
      return response.status(404).json({ error: 'Map not found' })
    }
    return map
  }

  async destroy({ params, request, response }) {
    const { id } = params
    const map = await Map.find(id)
    if (!map) {
      return response.status(404).json({ error: 'Map not found' })
    }

    // Delete the file from the server
    await this.deleteExistingFile('maps', map.file_path)

    await map.delete()
    return response.json({ status: 'success', message: 'Map deleted' })
  }

  ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  async deleteExistingFile(type, fileName) {
    if (!fileName) return

    const filePath = Helpers.publicPath(`img/${type}/${fileName}`)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }
}

module.exports = MapController
