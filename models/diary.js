module.exports = (sequelize, DataTypes) => {
  const diary = sequelize.define('diary', {
    memo:{
      type:DataTypes.TEXT, 
      allowNull: false
    }
    ,
    createDate:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    myRating:{
      type:DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  diary.associate = (db) => {
    db.diary.hasOne(db.rating);
    db.diary.hasMany(db.diaryimage);
    db.diary.belongsTo(db.movie);
    db.diary.belongsTo(db.user);
  };
  return diary;
};