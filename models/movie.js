module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
    movieId: {                //영화번호
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:true
    },
    korTitle:{
        type:DataTypes.STRING
    },
    genres:{
        type:DataTypes.STRING,
    },
    releaseDate:{     //개봉일
        type:DataTypes.STRING
    },
    age:{             //영화관람등급
        type:DataTypes.STRING
    },
    makingNation:{    //국가
        type:DataTypes.STRING
    },
    poster:{          //포스터url
      type:DataTypes.STRING
    },
    runninngtime:{     //런닝타임
      type:DataTypes.INTEGER
    },
    director:{        //감독
      type:DataTypes.STRING
    },
    actor:{         //배우
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