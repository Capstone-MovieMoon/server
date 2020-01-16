module.exports = (sequelize, DataTypes) => {
  const diary = sequelize.define('diary', {
    writeDate:{
        type:DataTypes.STRING,
        allowNull: false
    },
    memo:{
        type:DataTypes.TEXT, 
        allowNull: false
    }

  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  diary.associate = (db) => {
    db.diary.hasMany(db.rating)
    db.diary.hasMany(db.diaryimage)
  };
  return diary;
};