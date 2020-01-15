const passport = require('passport');
const {Strategy:LocalStrategy} = require('passport-local');
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports = () =>{
    passport.use(new LocalStrategy({
        usernameField: 'user_id',
        passwordFIeld: 'password',       
    }, async (user_id, password, done)=>{
        try {
            const user = await db.User.findOne( { where: {user_id}});
            if(!user){
                return done(null, false, {reason: '존재하지 않는 사용자입니다!'});
            }
            const result = await bcrypt.compare(password, user.password);
            if(result){
                return done(null, user);        //로그인 성공
            }
            return done(null, false, {reason: '비밀번호가 틀립니다.'});
        } catch(e){
            console.error(e);
            return done(e);
        }
    }));
};