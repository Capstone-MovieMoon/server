//load wishList
const express=require('express')
const db=require('../../models')

const router=express.Router()

router.get('/', async(req,res,next)=>{          //
    try{
    const loadWishlist=await db.wishlist.findAll({
        where:{userId:req.body.userId},
        include:[{
            model:db.movie,
            attributes:['movieId','poster']
        }]
    })
    res.status(200).json(loadWishlist)
    }catch(e){
        console.error(e);
        next(e);
    }
});
router.post('/', (req,res)=>{
   try{
       const exWishlist = await db.wishlist.findOne({
           where:{
               userId: req.body.userId,
               movieId: req.body.movieId
           }
       })
       if(exWishlist){
        return res.status(403).send('이미 위시리스트에 있습니다.');
       }
       const newWishlist = await db.wishlist.create({
        userId:req.body.userId,   
        movieId:req.body.movied           
       })
       console.log(newWishlist);
        return res.status(200).json(newWishlist);
   } catch(e){
       console.error(e);
       next(e);
   }
});

router.delete('/', (req,res)=>{
    try {
        const findwish = await db.wishlist.findOne({
            where:{
                userId: req.body.userId,
                movieId: req.body.movieId
            }
        })
        if(!findwish){
            return res.status(403).send('위시리스트에 없는 항목입니다.');
        }
        const deleteWishlist = await db.wishlist.destroy({
            where:{
                userId: req.body.userId,
                movieId: req.body.movieId
            }
        })
        return res.status(200).send('위시리스트에서 삭제 성공');
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;