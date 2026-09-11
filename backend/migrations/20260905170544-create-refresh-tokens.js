'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("refresh_tokens",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id"
          },
          onDelete: "CASCADE"
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,

        },
        expiresAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        revokedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deviceInfo: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("refresh_tokens")
  }
};
