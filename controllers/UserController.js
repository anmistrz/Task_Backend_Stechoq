const { Router } = require('express')
const m$user = require('../modules/users.modules')
const response = require('../helpers/response')

const BlogController = Router()

/**
 * List User
 */
 BlogController.get('/', async (req, res, next) => {
    const add = await m$user.listUser()

    response.sendResponse(res, add)
})

/**
 * Add User
 * @param {string} username
 * @param {string} password
 */
 BlogController.post('/', async (req, res, next) => {
    const add = await m$user.addUser(req.body)

    response.sendResponse(res, add)
})

module.exports = BlogController