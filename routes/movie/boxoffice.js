//load boxoffice(년,월)
//박스오피스 조회 


const express =require('express')
const db=require('../../models')

const router=express.Router()


router.get('/:year',async(req,res,next)=>{        //api/boxoffice/:year
    const boxOfficeList=await db.boxoffice.findAll({
        where: {
            year:req.params.year//어떤값을 보내주는지확인
        },        
        order:[['ranking']]
    });
    if(boxOfficeList){
        return res.status(200).json(boxOfficeList);
        
    }

   
})


module.exports = router;
