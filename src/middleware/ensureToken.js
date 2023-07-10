const jwt = require("jsonwebtoken")

const ensureToken = (req, res, next) => {
    //console.log(req.headers)
    jwt.verify(req.headers.token, 'Valentina', (err, data) => {
        if (err) {
            res.status(401).json({ "status": "FALLO", "error": err })
            //console.log(req.token)
        } else {
            req.token = data
            //console.log(req.token)
            next()
        }
    })
}


module.exports = ensureToken