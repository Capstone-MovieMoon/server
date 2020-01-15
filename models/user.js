module.exports = (sequelize, DataTypes)=>{
const User = sequelize.define('User', {
    user_id:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique:true
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull:false
    },
    nickname : {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique:true
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci', //이 부분이 있어야 한글이 저장됨
});

    User.associate = (db) =>{
           //한 사람이 여러개의 글을 쓸 수 있다.
    };
    return User;
};
