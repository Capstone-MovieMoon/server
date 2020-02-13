const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');
const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3') 
const AWS = require('aws-sdk');
const router = express.Router();

router.get('/', function(req, res){

})

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });

const upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'moviemoon1',
      key(req, file, cb) {
        cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
  });

router.post('/image', upload.single('image'), (req,res)=>{      //이미지 업로드   /api/user/image
    console.log(req.file);
    res.json(req.file.location);
})

router.patch('/image', upload.none(), async(req,res,next)=>{      //프로필 사진 변경  /api/user/image
    try {
        await db.user.update({
            src:req.body.image,
        },{
            where:{id:req.user.id},
        });
        res.send('프로필 사진 등록 완료!');
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.post('/', async (req, res, next) => {       // POST /api/user 회원가입
    try {
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
        return res.status(200).json(newUser).send('회원가입 성공!');
    } catch (e) {
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
});


router.post('/logout/', (req,res)=>{            //로그아웃      /api/user/logout
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

router.post('/login', async (req,res, next)=>{     //POST /api/user/login
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

router.patch('/nickname', async (req,res,next)=>{           //닉네임 변경 /api/user/nickname
    try {
        await db.user.update({
            nickname:req.body.nickname,
        },{
            where:{id:req.user.id},
        });
        res.send('닉네임이'+req.body.nickname+'로 바뀌었습니다!');
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.post('/delete', async (req,res,next)=>{              //회원탈퇴 /api/user/delete
    try {
        const findUser = await db.user.findOne({
            where:{
                userId : req.user.userId
            }
        })
        if(!findUser){
            return res.status(403).send('존재하지 않는 유저입니다.');
        }
        const deleteUser = await db.user.destroy({
            where:{
                userId : req.user.userId
            }
        })
    } catch (e) {
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
})



module.exports = router;