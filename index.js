if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}



const express = require('express');
const app = express();
const morgan=require('morgan');
const path=require('path');
const https = require('https');
const fs = require('fs');

// const fileUpload=require('express-fileupload');

const mongoose = require('mongoose');
const router=require('./routes');
const bodyParser = require('body-parser');



const port = process.env.PORT || 3000;
const cors=require('cors');

//Config

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(router);


app.use(morgan('tiny'));
app.use(cors());

//config db



mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(`Error al conectar a la db ${err}`)
    }
    else {
        console.log('Conexión a la base de datos establecida')
    }
  
})

app.listen(port, () => {
    console.log(`Connection on port ${port}`)
})



  