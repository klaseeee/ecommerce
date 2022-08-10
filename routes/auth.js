const router = require('express').Router()
const User   = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// user register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch(err) {
        res.status(500).json(err)
    }
})

// user login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})

        // cek apakah user ada di db atau tidak
        !user && res.status(401).json('Wrong credentials!')

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        // jika ada, cek apakah passwordnya sama atau tidak
        originalPassword !== req.body.password && res.status(401).json('Username or Password is wrong!')

        // create jsonwebtoken
        const accessToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin, 
        }, process.env.JWT_SECRET, {expiresIn: "3d"})

        // jika user dan password benar
        const { password, ...others } = user._doc
        res.status(200).json({...others, accessToken})

    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router