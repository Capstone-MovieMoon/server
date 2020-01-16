const passport = require('passport');
const db = require('../models');
const local = require('./local');
module.exports = ()=>{
    passport.serializeUser((userinfo,done)=>{    // 서버쪽에 [{ id:3, cookie: 'asdfgh'}] id는 서버에 cookie는 쿠키에 보내서 이를 통해 사용자를 확인함 id는 짧기 때문에 용량을 차지하지 않음
        return done(null, userinfo.id);
    });
    passport.deserializeUser(async (id, done)=>{        //id:3을 통해서 아무것도 알지 못하기에 deserializeUser을 통해서 쿠키값을 통해 id값을 찾아내고 이 id값을 통해서 user정보를 찾아옴
        try{
            const userinfo = await db.user.findOne({
                where: id,
            });
            return done(null, userinfo);        //user정보는 req.user에 저장 됨
        } catch (e){
            console.error(e);
            return done(e);
        }
    })
    local();
}

// 프론트에서 서버로는 cookie만 보낸 후
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id:3을 발견
//id:3이 deserializeUser에 들어감
//req.user로 사용자 정보가 들어감

//요청 보낼때마다 deserializeUser가 실행되어서 db에 접속을 하게 됨(캐싱을 통해서 db 요청을 1번씩만 실행하게 함.)
//실무에서는 deserializeUser 결과물을 캐싱해둠 db요청을 줄이기 위해서(서버에서는 db요청이 제일 비쌈)