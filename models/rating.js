module.exports = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
  myRating:{
      type:DataTypes.DOUBLE
  }

  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  rating.associate = (db) => {
    db.rating.belongsTo(db.user);//hasmany userId
    db.rating.belongsTo(db.movie);//hasmany movieId
    db.rating.belongsTo(db.diary)
  };
  return rating;
};