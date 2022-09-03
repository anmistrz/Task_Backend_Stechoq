const { Router } = require('express')
const m$comment = require('../modules/comments.modules')
const response = require('../helpers/response')

const BlogController = Router()

/**
 * Add Comment
 * @param {string} content
 * @param {number} id_user
 * @param {number} id_article
 */
 BlogController.post('/', async (req, res, next) => {
    const add = await m$comment.addComment(req.body)

    response.sendResponse(res, add)
})

module.exports = BlogController