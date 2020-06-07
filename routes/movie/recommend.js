//load wishlist
const express=require('express')
const db=require('../../models')

const router=express.Router()

router.get('/', async(req,res,next)=>{          // /api/wishlist
    try{
    const loadrecommend= await db.sequelize.models.recommend.findAll({
        where:{userId:req.user.id},
    })
    
    res.status(200).json(loadrecommend)
    }catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router;