//load boxoffice(년,월)
//박스오피스 조회 


const express =require('express')
const db=require('../../models')

const router=express.Router()

//년과 월을 보내준다
// router.get('/movie/boxoffice',async(req,res,next)=>{
//     const boxOfficeList=await db.movie.findAll({
//         where: {
//             releaseDate:req.body.date//어떤값을 보내주는지확인
//         },
//         include:[{
//             model:db.movie,
//             attributes: ['movieId', 'korTitle', 'genres', 'releaseDate','makingNation']
//         }],
//         order:[['moviveId','DESC']]
//     });
//     res.Json
   
// })



