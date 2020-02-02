//load boxoffice(년,월)
//박스오피스 조회 


const express =require('express')
const db=require('../../models')

const router=express.Router()


router.get('/',async(req,res,next)=>{        //api/boxoffice
    const boxOfficeList=await db.boxoffice.findAll({
        where: {
            year:req.body.year//어떤값을 보내주는지확인
        },        
        order:[['ranking']]
    });
    if(boxOfficeList){
        console.log(123);
        return res.status(200).json(boxOfficeList);
        
    }

   
})


module.exports = router;
