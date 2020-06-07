//load recommend
const express=require('express')
const db=require('../../models')

const router=express.Router()

router.get('/', async(req,res,next)=>{          // /api/recommend
    try{
    console.log("recommend");
    const loadrecommend= await db.sequelize.models.recommend.findAll({
        where:{userId:req.user.id},
        include:[{
            model:db.movie,
            attributes:['poster']
        }]
    });
    
    
    res.status(200).json(loadrecommend)
    }catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router;