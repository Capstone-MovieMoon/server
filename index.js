const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user')

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave:false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, //이렇게 하면 자바스크립트로 쿠키에 접근 불가
        secure: false,  //https를 쓸 때 true로 해주면 됨.
    },
    name:'momon'
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin:true,
    credentials:true,
}));



app.get('/', (req,res)=>{
    res.send('Hello, server');
}); 

app.use('/api/user', userAPIRouter);

app.listen(3006, ()=>{
    console.log('server is running on localhost:3006');
    console.log('nodemon is running')
});