module.exports = (sequelize, DataTypes) => {
    const wishlist = sequelize.define('wishlist', {
      poster:{          //포스터url
        type:DataTypes.STRING
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
    wishlist.associate = (db) => {
        db.wishlist.belongsTo(db.user);
        db.wishlist.belongsTo(db.movie);
    };
    return wishlist;
  };