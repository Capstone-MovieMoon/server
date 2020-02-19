module.exports=(sequelize,DataTypes)=>{
    const diaryimage=sequelize.define('diaryimage',{
        src:DataTypes.STRING,
    },
    {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false
    });
    diaryimage.associate=(db)=>{
        db.diaryimage.belongsTo(db.diary)
    }
    return diaryimage;
}