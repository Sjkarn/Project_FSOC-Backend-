const express= require('express');
const mongoose= require('mongoose');
const route= require('./routes/route');
const multer= require('multer');
const cors= require('cors');
const app= express();

app.use(express.json());
app.use(multer().any());
app.use(cors());

mongoose.set("strictQuery",true);

mongoose.connect("mongodb+srv://SAURABH:Soa4GdK4yRvlVN5i@cluster0.umtgp.mongodb.net/Task-Assigner-DB?retryWrites=true&w=majority",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDB is connected..."))
.catch((err)=>console.log(err))

app.use('/',route);

app.listen(process.env.PORT || 3001, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});