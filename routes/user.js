const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

router.get('/', function(req, res){
    var output = `
        <h1>Register</h1>
        <form method="post">
         <p>
          <input type = "text", name="user_id" placeholder="user_id">
         </p>
         <p>
          <input type="password" name="password" placeholder="password">
         </p>
         <p>
          <input type="text" name="nickname" placeholder="nickname">
         </p>
         <p>
          <input type="submit">
         </p>
        </form>
        `;
        res.send(output);
})

router.post('/', async (req, res, next) => {       // POST /api/user 회원가입
    try {
        console.log(req.body.user_id);
        const exUser = await db.User.findOne({
            where: {
                user_id: req.body.user_id,
            },
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            user_id: req.body.user_id,
            password: hashedPassword,
        })
        console.log(newUser);
        return res.status(200).json(newUser);
    } catch (e) {
        console.e(e);
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
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        console.log('hello! '+user.nickname);
        return req.login(user, (loginErr)=>{
            if(loginErr){
                return next(loginErr);
            }
            const filteredUser = Object.assign({}, user.toJSON());
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