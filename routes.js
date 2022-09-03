const AuthController = require("./controllers/AuthController")
const UserController = require("./controllers/UserController")
const ArticleController = require("./controllers/ArticleController")
const CommentController = require("./controllers/CommentController")

const _routes = [
    ['', AuthController],
    ['/users', UserController],
    ['/articles', ArticleController],
    ['/comments', CommentController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [ url, controller ] = route
        app.use(`/api${url}`, controller)
    });
}

module.exports = routes