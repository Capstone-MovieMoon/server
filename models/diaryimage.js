module.exports=(sequelize,DataTypes)=>{
    const diaryimage=sequelize.define('diaryimage',{
        src1:DataTypes.STRING,
        src2:DataTypes.STRING,
        src3:DataTypes.STRING,
    })

    diaryimage.associate=(db)=>{
        db.diaryimage.belongsTo(db.diary)
    }

    return diaryimage;
}