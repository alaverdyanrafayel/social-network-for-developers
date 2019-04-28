const express = require('express');

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const secretKey = require('../../config/keys').secretKey;
const validationRegisterInput = require('../../validation/register');
const validationLoginInput = require('../../validation/login');

router.get('/test', (req, res) => {
    res.json({msg: 'users work'})
})

/**
 * Get api/users/register
 * Register user
 */

router.post('/register', (req, res) => {
    //check validation
    const { errors, isValid } = validationRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
    .then(user => {
        if(user){
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

/**
 * Get api/users/login
 * login user
 */

 router.post('/login', (req, res) => {
    //check validation
    const { errors, isValid } = validationLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;
    User.findOne({email}).then(user => {
        if(!user){
            return res.status(404).json({msg: 'User does not exist'});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                // return token
                const { id, name, email, avatar } = user;
                const payload = {id, name, email, avatar};
                jwt.sign(payload, secretKey, {expiresIn: 3600}, (err, token) => {
                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    })
                })
             
            } else {
                return res.status(400).json({msg: 'Password is incorrect'});
            }
        })
    })
 })

 /**
 * Get api/users/current
 */

 router.get('/current', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar
        });
    }
);

module.exports = router;
