const passport = require('passport');
const {Strategy:LocalStrategy} = require('passport-local');
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports = () =>{
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordFIeld: 'password',       
    }, async (userId, password, done)=>{
        try {
            const userinfo = await db.user.findOne( { where: {userId}});
            if(!userinfo){
                return done(null, false, {reason: '존재하지 않는 사용자입니다!'});
            }
            const result = await bcrypt.compare(password, userinfo.password);
            if(result){
                return done(null, userinfo);        //로그인 성공
            }
            return done(null, false, {reason: '비밀번호가 틀립니다.'});
        } catch(e){
            console.error(e);
            return done(e);
        }
    }));
};