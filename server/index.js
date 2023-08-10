const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/User')
const StudentModel = require("./models/Student")
const SettingModel = require("./models/Setting")
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods : ["GET", "POST", "PUT"],
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
            next();
            
        })
    }
}

// app.get('/dashboard',verifyUser, (req,res)=>{
//     return res.json("Success");
// })
app.get('/getVerifiedUser',verifyUser, (req,res)=>{
    return res.json("Success");
})

// app.post('/register', (req, res) => {
//     UserModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err=>res.json(err))
// })

// app.post('/register', (req, res) => {
//     UserModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err=>res.json(err))
// })



// app.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the email is already registered
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//         return res.json("Existing user");
//         }

//         // Create a new user
//         const newUser = new UserModel({ email, password });
//         await newUser.save();

//         res.json('Registration successful');
//     } catch (error) {
//         res.json('Registration failed');
//     }
// });

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
        return res.json("Existing user");
        }

        // Create a new user
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ email, password:hashed });
        await newUser.save();
        res.json('Registration successful');
    } catch (error) {
        console.log(error);
        res.json('Registration failed');
    }
});



app.post('/students', (req, res) => {
    StudentModel.create(req.body)
    .then(students => res.json(students))
    .catch(err=>res.json(err))
})

app.post('/settings', (req, res) => {
    SettingModel.create(req.body)
    .then(settings => res.json(settings))
    .catch(err=>res.json(err))
})


// app.post('/login', (req, res) => {
//     const {email,password} = req.body;
//     UserModel.findOne({email: email})
//     .then(user=>{
//         if(user){
//             if(user.password === password){
//                 const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn:"1d"})
//                 res.cookie("token", token); 
//                 res.json("Success")                
//             }else{
//                 res.json("The password is incorrect")
//             }
//         }else{
//             res.json("No record existed")
//         }
//     })
// })
app.post('/login', (req, res) => {
    const {email,password} = req.body;
    UserModel.findOne({email: email})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password , (err,response)=>{
                if(err){ res.json("The password is incorrect")}

                const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn:"1d"})
                res.cookie("token", token); 
                if(response){res.json("Success") }
            })
        }else{
            res.json("No record existed")
        }
    })
})


//////////////////////////////////////////

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



/////////////////////////////////////////////

app.get('/getStudents/:id', (req,res)=>{
    fetchid = req.params.id;
    StudentModel.find({id:fetchid})
    .then(students=>res.json(students))
    .catch(err => res.json(err))
})


app.put('/students/:id', (req, res) => {
    putid = req.params.id
    console.log(putid,"yyyyyyy");
    StudentModel.findOneAndUpdate({id: putid},{
        $set:{
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            id : req.body.id,
            dob : req.body.dob,
            classname : req.body.classname,
            gender : req.body.gender,
            parents : req.body.parents,
            address : req.body.address,
            details : req.body.details
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


app.listen(3001, () => {
    console.log("Server is Running")
})