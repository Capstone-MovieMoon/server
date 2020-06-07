const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];//env의 정보를 config에 넣어준다.

const db = {};

const sequelize=new Sequelize(config.database,config.username,config.password,config);
db.diary=require('./diary')(sequelize,Sequelize);
//db.expect_rating=require('./expect_rating')(sequelize,Sequelize);
db.movie=require('./movie')(sequelize,Sequelize);
db.rating=require('./rating')(sequelize,Sequelize);
db.user=require('./user')(sequelize,Sequelize);
db.diaryimage=require('./diaryimage')(sequelize,Sequelize);
db.wishlist=require('./wishlist')(sequelize,Sequelize);
db.diarylist=require('./diarylist')(sequelize,Sequelize);
db.boxoffice=require('./boxoffice')(sequelize,Sequelize);
db.recommend=require('./recommend')(sequelize,Sequelize);
Object.keys(db).forEach(modelName => {//Object.keys는 객체를 배열로 바꿔준다.
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});//model을 통합한다.

db.sequelize = sequelize;//db와 연결한다.
db.Sequelize = Sequelize;//sequelize에서 가져온 미들웨어끼리 연결한다.

module.exports = db;//db를 crud 하는과정에서 쓰임으로 항상 exports
