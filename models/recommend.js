module.exports = (sequelize, DataTypes) => {
    const recommend = sequelize.define('recommend', {
  
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false
    });
    recommend.associate = (db) => {
      db.recommend.belongsTo(db.user);
      db.recommend.belongsTo(db.movie);
    };
    return recommend;
  };