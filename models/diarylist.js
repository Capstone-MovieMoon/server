module.exports = (sequelize, DataTypes) => {
    const diarylist = sequelize.define('diarylist', {
      poster:{          //포스터url
        type:DataTypes.STRING
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
    diarylist.associate = (db) => {
        db.diarylist.belongsTo(db.user);
        db.diarylist.belongsTo(db.movie);
        db.diarylist.belongsTo(db.diary);
    };
    return diarylist;
  };