//load wishlist
const express=require('express')
const db=require('../../models')

const router=express.Router()

router.get('/', async(req,res,next)=>{          // /api/wishlist
    try{
    const loadWishlist= await db.sequelize.models.wishlist.findAll({
        where:{userId:req.body.userId},
        order:[['createdAt','DESC']]
    })
    
    res.status(200).json(loadWishlist)
    }catch(e){
        console.error(e);
        next(e);
    }
});
router.post('/', async (req,res, next)=>{             // /api/wishlist
   try{
       const exWishlist = await db.wishlist.findOne({
           where:{
               userId: req.body.userId,
               movieId: req.body.movieId
           }
       })
       console.log(exWishlist);
       if(exWishlist){
        return res.status(403).send('이미 위시리스트에 있습니다.');
       }
       console.log(req.body.movieId);
       const findposter = await db.movie.findOne({
           where:{
               id: req.body.movieId
           }
       })
       console.log(findposter);
       const newWishlist = await db.sequelize.models.wishlist.create({
        userId:req.body.userId,   
        movieId:req.body.movieId,
        poster: findposter.poster
        });
        return res.status(200).json(newWishlist);
   } catch(e){
       console.error(e);
       return next(e);
   }
});

router.delete('/', async (req,res)=>{
    try {
        const findwish = await db.sequelize.models.wishlist.findOne({
            where:{
                userId: req.body.userId,
                movieId: req.body.movieId
            },
        })
        if(!findwish){
            return res.status(403).send('위시리스트에 없는 항목입니다.');
        }
        const deleteWishlist = await db.sequelize.models.wishlist.destroy({
            where:{
                userId: req.body.userId,
                movieId: req.body.movieId
            }
        })
        return res.status(200).send('위시리스트에서 삭제 성공');
    } catch (e) {
        console.log(e);
        return res.status(403).send(e);
        return next(e);
    }
});

module.exports = router;