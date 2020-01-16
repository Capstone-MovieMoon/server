//load wishList
const express=require('express')
const db=require('../../models')

const router=express.Router()

router.get('/wishlist',async(req,res,next)=>{
    try{
    const loadWishlist=await db.wishlist.findAll({
        where:{userId:req.body.userId},
        include:[{
            model:db.movie,
            attributes:['movieId','poster']
        }]
    })
    res.json(loadWishlist)
    }catch(e){
        console.error(e);
        next(e);
    }
})