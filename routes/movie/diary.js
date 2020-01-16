//load 다이어리
//write diary 다이어리 등록(date,rating,memo,photo)
//load diary
//load diary detail


const express=require('express')
const db=require('../../models')

const router=express.Router();

router.get('/movie/diary',async(req,res,next)=>{//다이어리 목록 클릭시 나타나는 화면
     //로그인여부추가
    try{
        const loadDiary=await db.diary.findAll({
           where:{userId:req.body.id},
           include:[{
               model:db.movie,
               attributes:['movieId,poster']
           }],
           order:[['createdAt','DESC']]
        })
        res.json(loadDiary);
    }catch(e){
        console.error(e);
        next(e)
    }
})//다이어리 목록

//사진을 클릭하면 props로 movieId를 같이 넘겨준다
router.get('movie/diary/:userId/:movieId',async(req,res,next)=>{//상세 목록은 어떤주소로 볼것인가?
    try{
        const loadDiaryDetail=await db.diary.findOne({
            where:{
                userId:req.params.userId,
                movieId:req.params.movieId},
            include:[{
                model:db.movie,
                attributes:['korTitle','makingNation','poster','releaseDate']
            }]
        })
        res.json(loadDiaryDetail)
    }catch(e){
        console.error(e)
        next(e)
    }
})
//다이어리 상세

router.post('/movie/diary/:movieId',async(req,res,next)=>{//movieId는 와일드카드로
    //로그인여부추가
    try{
        const findMovie=await db.diary.findOne({
            where:{movieId:req.params.movieId}
        })
        if(findMovie){
            res.status(403).send('이미 존재하는 항목입니다.')
            }
        const createDiary=await db.diary.create({    
        //  diaryPhoto 이부분은 multer로 처리.
         movieId:req.params.movieId,
         writeDate:req.body.writeDate,
         memo:req.body.memo,
        })
        res.status(201).send("다이어리 등록에 성공하였습니다.")
        }catch(e){
            console.error(e);
            next(e);
        }
    })

router.delete(':id/movie/diary')