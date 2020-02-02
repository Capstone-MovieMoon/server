module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userId: {
      type: DataTypes.STRING,
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
    },
    src:{
      type: DataTypes.STRING,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  user.associate = (db) => {
    db.user.hasMany(db.rating);
    db.user.hasMany(db.diary);
    db.user.belongsToMany(db.movie,{through: db.wishlist});
    db.user.hasMany(db.wishlist);
    db.user.belongsToMany(db.movie,{through: db.diarylist});
    db.user.hasMany(db.diarylist);
  };
  return user;
};