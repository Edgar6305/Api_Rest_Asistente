
const multer = require("multer")
const express = require('express')
const router = express.Router()

const PUBLIC_URL=process.env.PUBLIC_URL
console.log(" La url", PUBLIC_URL)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`
        cb(null, pathStorage)

    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop()
        const filename = `file-${Date.now()}.${ext}`
        cb(null, filename)
    }
})

const uploadMiddleware = multer({ storage })

router.post('/storage', uploadMiddleware.single("myfile"), (req, res) => {
    const {body, file} = req
    const url = `${PUBLIC_URL}/${file.filename}`
    file.url = url 
    res.send(file)
})


module.exports = router