const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const boxAPIRouter = require('./routes/movie/boxoffice');
const userAPIRouter = require('./routes/user');
const diaryAPIRouter = require('./routes/movie/diary');
const wishAPIRouter = require('./routes/movie/wishlist');
const movieAPIRouter = require('./routes/movie/search');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use('/',express.static('uploads'));
app.use(cors({
    origin:true,
    credentials:true,
}));
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


app.use('/api/user', userAPIRouter);
app.use('/api/diary', diaryAPIRouter);
app.use('/api/wishlist', wishAPIRouter);
app.use('/api/movie', movieAPIRouter);
app.use('/api/boxoffice', boxAPIRouter);
app.listen(4000, ()=>{
    console.log('server is running on localhost:4000');
});