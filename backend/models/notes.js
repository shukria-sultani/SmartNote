import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Notes = sequelize.define("Notes",
    {
        id: {
         type:DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true

        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject:{
            type: DataTypes.STRING,
            allowNull: false
        },
        note_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        }
    },
    
    {
        tableName: "notes",
        timestamps: true
    })

 
Notes.associate = (models)=>{
  Notes.belongsTo(models.Users, {foreignKey: "userId"})
}
export default Notes;
