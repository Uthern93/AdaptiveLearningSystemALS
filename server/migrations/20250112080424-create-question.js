'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      question_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Content',
          key: 'content_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      options: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      correct_answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      difficulty_level: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      topic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questions');
  }
};
