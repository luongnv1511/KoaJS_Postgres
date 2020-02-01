const Router = require('koa-router');
const bcrypt = require('bcryptjs');

const jwt = require("../middleware/jwt");
const userService = require('../services/userService');
const handlerLog = require('../log/handlerLog');

const router = new Router();

router.post('/auth/register', doRegister);
router.post('/auth/login', doLogin);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - User
 *     description: Creates user into db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully created
 */

// api register
async function doRegister(ctx) {
    const user = await userService.checkUser(ctx);
    if (user) {
        ctx.body = {
            code: 0,
            message: 'Username existed'
        };
    } else {
        await userService.addUser(ctx)
    }
}

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - User
 *     description: Check user in db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully login
 */

// api login
async function doLogin(ctx){
    let userBody = ctx.request.body;
    const user = await userService.checkUser(ctx);
    if (user.length > 0) {
        let isLogin = bcrypt.compareSync(userBody.password, user[0].password)
        if (isLogin) {
            let tokenGen = jwt.createToken({
                username: user[0].id
            });
            handlerLog.info(user);
            ctx.body = {
                code: 1,
                userid: user[0].id,
                username: user[0].username,
                message: 'Login successed',
                token: tokenGen
            };
        } else {
            ctx.body = {
                code: 0,
                message: 'Login failed',
            };
        }
    } else {
        ctx.body = {
            code: 0,
            message: 'User name not existed',
        };
    }

}

module.exports = router;