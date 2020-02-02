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
    db.rating.belongsTo(db.user);
    db.rating.belongsTo(db.movie);
    db.rating.belongsToMany(db.diary,{through:'userRating'})
  };
  return rating;
};