const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { check, validationResult } = require('express-validator');
const UserModel = require('./models/User')
const StudentModel = require("./models/Student")
const SettingModel = require("./models/Setting")
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods : ["GET", "POST", "PUT" , "DELETE"],
    credentials: true
}))

app.use(cookieParser()) 

mongoose.connect('mongodb://127.0.0.1:27017/E-School');

const verifyUser = (req,res, next)=>{
    const token = req.cookies.token;
    // console.log(token, "our token");
    if(!token){
        return res.json("The Token was not available")
    }else{
        jwt.verify(token, "jwt-secret-key", (err,decoded)=>{
            if(err) return res.json("Token is wrong")
            // req.decoded = decoded;
            next();
            
        })
    }
}


app.get('/getVerifiedUser',verifyUser, (req,res)=>{
    return res.json("Success");
})


app.post('/register', [
    check('username').notEmpty().isString(),
    check('email').notEmpty().isString(),
    check('password').notEmpty().isString(),

], async (req, res) => {
    const { username , email, password } = req.body;
    
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
        return res.json("Existing user");
        }

       
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new UserModel({username, email, password:hashed });
        await newUser.save();
        res.json('Registration successful');
    } catch (error) {
        console.log(error);
        res.json('Registration failed');
    }
});





app.post('/students',[
    check('firstName').notEmpty().isString(),
    check('lastName').notEmpty().isString(),
    check('id').notEmpty().isNumeric(),
    check('dob').notEmpty().isString(),
    check('classname').notEmpty().isNumeric(),
    check('gender').notEmpty().isString(),
    check('parents').notEmpty().isString(),
    check('address').notEmpty().isString(),
    check('details').notEmpty().isString(),
    check('customFields').notEmpty().isObject(),
], (req, res) => {
    StudentModel.create(req.body)
    .then(students => res.json(students))
    .catch(err=>{
        console.log(err);
        res.json('failed');
    })
})


app.post('/settings',[
    check('group').notEmpty().isString(),
    check('section').notEmpty().isString(),
    check('label').notEmpty().isString(),
], (req, res) => {
    SettingModel.create(req.body)
    .then(settings => res.json(settings))
    .catch(err=>res.json(err))
})


app.post('/login', (req, res) => {
    const {email,password} = req.body;
    UserModel.findOne({email: email})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password , (err,response)=>{
                if(err){ res.json("The password is incorrect")}

                const token = jwt.sign({email: user.email , username : user.username , password : user.password , _id : user._id}, "jwt-secret-key", {expiresIn:"1d"})
                res.cookie("token", token); 
                if(response){res.json("Success") }
            })
        }else{
            res.json("No record existed")
        }
    })
})



app.get('/getStudentsForChart', (req,res)=>{
    StudentModel.find()
    .then(students=>res.json(students))
    .catch(err => res.json(err))
})

app.get('/getStudents', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * limit;
  
      const students = await StudentModel.find().skip(skip).limit(limit);
      const totalCount = await StudentModel.countDocuments();
  
      res.json({ students, totalCount });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
});



app.get('/getStudents/:id', (req,res)=>{
    fetchid = req.params.id;
    StudentModel.find({_id:fetchid})
    .then(students=>res.json(students))
    .catch(err => res.json(err))
})

app.delete('/getStudentsForChart/:id', (req,res)=>{
    StudentModel.findByIdAndDelete(req.params.id)
    // console.log(x,"sssss")
    .then(res => res.json(res))
    .catch(err =>  res.json(err))

})

app.delete('/getSettings/:id', (req,res)=>{
    SettingModel.findByIdAndDelete(req.params.id)
    // console.log(x,"sssss")
    .then(res => res.json(res))
    .catch(err =>  res.json(err))

})



app.put('/students/:id', (req, res) => {
    putid = req.params.id
    console.log(putid,"yyyyyyy");
    StudentModel.findOneAndUpdate({_id: putid},{
        $set:{
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            id : req.body.id,
            dob : req.body.dob,
            classname : req.body.classname,
            gender : req.body.gender,
            parents : req.body.parents,
            address : req.body.address,
            details : req.body.details,
            customFields: req.body.customField
        }
    })
    .then(result => res.json(result))
    .catch(err=>res.json(err))
})

app.get('/getSettings', (req,res)=>{
    SettingModel.find()
    .then(settings=>res.json(settings))
    .catch(err => res.json(err))
})

app.get('/logout', (req,res)=>{
    res.clearCookie('token');
    return res.json("Success")

})


  app.get('/getProfile', async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const decodedUser = jwt.verify(token, "jwt-secret-key");
      res.json(decodedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });



app.post('/change-password', async (req, res) => {
    try {
      const token = req.cookies.token; 
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const decoded = jwt.verify(token, "jwt-secret-key");
      const userId = decoded._id; 
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const { password, newPassword } = req.body;
  
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
  
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  






app.listen(3001, () => {
    console.log("Server is Running")
})