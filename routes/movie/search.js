//diary search
//click movie ->detail page

const express=require('express');
const db=require('../../models')
const sequelize = require("sequelize");
const Op = sequelize.Op;
const router=express.Router();

router.get('/searchbar/:korTitle',async(req,res,next)=>{          //api/movie/searchbar/:korTitle
    try{
        const searchMovieList=await db.movie.findAll({
            where:{
                korTitle:{
                    [Op.like]: "%"+req.params.korTitle+"%"
                }
            },
            attributes:['korTitle', 'genres', 'releaseDate', 'makingNation','poster', 'id']
        })
        if(searchMovieList){
            return res.json(searchMovieList);
        }
    }catch(e){
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
})

router.get('/detail/:id',async(req,res,next)=>{         //api/movie/detail/:id
    try{
        const findDetailMovie=await db.movie.findOne({
            where:{id:req.params.id},
        })
        if(findDetailMovie){
            return res.status(200).json(findDetailMovie);
        }
        else{
            return res.status(200).send('존재하지 않는 영화입니다');
        }
    }
    catch(e){
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
})
router.post('/', async(req,res,next)=>{             
    try{
        const createmovie = await db.movie.create({
            korTitle:req.body.korTitle,
            poster:req.body.poster
        })
        if(createmovie){
            return res.status(200).json(createmovie);
        }
    }
    catch(e){
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
})
module.exports = router;