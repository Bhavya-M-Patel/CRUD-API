const jwt = require('jsonwebtoken');

function SignToken(data) {
    return jwt.sign(data, process.env.secreat_key, { expiresIn: process.env.token_expire })
}

function verifyToken(req, res, next) {
    try {
        if (req.headers[process.env.auth_token_name]) {
            let data = jwt.verify(req.headers[process.env.auth_token_name], process.env.secreat_key);
            res.locals.user_id = data.id;
            res.locals.isAuthenticated = true;
            next();
        }
        else {
            res.status(401).send({ status: false, msg: 'Auth token not Provided' })
        }
    }
    catch (e) {
        res.status(401).send({status:false, msg:e.message})
    }
}

module.exports = {SignToken,verifyToken}