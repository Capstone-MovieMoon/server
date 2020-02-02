//diary search
//click movie ->detail page

const express=require('express');
const db=require('../models')

const router=express.Router();

router.get('/searchbar',async(req,res,next)=>{
    try{
        const searchMovieList=await db.movie.findAll({
            where:{
                title:{
                    [Op.like]: "%"+req.body.title+"%"
                }
            },
            attributes:['title', 'genres', 'releaseDate', 'makingNation','poster']
        })
        if(searchMovieList){
            return res.json(searchMovieList);
        }
    }catch(e){
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
})//기능은 어느정도로 까지생각하는가 어디까지검색할 수 있게 할것인가.

router.get('/detail',async(req,res,next)=>{
    try{
        const findDetailMovie=await db.movie.findOne({
            where:{movieId:req.body.movieId},
        })
        if(findDetailMovie){
            return res.status(200).json(findDetailMovie);
        }
    }
    catch(e){
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
})
module.export = router();