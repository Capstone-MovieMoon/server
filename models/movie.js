module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
    movieId: {
      type: DataTypes.INTEGER, // 긴 글
      allowNull: false,
      unique:true
    },
    engTitle:{
        type:DataTypes.STRING
    },
    korTitle:{
        type:DataTypes.STRING
    },
    genres:{
        type:DataTypes.STRING,
    },
    releaseDate:{
        type:DataTypes.STRING
    },
    age:{
        type:DataTypes.STRING
    },
    makingNation:{
        type:DataTypes.STRING
    },
    poster:{
      type:DataTypes.STRING
    }

  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  movie.associate = (db) => {
    db.movie.hasMany(db.rating);//
    db.movie.hasMany(db.diary);//diary에 movieId생성
    db.movie.belongsToMany(db.user,{through:'wishList' ,as:'wish'})
    //db.movie.hasMany(db.wishList); 
    //db.movie.hasMany(db.expect_rating);
  };
  return movie;
};