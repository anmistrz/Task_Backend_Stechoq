//Helper db yang dibuat
const mysql = require('../helpers/database')
//validation input
const Joi = require('joi')


class _article {
    //create article
    addArticle = async (body) => {
        try {
            const schema = Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                id_user: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await mysql.query(
                'INSERT INTO artikel (title, description, id_user) VALUES (?, ?, ?)',
                [body.title, body.description, body.id_user]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addArticle module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    //edit article
    editArticle = async (body) => {
        try {
            const schema = Joi.object({
                id: Joi.number().required(),
                title: Joi.string().required(),
                description: Joi.string(),
                id_user: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const detail = await mysql.query(
                'SELECT * FROM artikel WHERE (id = ? AND id_user = ?)',
                [body.id, body.id_user]
            )

            if (!detail.length > 0) {
                return {
                    status: false,
                    data: 404,
                    error: "Article not found"
                }
            }

            const edit = await mysql.query(
                'UPDATE artikel SET title = ?, description = ? WHERE id = ?',
                [body.title, body.description, body.id]
            )

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editArticle module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    //delete article
    deleteArticle = async (id) => {
        try {
            const body = { id }
            const schema = Joi.object({
                id: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del = await mysql.query(
                'DELETE FROM artikel WHERE id = ?',
                [id]
            )

            return {
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteArticle module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _article()