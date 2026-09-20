'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notes",
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
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        subject: {
          type: Sequelize.STRING,
          allowNull: false
        },
        note_text: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
           defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
           defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
      }
    )
  },

  async down(queryInterface) {
   await queryInterface.dropTable("notes")
  }
}
