
const express=require('express')
const db=require('../../models')
const multer=require('multer');
const path = require('path');
const multerS3 = require('multer-s3') 
const router=express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
    storage: multerS3({
        s3:new AWS.S3(),
        bucket: 'moviemoon1',
        key(req,file,cb){
            cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
        },
    }),
    limit: { fileSize: 20 * 1024 * 1024 },
  });
router.post('/image', upload.array('image'), (req,res)=>{      //이미지 업로드   /api/diary/image
    console.log(req.files);
    res.json(req.files.map(v=>v.location));
})
router.get('/',async(req,res,next)=>{   //다이어리 리스트       //    /api/diary
    try{
        const loadDiary=await db.sequelize.models.diarylist.findAll({
           where:{userId:req.user.id},
           order:[['createdAt','DESC']]
        })
        console.log(loadDiary);
        if(!loadDiary){
            return res.send('다이어리가 존재하지 않습니다..');
        }
        return res.status(200).json(loadDiary);
    }catch(e){
        console.error(e);
        next(e)
    }
})

router.get('/detail',async(req,res,next)=>{   //상세다이어리        /api/diary/detail
    try{
        const loadDiaryDetail=await db.diary.findOne({
            where:{
                userId:req.user.id,
                id:req.query.diaryId 
            },
            include:[{
                model:db.movie,
                attributes:['korTitle','makingNation','releaseDate']
            },
            {
                model:db.diaryimage,
                attributes:['src']
            }
            ],
        })
        return res.status(200).json(loadDiaryDetail);
    }catch(e){
        console.error(e)
        next(e)
    }
})



router.post('/',async(req,res,next)=>{          //다이어리 등록         /api/diary
    try{
        const findMovie=await db.diary.findOne({
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId
            }
        })
        if(findMovie){
            return res.status(403).send('이미 존재하는 다이어리입니다.')
            }
        const createDiary=await db.diary.create({    
         movieId:req.body.movieId, 
         userId:req.body.userId,
         memo:req.body.memo,
         createDate:req.body.createDate,
         myRating:req.body.rating
        })
        const findposter = await db.movie.findOne({
            where:{
                id:req.body.movieId
            }
        })
        const createDiarylist = await db.diarylist.create({
            movieId:req.body.movieId,
            userId:req.body.userId,
            poster:findposter.poster,
            diaryId:createDiary.id
        });
        const createUserRating = await db.rating.create({
            moiveId:req.body.movieId,
            userId:req.body.userId,
            userRating:req.body.rating
        });
        if(req.body.image){                 //이미지 주소를 여러개 올리면 image: [주소1, 주소2]
            if(Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map((image)=>{
                    return db.diaryimage.create({src:image, diaryId:createDiary.id});
                }));
            }
            else{           //이미지를 하나만 올리면 image:주소
                const image = await db.diaryimage.create({
                    src:req.body.image,
                    diaryId:createDiary.id
                });
            }
        }
        return res.status(201).send("다이어리 등록에 성공하였습니다.");
        }catch(e){
            console.log(e);
            res.status(403).send(e);
            next(e);
        }
    });
router.patch('/memo', async(req, res, next)=>{            //  다이어리 메모 수정 /api/diary/memo
    try {
        await db.diary.update({
            memo:req.body.memo,
        },{
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId
            }
        })
        res.send('다이어리의 memo가 '+req.body.memo+'로 바뀌었습니다.');
    } catch (e) {
        console.log(e);
        next(e);
    }
})

router.patch('/createDate', async(req, res, next)=>{            //  다이어리 작성날짜 수정 /api/diary/createDate
    try {
        await db.diary.update({
            createDate:req.body.createDate,
        },{
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId
            }
        })
        res.send('다이어리의 createDate가 '+req.body.createDate+'로 바뀌었습니다.');
    } catch (e) {
        console.log(e);
        next(e);
    }
})

router.patch('/myRating', async(req, res, next)=>{            //  다이어리 작성날짜 수정 /api/diary/myRating
    try {
        await db.diary.update({
            myRating:req.body.rating,
        },{
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId
            }
        })
        await db.rating.update({
            userRating:req.body.rating,
        },{
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId
            }
        })
        res.send('다이어리의 myRating이 '+req.body.rating+'로 바뀌었습니다.');
    } catch (e) {
        console.log(e);
        next(e);
    }
})

router.patch('/image', async(req, res, next)=>{            //  다이어리 사진 수정 /api/diary/image
    try {
        await db.diaryimage.update({
            src:req.body.image
        },{
            where:{
                diaryId:req.body.diaryId
            }
        })
        res.send('다이어리의 사진 수정 완료!');
    } catch (e) {
        console.log(e);
        next(e);
    }
})


router.delete('/', async(req, res, next)=>{         //  다이어리 삭제 /api/diary
    try {
        const findDiary = await db.diary.findOne({
            where:{
                id:req.body.diaryId
            }
        })
        if(!findDiary){
            return res.status(403).send('존재하지 않는 다이어리 입니다.');
        }
        const findDiarylist = await db.diarylist.findOne({
            where:{
                diaryId:req.body.diaryId
            }
        })
        if(!findDiarylist){
            return res.status(403).send('존재하지 않는 다이어리 리스트 입니다.');
        }
        const findDiaryimage = await db.diaryimage.findOne({
            where:{
                diaryId:req.body.diaryId
            }
        })
        if(findDiaryimage){
            const deleteDiaryImage = await db.diaryimage.destroy({
                where:{
                    diaryId:req.body.diaryId
                }
            })
        }
        const deleteDiarylist = await db.diarylist.destroy({
            where:{
                diaryId:req.body.diaryId
            }
        })
        const deleteDiary = await db.diary.destroy({
            where:{
                id:req.body.diaryId
            }
        });
        const deleteRating = await db.rating.destroy({
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId
            }
        })


        return res.status(201).send('다이어리 삭제 성공!');
        
    } catch (e) {
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
})


module.exports = router;