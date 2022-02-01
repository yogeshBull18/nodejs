const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv =  require('dotenv');
const userRouter =  require('./routes/users');
const productRouter =  require('./routes/product');
const authRouter = require('./routes/auth');
dotenv.config();

const mongooseDb = mongoose.connect(
    process.env.MONGO_URL
    )
    .then(()=>console.log('DB Connected'))
    .catch((err)=>{
        console.log(err);
    });
    
// app.get('/users',()=>{
//     console.log('test');
// })    


app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/product',productRouter);

app.listen('4000',()=>{
    console.log('Server Run');
});