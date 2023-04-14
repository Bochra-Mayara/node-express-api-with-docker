const express = require('express');
const User = require("../models/user")
///A library to help you hash passwords
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
////router is a children a app
const router = express.Router();
///register
router.post('/register', async(req,res) =>{
    data = req.body;
    usr = new User(data);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(data.password, salt);
    usr.password = cryptedPass;
    ////save in database
    usr.save()
    .then(
        (saved)=>{
            res.status(200).send(saved);

        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
            
        }
    )
})



///login
router.post('/login', async(req,res)=>{
    data = req.body;
    user = await User.findOne({email:data.email});
    if(!user){
        res.status(404).send("email or password invalid!")
    }else{
        validPass = bcrypt.compareSync(data.password, user.password);
        if(!validPass){
            res.status(401).send("email or password invalid !")
        }else
        {
            payload={
                _id:user._id,
                email:user.email,
                name:user.name,
            }

            ////token = jwt.sign(payload, secretKey);
            token = jwt.sign(payload, '123456');
            res.status(200).send({myToken:token})
        }
    }

})
// router.post('/add', (req, res) => {
//     data = req.body;
//     usr = new User(data);
//     usr.save()
//         .then(
//             (saveUser) => {
//                 res.status(200).send(saveUser)

//             }
//         )
//         .catch(
//             (err) => {
//                 res.status(400).send(err)
//             }
//         )
// })


// router.post('/create', async (req, res) => {
//     try {
//         data = req.body;
//         usr = new User(data);
//         saveUser = await usr.save();
//         res.send(saveUser)
//     } catch (error) {
//         res.send(error)

//     }


// })



router.get('/getAll', (req, res) => {
    User.find()
        .then(
            (users) => {
                res.send(users)

            }
        )
        .catch(
            (error) => {
                res.send(error)
            }
        )
})



router.get('/all', async (req, res) => {
    try {
        users = await User.find({
            age: 21,
            name: '',
        });
        res.send(users);
    } catch (error) {
        res.send(error)

    }

})



router.get('/getbyid/:id', (req, res) => {
    myid = req.params.id;
    User.findOne({
            _id: myid
        })
        .then(
            (user) => {
                res.send(user)
            }
        )
        .catch(
            (err) => {
                res.send(err)
            }
        )



})


router.get('/getid/:id', async (req, res) => {
    try {
        myid = req.params.id;
        user = await User.findOne({
            _id: myid
        })
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

router.put('/update/:id', (req, res) => {
    id = req.params.id;
    newData = req.body;
    User.findByIdAndUpdate({
            _id: id
        }, newData)
        .then(
            (updated) => {
                res.send(updated)

            }
        )
        .catch(
            (err) => {
                res.send(err)
            }
        )
})


router.put('/updat/:id', async (req, res) => {
    try {
        id = req.params.id;
        data = req.body;
        userUpdated = await User.findByIdAndUpdate({
            _id: id
        }, data)
        res.send(userUpdated)

    } catch (error) {
        res.send(error)

    }
})


router.delete('/delete/:id', (req, res) => {
    myid = req.params.id;
    User.findOneAndDelete({
            _id: myid
        })
        .then(
            (deletedUser) => {
                res.send(deletedUser)

            }
        )
        .catch(
            (err) => {
                res.send(err)

            }
        )
})



router.delete('/del/:id', async (req, res) => {
    try {
        myid = req.params.id;
        deletedUser = await User.findOneAndDelete({
            _id: myid
        })
        res.send(deletedUser)
    } catch (error) {
        res.send(error)

    }
})







module.exports = router;