const express = require('express');
const Product = require("../models/product")
///Multer is a node.js middleware ,  used for uploading files
const multer = require('multer');
const router = express.Router();

filename = '';
const myStorage = multer.diskStorage({
    destination: '././uploads',
    filename:(req, file, redirect)=>{
        let date = Date.now();
        ////image/png
        let fl = date + '.' + file.mimetype.split('/')[1];
        redirect(null, fl);
        filename = fl;
    
    }

})
///middleware
const upload = multer({storage:myStorage});



router.post('/createProd',upload.any('image'), async (req, res) => {
    try {
        data = req.body;
        prod = new Product(data);
        prod.image = filename;
        saveProd = await prod.save();
        filename = '';
        res.status(200).send(saveProd)
    } catch (error) {
        res.status(400).send(error)

    }


})


router.get('/allProd', async (req, res) => {
    try {
        products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error)

    }

})


router.put('/updateProd/:id', async (req, res) => {
    try {
        id = req.params.id;
        data = req.body;
        prodUpdated = await Product.findByIdAndUpdate({
            _id: id
        }, data)
        res.status(200).send(prodUpdated)

    } catch (error) {
        res.status(400).send(error)

    }
})




router.delete('/delProd/:id', async (req, res) => {
    try {
        myid = req.params.id;
        deletedProd = await Product.findOneAndDelete({
            _id: myid
        })
        res.status(200).send(deletedProd)
    } catch (error) {
        res.status(400).send(error)

    }
})





module.exports = router;