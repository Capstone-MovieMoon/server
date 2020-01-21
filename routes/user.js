const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

router.get('/', function(req, res){

})

router.post('/', async (req, res, next) => {       // POST /api/user 회원가입
    try {
        console.log(req.body.userId);
        const exUser = await db.user.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.user.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        })
        console.log(newUser);
        return res.status(200).json(newUser);
    } catch (e) {
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
});


router.post('/logout/', (req,res)=>{
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

router.post('/login', (req,res, next)=>{     //POST /api/user/login
    passport.authenticate('local', (err, userinfo, info)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        console.log('hello! '+userinfo.nickname);
        return req.login(userinfo, (loginErr)=>{
            if(loginErr){
                return next(loginErr);
            }
            const filteredUser = Object.assign({}, userinfo.toJSON());
            delete filteredUser.password;
            return res.json(filteredUser);
        });
    })(req,res,next);
});

router.get('/:id/whislist/', (req,res)=>{       
    
});

router.post('/:id/whislist/', (req,res)=>{
    
})

router.delete('/:id/whislist/', (req,res)=>{
    
})

module.exports = router;