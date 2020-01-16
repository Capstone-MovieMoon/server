module.exports=(sequelize,DataTypes)=>{
    const diaryimage=sequelize.define('diaryimage',{
        src:DataTypes.STRING
    })

    diaryimage.associate=(db)=>{
        db.diaryimage.belongsTo(db.diary)
    }

    return diaryimage;
}