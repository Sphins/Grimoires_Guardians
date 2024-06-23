'use strict'

const Drive = use('Drive')
const Helpers = use('Helpers')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

class ImageController {
    async upload({ request, response }) {
        const image = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        const type = request.input('type')
        const id = request.input('id') // Generic 'id' field for heroId, itemId, or noteId

        if (!['caracteres', 'notes', 'items'].includes(type)) {
            return response.status(400).json({ error: 'Invalid type' })
        }

        let Model
        if (type === 'caracteres') {
            Model = use('App/Models/Hero')
        } else if (type === 'items') {
            Model = use('App/Models/Item')
        } else if (type === 'notes') {
            Model = use('App/Models/Note')
        }

        const entity = await Model.find(id)
        if (!entity) {
            return response.status(404).json({ error: `${type.slice(0, -1)} not found` })
        }

        const oldImageName = entity.img
        const fileName = `${uuidv4()}.webp`
        const filePath = `img/${type}/${fileName}`
        const savePath = Helpers.publicPath(filePath)

        // Ensure directory exists
        this.ensureDirectoryExists(Helpers.publicPath(`img/${type}`))

        // Delete the existing image if it exists
        await this.deleteExistingImage(type, oldImageName)

        // Convert image to WebP and save
        const imageBuffer = await sharp(image.tmpPath).webp().toBuffer()
        await Drive.put(savePath, imageBuffer)

        // Update entity with the new image name
        entity.img = fileName
        await entity.save()

        return response.json({
            status: 'success',
            message: 'File uploaded!',
            url: `/${filePath}` // Ensure the URL starts with a '/'
        })
    }

    ensureDirectoryExists(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
    }

    async deleteExistingImage(type, fileName) {
        if (!fileName || fileName === 'default.jpg') return

        const filePath = Helpers.publicPath(`img/${type}/${fileName}`)
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
    }

    async getImage(params, response, modelName) {
        const Model = use(`App/Models/${modelName}`)
        const { id } = params

        const entity = await Model.find(id)
        if (!entity) {
            return response.status(404).json({ error: `${modelName} not found` })
        }

        const image = entity.img || 'default.webp'
        let filePath
        if (modelName === 'Hero') {
            filePath = `caracteres/${image}`
        } else if (modelName === 'Item') {
            filePath = `items/${image}`
        } else if (modelName === 'Note') {
            filePath = `notes/${image}`
        }

        return response.json({
            status: 'success',
            url: filePath ? `/${filePath}` : null // Ensure the URL starts with a '/'
        })
    }

    async getHeroImage({ params, response }) {
        return this.getImage(params, response, 'Hero')
    }

    async getItemImage({ params, response }) {
        return this.getImage(params, response, 'Item')
    }

    async getNoteImage({ params, response }) {
        return this.getImage(params, response, 'Note')
    }
}

module.exports = ImageController
