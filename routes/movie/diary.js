
const express=require('express')
const db=require('../../models')

const router=express.Router();

router.get('/list',async(req,res,next)=>{   //다이어리 목록 클릭시 나타나는 화면
     //로그인여부추가
    try{
        const loadDiary=await db.diaryList.findAll({
           where:{userId:req.body.userId},
           include:[{
               model:db.movie,
               attributes:['movieId,poster']
           }],
           order:[['createdAt','DESC']]
        })
        return res.status(200).json(loadDiary);
    }catch(e){
        console.error(e);
        next(e)
    }
})//다이어리 목록

//사진을 클릭하면 props로 movieId를 같이 넘겨준다
router.get('/detail',async(req,res,next)=>{   //상세 목록은 어떤주소로 볼것인가?
    try{
        const loadDiaryDetail=await db.diarylist.findOne({
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId},
            include:[{
                model:db.movie,
                attributes:['korTitle','makingNation','poster','releaseDate']
            },
            {
                model:db.diary,
                attributes:['memo']
            }
        ],
        })
        return res.status(200).json(loadDiaryDetail)
    }catch(e){
        console.error(e)
        next(e)
    }
})
//다이어리 상세

router.post('/',async(req,res,next)=>{  //movieId는 와일드카드로
    //로그인여부추가
    try{
        const findMovie=await db.diary.findOne({
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId}
        })
        if(findMovie){
            res.status(403).send('이미 존재하는 항목입니다.')
            }
        const createDiary=await db.diary.create({    
        //  diaryPhoto 이부분은 multer로 처리.
         movieId:req.body.movieId,
         userId:req.body.userId,
         memo:req.body.memo,
        })
        const createDiarylist = await db.diarylist.create({
            movieId:req.body.movieId,
            userId:req.body.userId,
        })
        res.status(201).send("다이어리 등록에 성공하였습니다.")
        }catch(e){
            console.log(e);
            return res.status(403).send(e);
            return next(e);
        }
    })

router.delete('/', async(req, res, next)=>{
    try {
        const findDiary = await db.diary.findOne({
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId
            }
        })
        if(!findDiary){
            return res.status(403).send('존재하지 않는 다이어리 입니다.');
        }
        const findDiarylist = await db.diarylist.findOne({
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId
            }
        })
        if(!findDiarylist){
            return res.status(403).send('존재하지 않는 다이어리 입니다.');
        }
        const deleteDiary = await db.diary.destroy({
            where:{
                userId:req.body.userId,
                movieId:req.body.movieId
            }
        });
        const deleteDiarylist = await db.diarylist.destroy({
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