const express= require('express');
const dotenv= require('dotenv');
const mongoose= require('mongoose');
const cors= require('cors');
const taskRoute = require('./routes/tasks.js');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');


dotenv.config();

const app= express();
const port = process.env.PORT || 8000;

const corsOptions={
    origin: true,
    methods: ["POST", "GET" ,"PUT", "DELETE"],
    credentials: true
}

//Database connection
//pass-OITxSbCjtjOGFV5r
//mongodb+srv://riyazmittu:OITxSbCjtjOGFV5r@cluster0.rxngop8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


const connect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://riyazmittu:OITxSbCjtjOGFV5r@cluster0.rxngop8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('connected to Mongodb');


    }catch(err){
        console.log('Mongodb connection failed',err.message);
    }
}


//Middleware
app.use(express.json());
app.use(cors(corsOptions));


//any req to /tasks is sent to tour Route
app.use("/task",taskRoute);

//login and register
app.use('/auth',authRoute);

//any request to /user
app.use('/user', userRoute);


app.listen(port,()=>{
    connect();  
    console.log('server listening on port',port);
})
