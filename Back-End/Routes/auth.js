const express = require('express')
const bcrypt = require('bcryptjs')      //used to create hash of pswd
const jwt = require('jsonwebtoken')     //ussed to create token
const fetchuser = require('../middleware/fetchuser')    //middleware to fetch user from token
const User = require('../Models/User')
const { body, validationResult } = require('express-validator');
const Exercise = require('../Models/Exercise')
const router = express.Router()

// creating a user
router.post('/createUser', [                                          
   body('name').isLength({min: 3}),             //adding validation 
   body('email').isEmail(),
   body('password').isLength({min: 5})
], async(req, res)=>{ 
    //as provided by validator
    let success = false
    const result = validationResult(req)
    
    if (!result.isEmpty()) {
        return res.status(400).send({ success, errors: result.array() })
    }
    try {
        
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).send({success, error: 'User with email already exists'})
        }

        const salt = await bcrypt.genSalt(10)
        const secretpswd = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secretpswd
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, 'secretkey')
    success = true
    res.send({success, authtoken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some errror occured')
    }
})

//user login
router.post('/login',[
    body('email').isEmail(),
    body('password').exists()
], async(req, res)=>{
    const result = validationResult(req)
    let success = false
    if (!result.isEmpty()) {
        return res.status(400).send({ success, errors: result.array() })
    }

    const {email, password} = req.body
    try {
        
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).send({success, error: 'Wrong credentials'})
        }

        const pswdCompare = await bcrypt.compare(password, user.password)
        if(!pswdCompare){
            
            return res.status(400).send({success, error: 'Wrong credentials'})
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, 'secretkey')
    success=true
    res.send({success, authtoken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some errror occured')
    }
})

router.post('/getuser', fetchuser, async(req, res)=>{
    try {
        const userid = req.user.id
        const user = await User.findById(userid).select('-password')     //get user data except password
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some errror occured')
    }
})

router.post('/assesment', fetchuser, async(req, res)=>{
    try {
        const {assesmentType, type, alignLeftOrRight} = req.body
        const exerCise = await Exercise.create({
            name: assesmentType,
            position: type,
            direction: alignLeftOrRight,
            user: req.user.id
        })
        const savedNotes = await exerCise.save()
        res.send(savedNotes)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some errror occured')
    }
})

module.exports = router