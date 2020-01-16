//diary search
//click movie ->detail page

const express=require('express');
const db=require('../../models')

const router=express.Router();

router.get('movie/search/:movieTitle',async(req,res,next)=>{
    try{
        const searchMovieList=await db.movie.findAll({
            where:{korTitle:req.params.movieTitle},
            attributes:['korTitle','genres','releaseDate','makingNation','poster']
        })
        res.json(searchMovieList);
    }catch(e){
        console.error(e)
        next(e)
    }
})//기능은 어느정도로 까지생각하는가 어디까지검색할 수 있게 할것인가.

router.get('movie/search/detail/:movieId',async(req,res,next)=>{
    try{
        const findDetialMovie=await db.movie.findOne({
            where:{movieId:req.params.movieId},
            //q?취향,레이팅평균 모두 어떻게 할것인가?
        })
    }
    catch(e){
        console.error(e)
        next(e)
    }
})