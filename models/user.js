module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userId: {
      type: DataTypes.STRING, // 긴 글
      allowNull: false,
      unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nickname:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  user.associate = (db) => {
    db.user.hasMany(db.rating);
    db.user.hasMany(db.diary);
    db.user.belongsToMany(db.movie,{through:'wishList',as:'wished'})//as는 어떻게 써야할까?
  };
  return user;
};