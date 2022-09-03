//Helper db yang dibuat
const mysql = require('../helpers/database')
const bcrypt = require('bcrypt')
//validation input
const Joi = require('joi')

class _user {
    //list all user
    listUser = async () => {
        try {
            const list = await mysql.query(
                'SELECT * FROM user',
                []
            )

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listUser user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    //create user
    addUser = async (body) => {
        try {            
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
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

            body.password = bcrypt.hashSync(body.password, 10)

            const add = await mysql.query(
                'INSERT INTO user (username, password) VALUES (?, ?)',
                [body.username, body.password]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addUser user module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _user()