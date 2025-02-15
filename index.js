const express=require('express');
const app=express();
const port=8000;
const connectDB = require('./mongodb');
//const User = require('./models/userSchema');
const userRoute = require('./routes/userRoute'); // Import the userRoute module


app.use(express.json());
connectDB();

//localhost/user
app.use('/user', userRoute);
// localhost:8000/
app.get('/',function(req, res){
    res.send('mongodb is activated');
    console.log(req.body);
})





app.listen(port,()=>{
    console.log(`running in port ${port}`);
})