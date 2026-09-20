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
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        subject:{
            type: DataTypes.STRING,
            allowNull: false
        },
        note_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    
    {
        tableName: "notes",
        timestamps: true
    })

 
Notes.asscoiate = (models)=>{
  Notes.belongsTo(models.Users, {foreignKey: "userId"})
}
export default Notes;
