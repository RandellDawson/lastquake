const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { validationResult } = require('express-validator')
const{ requireUserName, requireEmail, requirePassword, requirePasswordConfirmation, comparePasswords } = require('./vaildators')

const User = require('../../models/User')

//@route POST api/user
//@desc  Register User
//@access Public
router.post('/api/register',
[
    requireUserName,
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    comparePasswords
],
 async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, passwordConfirmation } = req.body
    
    try {
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({
                errors: [{message: 'An account already exist'}]
            })
        }
        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        user.save()

        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: 30000 }, (err, token) => {
            if(err) throw err
            res.json({ token })
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send(`Server Error> ${error}`)
    }


})

module.exports = router