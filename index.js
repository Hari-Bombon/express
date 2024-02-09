const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars');
const logger = require('./public/middleware/logger');
const app = express()
//app.get('/' ,(req, res)=>{
    //res.json('Hello');
    //res.sendFile(path.join(__dirname,"public" , "index.html"))
//})

//init middleware
//app.use(logger);

//handlebars middkeware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//get single member
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
//homepge
app.use('/' , (req,res) => res.semder('index'));
//static folder
app.use(express.static(path.join(__dirname, "public")))
//api members
app.use('/api/members', require('./routes/api/members'))

const PORT = 5000;
app.listen(PORT ,() => console.log(`Server started on port ${PORT}`));