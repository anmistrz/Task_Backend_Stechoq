const { Router } = require('express')
const m$blog = require('../modules/article.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const BlogController = Router()

/**
 * Add Article
 * @param {string} title
 * @param {string} description
 */
 BlogController.post('/', userSession, async (req, res, next) => {
    const add = await m$blog.addArticle(req.body)

    response.sendResponse(res, add)
})

/**
 * Edit Article
 * @param {number} id
 * @param {string} title
 * @param {string} description
 * @param {number} id_user
 */
 BlogController.put('/', userSession, async (req, res, next) => {
    const add = await m$blog.editArticle(req.body)

    response.sendResponse(res, add)
})

/**
 * Delete Article
 * @param {number} id
 */
 BlogController.delete('/:id', userSession, async (req, res, next) => {
    const add = await m$blog.deleteArticle(req.params.id)

    response.sendResponse(res, add)
})

module.exports = BlogController