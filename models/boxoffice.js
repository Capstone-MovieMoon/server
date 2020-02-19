module.exports = (sequelize, DataTypes) => {
    const boxoffice = sequelize.define('boxoffice', {
      ranking:{
        type:DataTypes.INTEGER, 
        allowNull: false
      },
      korTitle:{
        type:DataTypes.TEXT,
        allowNull: false
      },
      releaseDate:{
        type:DataTypes.TEXT,
        allowNull: false
      },
      sales:{
        type:DataTypes.TEXT,
        allowNull: false
      },
      audience:{
        type:DataTypes.INTEGER,
        allowNull: false
      },
      nation:{
        type:DataTypes.TEXT,
        allowNull: false
      },
      producer:{
        type:DataTypes.TEXT,
        allowNull: false
      },
      year:{
        type:DataTypes.INTEGER,
        allowNull: false,
      },
     poster:{
            type:DataTypes.TEXT,
            allowNull: false
          },
     movieId:{
       type:DataTypes,INTEGER,
       allowNull: false
     }
    }, 
     {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false
    });
    return boxoffice;
  };