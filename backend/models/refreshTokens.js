import { DataTypes } from "sequelize"
import sequelize from "../config/database.js"

const RefreshTokens = sequelize.define("RefreshTokens",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        revokedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deviceInfo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: "refresh_tokens",
        timestamps: true,
        updatedAt: false

    })

RefreshTokens.associate = (models) => {
    RefreshTokens.belongsTo(models.Users, {
        foreignKey: 'userId',
    })
}
export default RefreshTokens