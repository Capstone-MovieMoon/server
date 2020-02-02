module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
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
    timestamps: false
  });
 
  movie.associate = (db) => {
    db.movie.hasMany(db.rating); 
    db.movie.hasMany(db.diary);
    db.movie.belongsToMany(db.user,{through: db.wishlist});
    db.movie.hasMany(db.wishlist);
    db.movie.belongsToMany(db.user,{through:db.diarylist});
    db.movie.hasMany(db.diary);
    db.movie.hasMany(db.diarylist);
  };
  return movie;
};