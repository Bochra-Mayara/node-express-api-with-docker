const express =require('express');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
require('./config/connect');
const app = express();
///peut lire format json
app.use(express.json());

////http://localhost:27017/product/creatProd
app.use('/product', productRouter);
app.use('/user', userRouter)
app.use('/getImage', express.static('./uploads'))









app.listen(3000, ()=>{
    console.log('server work');
});