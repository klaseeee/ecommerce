const router = require('express').Router()

// routes get
router.get('/usertest', (request, response) => {
    response.send('user test successfull!')
})

// routes post
router.post('/userposttest', (req, res) => {
    const username = req.body.username
    res.send(`your username is ${username}`)
})

module.exports = router