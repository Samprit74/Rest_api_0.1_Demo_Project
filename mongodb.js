
const mongoose=require('mongoose');

//function to connect mongodb(for beggner level)
function connectDB() {
    const url='mongodb://localhost:27017/data_set';
    mongoose.connect(url)
    .then(()=>{
        console.log('connection is succeeded');
    })
    .catch((err)=>{
        console.log('connection is failed:',err);
    })
}


module.exports=connectDB;